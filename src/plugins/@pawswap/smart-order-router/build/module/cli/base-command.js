/// <reference types="./types/bunyan-debug-stream" />
import { Command, flags } from '@oclif/command';
import DEFAULT_TOKEN_LIST from '@uniswap/default-token-list';
import { default as bunyan } from 'bunyan';
import bunyanDebugStream from 'bunyan-debug-stream';
import { BigNumber, ethers } from 'ethers';
import _ from 'lodash';
import NodeCache from 'node-cache';
import { AlphaRouter, CachingGasStationProvider, CachingTokenListProvider, CachingTokenProviderWithFallback, ChainId, CHAIN_IDS_LIST, EIP1559GasPriceProvider, ID_TO_CHAIN_ID, ID_TO_PROVIDER, LegacyRouter, MetricLogger, NodeJSCache, routeAmountsToString, setGlobalLogger, setGlobalMetric, TokenProvider, UniswapMulticallProvider, V3PoolProvider, V3QuoteProvider, } from '../src';
import { LegacyGasPriceProvider } from '../src/providers/legacy-gas-price-provider';
import { OnChainGasPriceProvider } from '../src/providers/on-chain-gas-price-provider';
export class BaseCommand extends Command {
    constructor() {
        super(...arguments);
        this._log = null;
        this._router = null;
        this._swapToRatioRouter = null;
        this._tokenProvider = null;
        this._poolProvider = null;
        this._blockNumber = null;
        this._multicall2Provider = null;
    }
    get logger() {
        return this._log
            ? this._log
            : bunyan.createLogger({
                name: 'Default Logger',
            });
    }
    get router() {
        if (this._router) {
            return this._router;
        }
        else {
            throw 'router not initialized';
        }
    }
    get swapToRatioRouter() {
        if (this._swapToRatioRouter) {
            return this._swapToRatioRouter;
        }
        else {
            throw 'swapToRatioRouter not initialized';
        }
    }
    get tokenProvider() {
        if (this._tokenProvider) {
            return this._tokenProvider;
        }
        else {
            throw 'tokenProvider not initialized';
        }
    }
    get poolProvider() {
        if (this._poolProvider) {
            return this._poolProvider;
        }
        else {
            throw 'poolProvider not initialized';
        }
    }
    get blockNumber() {
        if (this._blockNumber) {
            return this._blockNumber;
        }
        else {
            throw 'blockNumber not initialized';
        }
    }
    get multicall2Provider() {
        if (this._multicall2Provider) {
            return this._multicall2Provider;
        }
        else {
            throw 'multicall2 not initialized';
        }
    }
    async init() {
        const query = this.parse();
        const { chainId: chainIdNumb, router: routerStr, debug, debugJSON, tokenListURI, } = query.flags;
        // initialize logger
        const logLevel = debug || debugJSON ? bunyan.DEBUG : bunyan.INFO;
        this._log = bunyan.createLogger({
            name: 'Uniswap Smart Order Router',
            serializers: bunyan.stdSerializers,
            level: logLevel,
            streams: debugJSON
                ? undefined
                : [
                    {
                        level: logLevel,
                        type: 'stream',
                        stream: bunyanDebugStream({
                            basepath: __dirname,
                            forceColor: false,
                            showDate: false,
                            showPid: false,
                            showLoggerName: false,
                            showLevel: !!debug,
                        }),
                    },
                ],
        });
        if (debug || debugJSON) {
            setGlobalLogger(this.logger);
        }
        const metricLogger = new MetricLogger();
        setGlobalMetric(metricLogger);
        const chainId = ID_TO_CHAIN_ID(chainIdNumb);
        const chainProvider = ID_TO_PROVIDER(chainId);
        const provider = new ethers.providers.JsonRpcProvider(chainProvider, chainId);
        this._blockNumber = await provider.getBlockNumber();
        const tokenCache = new NodeJSCache(new NodeCache({ stdTTL: 3600, useClones: false }));
        let tokenListProvider;
        if (tokenListURI) {
            tokenListProvider = await CachingTokenListProvider.fromTokenListURI(chainId, tokenListURI, tokenCache);
        }
        else {
            tokenListProvider = await CachingTokenListProvider.fromTokenList(chainId, DEFAULT_TOKEN_LIST, tokenCache);
        }
        const multicall2Provider = new UniswapMulticallProvider(chainId, provider);
        this._multicall2Provider = multicall2Provider;
        this._poolProvider = new V3PoolProvider(chainId, multicall2Provider);
        // initialize tokenProvider
        const tokenProviderOnChain = new TokenProvider(chainId, multicall2Provider);
        this._tokenProvider = new CachingTokenProviderWithFallback(chainId, tokenCache, tokenListProvider, tokenProviderOnChain);
        if (routerStr == 'legacy') {
            this._router = new LegacyRouter({
                chainId,
                multicall2Provider,
                poolProvider: new V3PoolProvider(chainId, multicall2Provider),
                quoteProvider: new V3QuoteProvider(chainId, provider, multicall2Provider),
                tokenProvider: this.tokenProvider,
            });
        }
        else {
            const gasPriceCache = new NodeJSCache(new NodeCache({ stdTTL: 15, useClones: true }));
            // const useDefaultQuoteProvider =
            //   chainId != ChainId.ARBITRUM_ONE && chainId != ChainId.ARBITRUM_RINKEBY;
            const router = new AlphaRouter({
                provider,
                chainId,
                multicall2Provider: multicall2Provider,
                gasPriceProvider: new CachingGasStationProvider(chainId, new OnChainGasPriceProvider(chainId, new EIP1559GasPriceProvider(provider), new LegacyGasPriceProvider(provider)), gasPriceCache),
            });
            this._swapToRatioRouter = router;
            this._router = router;
        }
    }
    logSwapResults(routeAmounts, quote, quoteGasAdjusted, estimatedGasUsedQuoteToken, estimatedGasUsedUSD, methodParameters, blockNumber, estimatedGasUsed, gasPriceWei) {
        this.logger.info(`Best Route:`);
        this.logger.info(`${routeAmountsToString(routeAmounts)}`);
        this.logger.info(`\tRaw Quote Exact In:`);
        this.logger.info(`\t\t${quote.toFixed(Math.min(quote.currency.decimals, 2))}`);
        this.logger.info(`\tGas Adjusted Quote In:`);
        this.logger.info(`\t\t${quoteGasAdjusted.toFixed(Math.min(quoteGasAdjusted.currency.decimals, 2))}`);
        this.logger.info(``);
        this.logger.info(`Gas Used Quote Token: ${estimatedGasUsedQuoteToken.toFixed(Math.min(estimatedGasUsedQuoteToken.currency.decimals, 6))}`);
        this.logger.info(`Gas Used USD: ${estimatedGasUsedUSD.toFixed(Math.min(estimatedGasUsedUSD.currency.decimals, 6))}`);
        this.logger.info(`Calldata: ${methodParameters === null || methodParameters === void 0 ? void 0 : methodParameters.calldata}`);
        this.logger.info(`Value: ${methodParameters === null || methodParameters === void 0 ? void 0 : methodParameters.value}`);
        this.logger.info({
            blockNumber: blockNumber.toString(),
            estimatedGasUsed: estimatedGasUsed.toString(),
            gasPriceWei: gasPriceWei.toString(),
        });
        const v3Routes = routeAmounts;
        let total = BigNumber.from(0);
        for (let i = 0; i < v3Routes.length; i++) {
            const route = v3Routes[i];
            const tick = BigNumber.from(Math.max(1, _.sum(route.initializedTicksCrossedList)));
            total = total.add(tick);
        }
        this.logger.info(`Total ticks crossed: ${total}`);
    }
}
BaseCommand.flags = {
    topN: flags.integer({
        required: false,
        default: 3,
    }),
    topNTokenInOut: flags.integer({
        required: false,
        default: 2,
    }),
    topNSecondHop: flags.integer({
        required: false,
        default: 0,
    }),
    topNWithEachBaseToken: flags.integer({
        required: false,
        default: 2,
    }),
    topNWithBaseToken: flags.integer({
        required: false,
        default: 6,
    }),
    topNWithBaseTokenInSet: flags.boolean({
        required: false,
        default: false,
    }),
    topNDirectSwaps: flags.integer({
        required: false,
        default: 2,
    }),
    maxSwapsPerPath: flags.integer({
        required: false,
        default: 3,
    }),
    minSplits: flags.integer({
        required: false,
        default: 1,
    }),
    maxSplits: flags.integer({
        required: false,
        default: 3,
    }),
    distributionPercent: flags.integer({
        required: false,
        default: 5,
    }),
    chainId: flags.integer({
        char: 'c',
        required: false,
        default: ChainId.MAINNET,
        options: CHAIN_IDS_LIST,
    }),
    tokenListURI: flags.string({
        required: false,
    }),
    router: flags.string({
        char: 's',
        required: false,
        default: 'alpha',
    }),
    debug: flags.boolean(),
    debugJSON: flags.boolean(),
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1jb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY2xpL2Jhc2UtY29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxREFBcUQ7QUFDckQsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRCxPQUFPLGtCQUFrQixNQUFNLDZCQUE2QixDQUFDO0FBRzdELE9BQU8sRUFBRSxPQUFPLElBQUksTUFBTSxFQUFxQixNQUFNLFFBQVEsQ0FBQztBQUM5RCxPQUFPLGlCQUFpQixNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzNDLE9BQU8sQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUN2QixPQUFPLFNBQVMsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxFQUNMLFdBQVcsRUFDWCx5QkFBeUIsRUFDekIsd0JBQXdCLEVBQ3hCLGdDQUFnQyxFQUNoQyxPQUFPLEVBQ1AsY0FBYyxFQUNkLHVCQUF1QixFQUV2QixjQUFjLEVBQ2QsY0FBYyxFQUtkLFlBQVksRUFDWixZQUFZLEVBQ1osV0FBVyxFQUNYLG9CQUFvQixFQUVwQixlQUFlLEVBQ2YsZUFBZSxFQUNmLGFBQWEsRUFDYix3QkFBd0IsRUFDeEIsY0FBYyxFQUNkLGVBQWUsR0FFaEIsTUFBTSxRQUFRLENBQUM7QUFDaEIsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDcEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFFdkYsTUFBTSxPQUFnQixXQUFZLFNBQVEsT0FBTztJQUFqRDs7UUFnRVUsU0FBSSxHQUFrQixJQUFJLENBQUM7UUFDM0IsWUFBTyxHQUF3QixJQUFJLENBQUM7UUFDcEMsdUJBQWtCLEdBQWtDLElBQUksQ0FBQztRQUN6RCxtQkFBYyxHQUEwQixJQUFJLENBQUM7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