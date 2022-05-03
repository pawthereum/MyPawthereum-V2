import { BigNumber } from '@ethersproject/bignumber';
import _ from 'lodash';
import { log, WRAPPED_NATIVE_CURRENCY } from '../../../../util';
import { CurrencyAmount } from '../../../../util/amounts';
import { IV2GasModelFactory, usdGasTokensByChain, } from '../gas-model';
// Constant cost for doing any swap regardless of pools.
const BASE_SWAP_COST = BigNumber.from(115000);
// Constant per extra hop in the route.
const COST_PER_EXTRA_HOP = BigNumber.from(20000);
/**
 * Computes a gas estimate for a V2 swap using heuristics.
 * Considers number of hops in the route and the typical base cost for a swap.
 *
 * We compute gas estimates off-chain because
 *  1/ Calling eth_estimateGas for a swaps requires the caller to have
 *     the full balance token being swapped, and approvals.
 *  2/ Tracking gas used using a wrapper contract is not accurate with Multicall
 *     due to EIP-2929. We would have to make a request for every swap we wanted to estimate.
 *  3/ For V2 we simulate all our swaps off-chain so have no way to track gas used.
 *
 * Note, certain tokens e.g. rebasing/fee-on-transfer, may incur higher gas costs than
 * what we estimate here. This is because they run extra logic on token transfer.
 *
 * @export
 * @class V2HeuristicGasModelFactory
 */
export class V2HeuristicGasModelFactory extends IV2GasModelFactory {
    constructor() {
        super();
    }
    async buildGasModel(chainId, gasPriceWei, poolProvider, token) {
        if (token.equals(WRAPPED_NATIVE_CURRENCY[chainId])) {
            const usdPool = await this.getHighestLiquidityUSDPool(chainId, poolProvider);
            return {
                estimateGasCost: (routeWithValidQuote) => {
                    const { gasCostInEth, gasUse } = this.estimateGas(routeWithValidQuote, gasPriceWei, chainId);
                    const ethToken0 = usdPool.token0.address == WRAPPED_NATIVE_CURRENCY[chainId].address;
                    const ethTokenPrice = ethToken0
                        ? usdPool.token0Price
                        : usdPool.token1Price;
                    const gasCostInTermsOfUSD = ethTokenPrice.quote(gasCostInEth);
                    return {
                        gasEstimate: gasUse,
                        gasCostInToken: gasCostInEth,
                        gasCostInUSD: gasCostInTermsOfUSD,
                    };
                },
            };
        }
        // If the quote token is not WETH, we convert the gas cost to be in terms of the quote token.
        // We do this by getting the highest liquidity <token>/ETH pool.
        const ethPool = await this.getEthPool(chainId, token, poolProvider);
        if (!ethPool) {
            log.info('Unable to find ETH pool with the quote token to produce gas adjusted costs. Route will not account for gas.');
        }
        const usdPool = await this.getHighestLiquidityUSDPool(chainId, poolProvider);
        return {
            estimateGasCost: (routeWithValidQuote) => {
                const usdToken = usdPool.token0.address == WRAPPED_NATIVE_CURRENCY[chainId].address
                    ? usdPool.token1
                    : usdPool.token0;
                const { gasCostInEth, gasUse } = this.estimateGas(routeWithValidQuote, gasPriceWei, chainId);
                if (!ethPool) {
                    return {
                        gasEstimate: gasUse,
                        gasCostInToken: CurrencyAmount.fromRawAmount(token, 0),
                        gasCostInUSD: CurrencyAmount.fromRawAmount(usdToken, 0),
                    };
                }
                const ethToken0 = ethPool.token0.address == WRAPPED_NATIVE_CURRENCY[chainId].address;
                const ethTokenPrice = ethToken0
                    ? ethPool.token0Price
                    : ethPool.token1Price;
                let gasCostInTermsOfQuoteToken;
                try {
                    gasCostInTermsOfQuoteToken = ethTokenPrice.quote(gasCostInEth);
                }
                catch (err) {
                    log.error({
                        ethTokenPriceBase: ethTokenPrice.baseCurrency,
                        ethTokenPriceQuote: ethTokenPrice.quoteCurrency,
                        gasCostInEth: gasCostInEth.currency,
                    }, 'Debug eth price token issue');
                    throw err;
                }
                const ethToken0USDPool = usdPool.token0.address == WRAPPED_NATIVE_CURRENCY[chainId].address;
                const ethTokenPriceUSDPool = ethToken0USDPool
                    ? usdPool.token0Price
                    : usdPool.token1Price;
                let gasCostInTermsOfUSD;
                try {
                    gasCostInTermsOfUSD = ethTokenPriceUSDPool.quote(gasCostInEth);
                }
                catch (err) {
                    log.error({
                        usdT1: usdPool.token0.symbol,
                        usdT2: usdPool.token1.symbol,
                        gasCostInEthToken: gasCostInEth.currency.symbol,
                    }, 'Failed to compute USD gas price');
                    throw err;
                }
                return {
                    gasEstimate: gasUse,
                    gasCostInToken: gasCostInTermsOfQuoteToken,
                    gasCostInUSD: gasCostInTermsOfUSD,
                };
            },
        };
    }
    estimateGas(routeWithValidQuote, gasPriceWei, chainId) {
        const hops = routeWithValidQuote.route.pairs.length;
        const gasUse = BASE_SWAP_COST.add(COST_PER_EXTRA_HOP.mul(hops - 1));
        const totalGasCostWei = gasPriceWei.mul(gasUse);
        const weth = WRAPPED_NATIVE_CURRENCY[chainId];
        const gasCostInEth = CurrencyAmount.fromRawAmount(weth, totalGasCostWei.toString());
        return { gasCostInEth, gasUse };
    }
    async getEthPool(chainId, token, poolProvider) {
        const weth = WRAPPED_NATIVE_CURRENCY[chainId];
        const poolAccessor = await poolProvider.getPools([[weth, token]]);
        const pool = poolAccessor.getPool(weth, token);
        if (!pool || pool.reserve0.equalTo(0) || pool.reserve1.equalTo(0)) {
            log.error({
                weth,
                token,
                reserve0: pool === null || pool === void 0 ? void 0 : pool.reserve0.toExact(),
                reserve1: pool === null || pool === void 0 ? void 0 : pool.reserve1.toExact(),
            }, `Could not find a valid WETH pool with ${token.symbol} for computing gas costs.`);
            return null;
        }
        return pool;
    }
    async getHighestLiquidityUSDPool(chainId, poolProvider) {
        const usdTokens = usdGasTokensByChain[chainId];
        if (!usdTokens) {
            throw new Error(`Could not find a USD token for computing gas costs on ${chainId}`);
        }
        const usdPools = _.map(usdTokens, (usdToken) => [
            usdToken,
            WRAPPED_NATIVE_CURRENCY[chainId],
        ]);
        const poolAccessor = await poolProvider.getPools(usdPools);
        const poolsRaw = poolAccessor.getAllPools();
        const pools = _.filter(poolsRaw, (pool) => pool.reserve0.greaterThan(0) && pool.reserve1.greaterThan(0));
        if (pools.length == 0) {
            log.error({ pools }, `Could not find a USD/WETH pool for computing gas costs.`);
            throw new Error(`Can't find USD/WETH pool for computing gas costs.`);
        }
        const maxPool = _.maxBy(pools, (pool) => {
            if (pool.token0.equals(WRAPPED_NATIVE_CURRENCY[chainId])) {
                return parseFloat(pool.reserve0.toSignificant(2));
            }
            else {
                return parseFloat(pool.reserve1.toSignificant(2));
            }
        });
        return maxPool;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidjItaGV1cmlzdGljLWdhcy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9yb3V0ZXJzL2FscGhhLXJvdXRlci9nYXMtbW9kZWxzL3YyL3YyLWhldXJpc3RpYy1nYXMtbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBR3JELE9BQU8sQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUV2QixPQUFPLEVBQVcsR0FBRyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDekUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTFELE9BQU8sRUFFTCxrQkFBa0IsRUFDbEIsbUJBQW1CLEdBQ3BCLE1BQU0sY0FBYyxDQUFDO0FBRXRCLHdEQUF3RDtBQUN4RCxNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTlDLHVDQUF1QztBQUN2QyxNQUFNLGtCQUFrQixHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLE9BQU8sMEJBQTJCLFNBQVEsa0JBQWtCO0lBQ2hFO1FBQ0UsS0FBSyxFQUFFLENBQUM7SUFDVixDQUFDO0lBRU0sS0FBSyxDQUFDLGFBQWEsQ0FDeEIsT0FBZ0IsRUFDaEIsV0FBc0IsRUFDdEIsWUFBNkIsRUFDN0IsS0FBWTtRQUVaLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUUsQ0FBQyxFQUFFO1lBQ25ELE1BQU0sT0FBTyxHQUFTLE1BQU0sSUFBSSxDQUFDLDBCQUEwQixDQUN6RCxPQUFPLEVBQ1AsWUFBWSxDQUNiLENBQUM7WUFFRixPQUFPO2dCQUNMLGVBQWUsRUFBRSxDQUFDLG1CQUEwQyxFQUFFLEVB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