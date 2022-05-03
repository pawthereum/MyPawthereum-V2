"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegacyRouter = void 0;
const router_sdk_1 = require("@uniswap/router-sdk");
const sdk_core_1 = require("@uniswap/sdk-core");
const v3_sdk_1 = require("@uniswap/v3-sdk");
const ethers_1 = require("ethers");
const lodash_1 = __importDefault(require("lodash"));
const token_provider_1 = require("../../providers/token-provider");
const amounts_1 = require("../../util/amounts");
const log_1 = require("../../util/log");
const routes_1 = require("../../util/routes");
const alpha_router_1 = require("../alpha-router");
const router_1 = require("../router");
const bases_1 = require("./bases");
// Interface defaults to 2.
const MAX_HOPS = 2;
/**
 * Replicates the router implemented in the V3 interface.
 * Code is mostly a copy from https://github.com/Uniswap/uniswap-interface/blob/0190b5a408c13016c87e1030ffc59326c085f389/src/hooks/useBestV3Trade.ts#L22-L23
 * with React/Redux hooks removed, and refactoring to allow re-use in other routers.
 */
class LegacyRouter {
    constructor({ chainId, multicall2Provider, poolProvider, quoteProvider, tokenProvider, }) {
        this.chainId = chainId;
        this.multicall2Provider = multicall2Provider;
        this.poolProvider = poolProvider;
        this.quoteProvider = quoteProvider;
        this.tokenProvider = tokenProvider;
    }
    async route(amount, quoteCurrency, swapType, swapConfig, partialRoutingConfig) {
        if (swapType == sdk_core_1.TradeType.EXACT_INPUT) {
            return this.routeExactIn(amount.currency, quoteCurrency, amount, swapConfig, partialRoutingConfig);
        }
        return this.routeExactOut(quoteCurrency, amount.currency, amount, swapConfig, partialRoutingConfig);
    }
    async routeExactIn(currencyIn, currencyOut, amountIn, swapConfig, routingConfig) {
        const tokenIn = currencyIn.wrapped;
        const tokenOut = currencyOut.wrapped;
        const routes = await this.getAllRoutes(tokenIn, tokenOut, routingConfig);
        const routeQuote = await this.findBestRouteExactIn(amountIn, tokenOut, routes, routingConfig);
        if (!routeQuote) {
            return null;
        }
        const trade = this.buildTrade(currencyIn, currencyOut, sdk_core_1.TradeType.EXACT_INPUT, routeQuote);
        return {
            quote: routeQuote.quote,
            quoteGasAdjusted: routeQuote.quote,
            route: [routeQuote],
            estimatedGasUsed: ethers_1.BigNumber.from(0),
            estimatedGasUsedQuoteToken: amounts_1.CurrencyAmount.fromFractionalAmount(tokenOut, 0, 1),
            estimatedGasUsedUSD: amounts_1.CurrencyAmount.fromFractionalAmount(token_provider_1.DAI_MAINNET, 0, 1),
            gasPriceWei: ethers_1.BigNumber.from(0),
            trade,
            methodParameters: swapConfig
                ? this.buildMethodParameters(trade, swapConfig)
                : undefined,
            blockNumber: ethers_1.BigNumber.from(0),
        };
    }
    async routeExactOut(currencyIn, currencyOut, amountOut, swapConfig, routingConfig) {
        const tokenIn = currencyIn.wrapped;
        const tokenOut = currencyOut.wrapped;
        const routes = await this.getAllRoutes(tokenIn, tokenOut, routingConfig);
        const routeQuote = await this.findBestRouteExactOut(amountOut, tokenIn, routes, routingConfig);
        if (!routeQuote) {
            return null;
        }
        const trade = this.buildTrade(currencyIn, currencyOut, sdk_core_1.TradeType.EXACT_OUTPUT, routeQuote);
        return {
            quote: routeQuote.quote,
            quoteGasAdjusted: routeQuote.quote,
            route: [routeQuote],
            estimatedGasUsed: ethers_1.BigNumber.from(0),
            estimatedGasUsedQuoteToken: amounts_1.CurrencyAmount.fromFractionalAmount(tokenIn, 0, 1),
            estimatedGasUsedUSD: amounts_1.CurrencyAmount.fromFractionalAmount(token_provider_1.DAI_MAINNET, 0, 1),
            gasPriceWei: ethers_1.BigNumber.from(0),
            trade,
            methodParameters: swapConfig
                ? this.buildMethodParameters(trade, swapConfig)
                : undefined,
            blockNumber: ethers_1.BigNumber.from(0),
        };
    }
    async findBestRouteExactIn(amountIn, tokenOut, routes, routingConfig) {
        const { routesWithQuotes: quotesRaw } = await this.quoteProvider.getQuotesManyExactIn([amountIn], routes, {
            blockNumber: routingConfig === null || routingConfig === void 0 ? void 0 : routingConfig.blockNumber,
        });
        const quotes100Percent = lodash_1.default.map(quotesRaw, ([route, quotes]) => { var _a, _b; return `${routes_1.routeToString(route)} : ${(_b = (_a = quotes[0]) === null || _a === void 0 ? void 0 : _a.quote) === null || _b === void 0 ? void 0 : _b.toString()}`; });
        log_1.log.info({ quotes100Percent }, '100% Quotes');
        const bestQuote = await this.getBestQuote(routes, quotesRaw, tokenOut, sdk_core_1.TradeType.EXACT_INPUT);
        return bestQuote;
    }
    async findBestRouteExactOut(amountOut, tokenIn, routes, routingConfig) {
        const { routesWithQuotes: quotesRaw } = await this.quoteProvider.getQuotesManyExactOut([amountOut], routes, {
            blockNumber: routingConfig === null || routingConfig === void 0 ? void 0 : routingConfig.blockNumber,
        });
        const bestQuote = await this.getBestQuote(routes, quotesRaw, tokenIn, sdk_core_1.TradeType.EXACT_OUTPUT);
        return bestQuote;
    }
    async getBestQuote(routes, quotesRaw, quoteToken, routeType) {
        log_1.log.debug(`Got ${lodash_1.default.filter(quotesRaw, ([_, quotes]) => !!quotes[0]).length} valid quotes from ${routes.length} possible routes.`);
        const routeQuotesRaw = [];
        for (let i = 0; i < quotesRaw.length; i++) {
            const [route, quotes] = quotesRaw[i];
            const { quote, amount } = quotes[0];
            if (!quote) {
                ethers_1.logger.debug(`No quote for ${routes_1.routeToString(route)}`);
                continue;
            }
            routeQuotesRaw.push({ route, quote, amount });
        }
        if (routeQuotesRaw.length == 0) {
            return null;
        }
        routeQuotesRaw.sort((routeQuoteA, routeQuoteB) => {
            if (routeType == sdk_core_1.TradeType.EXACT_INPUT) {
                return routeQuoteA.quote.gt(routeQuoteB.quote) ? -1 : 1;
            }
            else {
                return routeQuoteA.quote.lt(routeQuoteB.quote) ? -1 : 1;
            }
        });
        const routeQuotes = lodash_1.default.map(routeQuotesRaw, ({ route, quote, amount }) => {
            return new alpha_router_1.V3RouteWithValidQuote({
                route,
                rawQuote: quote,
                amount,
                percent: 100,
                gasModel: {
                    estimateGasCost: () => ({
                        gasCostInToken: amounts_1.CurrencyAmount.fromRawAmount(quoteToken, 0),
                        gasCostInUSD: amounts_1.CurrencyAmount.fromRawAmount(token_provider_1.USDC_MAINNET, 0),
                        gasEstimate: ethers_1.BigNumber.from(0),
                    }),
                },
                sqrtPriceX96AfterList: [],
                initializedTicksCrossedList: [],
                quoterGasEstimate: ethers_1.BigNumber.from(0),
                tradeType: routeType,
                quoteToken,
                v3PoolProvider: this.poolProvider,
            });
        });
        for (let rq of routeQuotes) {
            log_1.log.debug(`Quote: ${rq.amount.toFixed(Math.min(rq.amount.currency.decimals, 2))} Route: ${routes_1.routeToString(rq.route)}`);
        }
        return routeQuotes[0];
    }
    async getAllRoutes(tokenIn, tokenOut, routingConfig) {
        const tokenPairs = await this.getAllPossiblePairings(tokenIn, tokenOut);
        const poolAccessor = await this.poolProvider.getPools(tokenPairs, {
            blockNumber: routingConfig === null || routingConfig === void 0 ? void 0 : routingConfig.blockNumber,
        });
        const pools = poolAccessor.getAllPools();
        const routes = this.computeAllRoutes(tokenIn, tokenOut, pools, this.chainId, [], [], tokenIn, MAX_HOPS);
        log_1.log.info({ routes: lodash_1.default.map(routes, routes_1.routeToString) }, `Computed ${routes.length} possible routes.`);
        return routes;
    }
    async getAllPossiblePairings(tokenIn, tokenOut) {
        var _a, _b, _c, _d, _e;
        const common = (_a = bases_1.BASES_TO_CHECK_TRADES_AGAINST(this.tokenProvider)[this.chainId]) !== null && _a !== void 0 ? _a : [];
        const additionalA = (_c = (_b = (await bases_1.ADDITIONAL_BASES(this.tokenProvider))[this.chainId]) === null || _b === void 0 ? void 0 : _b[tokenIn.address]) !== null && _c !== void 0 ? _c : [];
        const additionalB = (_e = (_d = (await bases_1.ADDITIONAL_BASES(this.tokenProvider))[this.chainId]) === null || _d === void 0 ? void 0 : _d[tokenOut.address]) !== null && _e !== void 0 ? _e : [];
        const bases = [...common, ...additionalA, ...additionalB];
        const basePairs = lodash_1.default.flatMap(bases, (base) => bases.map((otherBase) => [base, otherBase]));
        const customBases = (await bases_1.CUSTOM_BASES(this.tokenProvider))[this.chainId];
        const allPairs = lodash_1.default([
            // the direct pair
            [tokenIn, tokenOut],
            // token A against all bases
            ...bases.map((base) => [tokenIn, base]),
            // token B against all bases
            ...bases.map((base) => [tokenOut, base]),
            // each base against all bases
            ...basePairs,
        ])
            .filter((tokens) => Boolean(tokens[0] && tokens[1]))
            .filter(([tokenA, tokenB]) => tokenA.address !== tokenB.address && !tokenA.equals(tokenB))
            .filter(([tokenA, tokenB]) => {
            const customBasesA = customBases === null || customBases === void 0 ? void 0 : customBases[tokenA.address];
            const customBasesB = customBases === null || customBases === void 0 ? void 0 : customBases[tokenB.address];
            if (!customBasesA && !customBasesB)
                return true;
            if (customBasesA && !customBasesA.find((base) => tokenB.equals(base)))
                return false;
            if (customBasesB && !customBasesB.find((base) => tokenA.equals(base)))
                return false;
            return true;
        })
            .flatMap(([tokenA, tokenB]) => {
            return [
                [tokenA, tokenB, v3_sdk_1.FeeAmount.LOW],
                [tokenA, tokenB, v3_sdk_1.FeeAmount.MEDIUM],
                [tokenA, tokenB, v3_sdk_1.FeeAmount.HIGH],
            ];
        })
            .value();
        return allPairs;
    }
    computeAllRoutes(tokenIn, tokenOut, pools, chainId, currentPath = [], allPaths = [], startTokenIn = tokenIn, maxHops = 2) {
        for (const pool of pools) {
            if (currentPath.indexOf(pool) !== -1 || !pool.involvesToken(tokenIn))
                continue;
            const outputToken = pool.token0.equals(tokenIn)
                ? pool.token1
                : pool.token0;
            if (outputToken.equals(tokenOut)) {
                allPaths.push(new router_1.V3Route([...currentPath, pool], startTokenIn, tokenOut));
            }
            else if (maxHops > 1) {
                this.computeAllRoutes(outputToken, tokenOut, pools, chainId, [...currentPath, pool], allPaths, startTokenIn, maxHops - 1);
            }
        }
        return allPaths;
    }
    buildTrade(tokenInCurrency, tokenOutCurrency, tradeType, routeAmount) {
        const { route, amount, quote } = routeAmount;
        // The route, amount and quote are all in terms of wrapped tokens.
        // When constructing the Trade object the inputAmount/outputAmount must
        // use native currencies if necessary. This is so that the Trade knows to wrap/unwrap.
        if (tradeType == sdk_core_1.TradeType.EXACT_INPUT) {
            const amountCurrency = amounts_1.CurrencyAmount.fromFractionalAmount(tokenInCurrency, amount.numerator, amount.denominator);
            const quoteCurrency = amounts_1.CurrencyAmount.fromFractionalAmount(tokenOutCurrency, quote.numerator, quote.denominator);
            const routeCurrency = new v3_sdk_1.Route(route.pools, amountCurrency.currency, quoteCurrency.currency);
            return new router_sdk_1.Trade({
                v3Routes: [
                    {
                        routev3: routeCurrency,
                        inputAmount: amountCurrency,
                        outputAmount: quoteCurrency,
                    },
                ],
                v2Routes: [],
                tradeType: tradeType,
            });
        }
        else {
            const quoteCurrency = amounts_1.CurrencyAmount.fromFractionalAmount(tokenInCurrency, quote.numerator, quote.denominator);
            const amountCurrency = amounts_1.CurrencyAmount.fromFractionalAmount(tokenOutCurrency, amount.numerator, amount.denominator);
            const routeCurrency = new v3_sdk_1.Route(route.pools, quoteCurrency.currency, amountCurrency.currency);
            return new router_sdk_1.Trade({
                v3Routes: [
                    {
                        routev3: routeCurrency,
                        inputAmount: quoteCurrency,
                        outputAmount: amountCurrency,
                    },
                ],
                v2Routes: [],
                tradeType: tradeType,
            });
        }
    }
    buildMethodParameters(trade, swapConfig) {
        const { recipient, slippageTolerance, deadline } = swapConfig;
        const methodParameters = router_sdk_1.SwapRouter.swapCallParameters(trade, {
            recipient,
            slippageTolerance,
            deadlineOrPreviousBlockhash: deadline,
            // ...(signatureData
            //   ? {
            //       inputTokenPermit:
            //         'allowed' in signatureData
            //           ? {
            //               expiry: signatureData.deadline,
            //               nonce: signatureData.nonce,
            //               s: signatureData.s,
            //               r: signatureData.r,
            //               v: signatureData.v as any,
            //             }
            //           : {
            //               deadline: signatureData.deadline,
            //               amount: signatureData.amount,
            //               s: signatureData.s,
            //               r: signatureData.r,
            //               v: signatureData.v as any,
            //             },
            //     }
            //   : {}),
        });
        return methodParameters;
    }
}
exports.LegacyRouter = LegacyRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVnYWN5LXJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9yb3V0ZXJzL2xlZ2FjeS1yb3V0ZXIvbGVnYWN5LXJvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxvREFBd0Q7QUFDeEQsZ0RBQStEO0FBQy9ELDRDQUEyRTtBQUMzRSxtQ0FBMkM7QUFDM0Msb0RBQXVCO0FBRXZCLG1FQUl3QztBQU14QyxnREFBb0Q7QUFFcEQsd0NBQXFDO0FBQ3JDLDhDQUFrRDtBQUNsRCxrREFBd0Q7QUFDeEQsc0NBQXFFO0FBQ3JFLG1DQUlpQjtBQVVqQiwyQkFBMkI7QUFDM0IsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0FBTW5COzs7O0dBSUc7QUFDSCxNQUFhLFlBQVk7SUFPdkIsWUFBWSxFQUNWLE9BQU8sRUFDUCxrQkFBa0IsRUFDbEIsWUFBWSxFQUNaLGFBQWEsRUFDYixhQUFhLEdBQ007UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO1FBQzdDLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3JDLENBQUM7SUFDTSxLQUFLLENBQUMsS0FBSyxDQUNoQixNQUFzQixFQUN0QixhQUF1QixFQUN2QixRQUFtQixFQUNuQixVQUF3QixFQUN4QixvQkFBbUQ7UUFFbkQsSUFBSSxRQUFRLElBQUksb0JBQVMsQ0FBQyxXQUFXLEVBQUU7WUFDckMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUN0QixNQUFNLENBQUMsUUFBUSxFQUNmLGFBQWEsRUFDYixNQUFNLEVBQ04sVUFBVSxFQUNWLG9CQUFvQixDQUNyQixDQUFDO1NBQ0g7UUFFRCxPQUFPLElBQUksQ0FBQyxhQUFh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