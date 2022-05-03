"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCommand = void 0;
/// <reference types="./types/bunyan-debug-stream" />
const command_1 = require("@oclif/command");
const default_token_list_1 = __importDefault(require("@uniswap/default-token-list"));
const bunyan_1 = __importDefault(require("bunyan"));
const bunyan_debug_stream_1 = __importDefault(require("bunyan-debug-stream"));
const ethers_1 = require("ethers");
const lodash_1 = __importDefault(require("lodash"));
const node_cache_1 = __importDefault(require("node-cache"));
const src_1 = require("../src");
const legacy_gas_price_provider_1 = require("../src/providers/legacy-gas-price-provider");
const on_chain_gas_price_provider_1 = require("../src/providers/on-chain-gas-price-provider");
class BaseCommand extends command_1.Command {
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
            : bunyan_1.default.createLogger({
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
        const logLevel = debug || debugJSON ? bunyan_1.default.DEBUG : bunyan_1.default.INFO;
        this._log = bunyan_1.default.createLogger({
            name: 'Uniswap Smart Order Router',
            serializers: bunyan_1.default.stdSerializers,
            level: logLevel,
            streams: debugJSON
                ? undefined
                : [
                    {
                        level: logLevel,
                        type: 'stream',
                        stream: bunyan_debug_stream_1.default({
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
            src_1.setGlobalLogger(this.logger);
        }
        const metricLogger = new src_1.MetricLogger();
        src_1.setGlobalMetric(metricLogger);
        const chainId = src_1.ID_TO_CHAIN_ID(chainIdNumb);
        const chainProvider = src_1.ID_TO_PROVIDER(chainId);
        const provider = new ethers_1.ethers.providers.JsonRpcProvider(chainProvider, chainId);
        this._blockNumber = await provider.getBlockNumber();
        const tokenCache = new src_1.NodeJSCache(new node_cache_1.default({ stdTTL: 3600, useClones: false }));
        let tokenListProvider;
        if (tokenListURI) {
            tokenListProvider = await src_1.CachingTokenListProvider.fromTokenListURI(chainId, tokenListURI, tokenCache);
        }
        else {
            tokenListProvider = await src_1.CachingTokenListProvider.fromTokenList(chainId, default_token_list_1.default, tokenCache);
        }
        const multicall2Provider = new src_1.UniswapMulticallProvider(chainId, provider);
        this._multicall2Provider = multicall2Provider;
        this._poolProvider = new src_1.V3PoolProvider(chainId, multicall2Provider);
        // initialize tokenProvider
        const tokenProviderOnChain = new src_1.TokenProvider(chainId, multicall2Provider);
        this._tokenProvider = new src_1.CachingTokenProviderWithFallback(chainId, tokenCache, tokenListProvider, tokenProviderOnChain);
        if (routerStr == 'legacy') {
            this._router = new src_1.LegacyRouter({
                chainId,
                multicall2Provider,
                poolProvider: new src_1.V3PoolProvider(chainId, multicall2Provider),
                quoteProvider: new src_1.V3QuoteProvider(chainId, provider, multicall2Provider),
                tokenProvider: this.tokenProvider,
            });
        }
        else {
            const gasPriceCache = new src_1.NodeJSCache(new node_cache_1.default({ stdTTL: 15, useClones: true }));
            // const useDefaultQuoteProvider =
            //   chainId != ChainId.ARBITRUM_ONE && chainId != ChainId.ARBITRUM_RINKEBY;
            const router = new src_1.AlphaRouter({
                provider,
                chainId,
                multicall2Provider: multicall2Provider,
                gasPriceProvider: new src_1.CachingGasStationProvider(chainId, new on_chain_gas_price_provider_1.OnChainGasPriceProvider(chainId, new src_1.EIP1559GasPriceProvider(provider), new legacy_gas_price_provider_1.LegacyGasPriceProvider(provider)), gasPriceCache),
            });
            this._swapToRatioRouter = router;
            this._router = router;
        }
    }
    logSwapResults(routeAmounts, quote, quoteGasAdjusted, estimatedGasUsedQuoteToken, estimatedGasUsedUSD, methodParameters, blockNumber, estimatedGasUsed, gasPriceWei) {
        this.logger.info(`Best Route:`);
        this.logger.info(`${src_1.routeAmountsToString(routeAmounts)}`);
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
        let total = ethers_1.BigNumber.from(0);
        for (let i = 0; i < v3Routes.length; i++) {
            const route = v3Routes[i];
            const tick = ethers_1.BigNumber.from(Math.max(1, lodash_1.default.sum(route.initializedTicksCrossedList)));
            total = total.add(tick);
        }
        this.logger.info(`Total ticks crossed: ${total}`);
    }
}
exports.BaseCommand = BaseCommand;
BaseCommand.flags = {
    topN: command_1.flags.integer({
        required: false,
        default: 3,
    }),
    topNTokenInOut: command_1.flags.integer({
        required: false,
        default: 2,
    }),
    topNSecondHop: command_1.flags.integer({
        required: false,
        default: 0,
    }),
    topNWithEachBaseToken: command_1.flags.integer({
        required: false,
        default: 2,
    }),
    topNWithBaseToken: command_1.flags.integer({
        required: false,
        default: 6,
    }),
    topNWithBaseTokenInSet: command_1.flags.boolean({
        required: false,
        default: false,
    }),
    topNDirectSwaps: command_1.flags.integer({
        required: false,
        default: 2,
    }),
    maxSwapsPerPath: command_1.flags.integer({
        required: false,
        default: 3,
    }),
    minSplits: command_1.flags.integer({
        required: false,
        default: 1,
    }),
    maxSplits: command_1.flags.integer({
        required: false,
        default: 3,
    }),
    distributionPercent: command_1.flags.integer({
        required: false,
        default: 5,
    }),
    chainId: command_1.flags.integer({
        char: 'c',
        required: false,
        default: src_1.ChainId.MAINNET,
        options: src_1.CHAIN_IDS_LIST,
    }),
    tokenListURI: command_1.flags.string({
        required: false,
    }),
    router: command_1.flags.string({
        char: 's',
        required: false,
        default: 'alpha',
    }),
    debug: command_1.flags.boolean(),
    debugJSON: command_1.flags.boolean(),
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1jb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY2xpL2Jhc2UtY29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxxREFBcUQ7QUFDckQsNENBQWdEO0FBRWhELHFGQUE2RDtBQUc3RCxvREFBOEQ7QUFDOUQsOEVBQW9EO0FBQ3BELG1DQUEyQztBQUMzQyxvREFBdUI7QUFDdkIsNERBQW1DO0FBQ25DLGdDQTJCZ0I7QUFDaEIsMEZBQW9GO0FBQ3BGLDhGQUF1RjtBQUV2RixNQUFzQixXQUFZLFNBQVEsaUJBQU87SUFBakQ7O1FBZ0VVLFNBQUksR0FBa0IsSUFBSSxDQUFDO1FBQzNCLFlBQU8sR0FBd0IsSUFBSSxDQUFDO1FBQ3BDLHVCQUFrQixHQUFrQyxJQUFJLENBQUM7UUFDekQsbUJBQWMsR0FBMEIsSUFBSSxDQUFDO1FBQzdDLGtCQUFhLEdBQTJCLElBQUksQ0FBQztRQUM3QyxpQkFBWSxHQUFrQixJQUFJLENBQUM7UUFDbkMsd0JBQW1CLEdBQW9DLElBQUksQ0FBQztJQTJPdEUsQ0FBQztJQXpPQyxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxJQUFJO1lBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJO1lBQ1gsQ0FBQyxDQUFDLGdCQUFNLENBQUMsWUFBWSxDQUFDO2dCQUNsQixJQUFJLEVBQUUsZ0JBQWdCO2FBQ3ZCLENBQUMsQ0FBQztJQUNULENBQUM7SUFFRCxJQUFJLE1BQU07UUFDUixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ3JCO2FBQU07WUFDTCxNQUFNLHdCQUF3QixDQUFDO1NBQ2hDO0lBQ0gsQ0FBQztJQUVELElBQUksaUJBQWlCO1FBQ25CLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzNCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDO1NBQ2hDO2FBQU07WUFDTCxNQUFNLG1D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