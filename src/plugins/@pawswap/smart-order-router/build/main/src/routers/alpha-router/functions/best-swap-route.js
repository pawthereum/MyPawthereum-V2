"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBestSwapRouteBy = exports.getBestSwapRoute = void 0;
const router_sdk_1 = require("@uniswap/router-sdk");
const sdk_core_1 = require("@uniswap/sdk-core");
const ethers_1 = require("ethers");
const jsbi_1 = __importDefault(require("jsbi"));
const lodash_1 = __importDefault(require("lodash"));
const mnemonist_1 = require("mnemonist");
const util_1 = require("../../../util");
const amounts_1 = require("../../../util/amounts");
const log_1 = require("../../../util/log");
const metric_1 = require("../../../util/metric");
const routes_1 = require("../../../util/routes");
const gas_models_1 = require("../gas-models");
async function getBestSwapRoute(amount, percents, routesWithValidQuotes, routeType, chainId, routingConfig, gasModel) {
    const now = Date.now();
    // Build a map of percentage of the input to list of valid quotes.
    // Quotes can be null for a variety of reasons (not enough liquidity etc), so we drop them here too.
    const percentToQuotes = {};
    for (const routeWithValidQuote of routesWithValidQuotes) {
        if (!percentToQuotes[routeWithValidQuote.percent]) {
            percentToQuotes[routeWithValidQuote.percent] = [];
        }
        percentToQuotes[routeWithValidQuote.percent].push(routeWithValidQuote);
    }
    metric_1.metric.putMetric('BuildRouteWithValidQuoteObjects', Date.now() - now, metric_1.MetricLoggerUnit.Milliseconds);
    // Given all the valid quotes for each percentage find the optimal route.
    const swapRoute = await getBestSwapRouteBy(routeType, percentToQuotes, percents, chainId, (rq) => rq.quoteAdjustedForGas, routingConfig, gasModel);
    // It is possible we were unable to find any valid route given the quotes.
    if (!swapRoute) {
        return null;
    }
    // Due to potential loss of precision when taking percentages of the input it is possible that the sum of the amounts of each
    // route of our optimal quote may not add up exactly to exactIn or exactOut.
    //
    // We check this here, and if there is a mismatch
    // add the missing amount to a random route. The missing amount size should be neglible so the quote should still be highly accurate.
    const { routes: routeAmounts } = swapRoute;
    const totalAmount = lodash_1.default.reduce(routeAmounts, (total, routeAmount) => total.add(routeAmount.amount), amounts_1.CurrencyAmount.fromRawAmount(routeAmounts[0].amount.currency, 0));
    const missingAmount = amount.subtract(totalAmount);
    if (missingAmount.greaterThan(0)) {
        log_1.log.info({
            missingAmount: missingAmount.quotient.toString(),
        }, `Optimal route's amounts did not equal exactIn/exactOut total. Adding missing amount to last route in array.`);
        routeAmounts[routeAmounts.length - 1].amount =
            routeAmounts[routeAmounts.length - 1].amount.add(missingAmount);
    }
    log_1.log.info({
        routes: routes_1.routeAmountsToString(routeAmounts),
        numSplits: routeAmounts.length,
        amount: amount.toExact(),
        quote: swapRoute.quote.toExact(),
        quoteGasAdjusted: swapRoute.quoteGasAdjusted.toFixed(Math.min(swapRoute.quoteGasAdjusted.currency.decimals, 2)),
        estimatedGasUSD: swapRoute.estimatedGasUsedUSD.toFixed(Math.min(swapRoute.estimatedGasUsedUSD.currency.decimals, 2)),
        estimatedGasToken: swapRoute.estimatedGasUsedQuoteToken.toFixed(Math.min(swapRoute.estimatedGasUsedQuoteToken.currency.decimals, 2)),
    }, `Found best swap route. ${routeAmounts.length} split.`);
    return swapRoute;
}
exports.getBestSwapRoute = getBestSwapRoute;
async function getBestSwapRouteBy(routeType, percentToQuotes, percents, chainId, by, routingConfig, gasModel) {
    var _a;
    // Build a map of percentage to sorted list of quotes, with the biggest quote being first in the list.
    const percentToSortedQuotes = lodash_1.default.mapValues(percentToQuotes, (routeQuotes) => {
        return routeQuotes.sort((routeQuoteA, routeQuoteB) => {
            if (routeType == sdk_core_1.TradeType.EXACT_INPUT) {
                return by(routeQuoteA).greaterThan(by(routeQuoteB)) ? -1 : 1;
            }
            else {
                return by(routeQuoteA).lessThan(by(routeQuoteB)) ? -1 : 1;
            }
        });
    });
    log_1.log.info({
        percentToTop5SortedQuotes: lodash_1.default.mapValues(percentToSortedQuotes, (ps) => lodash_1.default.map(ps.slice(0, 5), (p) => ({
            protocol: p.protocol,
            route: routes_1.routeToString(p.route),
            percent: p.percent,
            quote: p.quoteAdjustedForGas.toFixed(Math.min(p.quoteToken.decimals, 2)),
        }))),
    }, 'Top 5 Quotes for each percentage');
    const quoteCompFn = routeType == sdk_core_1.TradeType.EXACT_INPUT
        ? (a, b) => a.greaterThan(b)
        : (a, b) => a.lessThan(b);
    const sumFn = (currencyAmounts) => {
        let sum = currencyAmounts[0];
        for (let i = 1; i < currencyAmounts.length; i++) {
            sum = sum.add(currencyAmounts[i]);
        }
        return sum;
    };
    let bestQuote;
    let bestSwap;
    // Min-heap for tracking the 5 best swaps given some number of splits.
    const bestSwapsPerSplit = new mnemonist_1.FixedReverseHeap(Array, (a, b) => {
        return quoteCompFn(a.quote, b.quote) ? -1 : 1;
    }, 5);
    const { minSplits, maxSplits, forceCrossProtocol } = routingConfig;
    if (!percentToSortedQuotes[100] || minSplits > 1 || forceCrossProtocol) {
        log_1.log.info({
            percentToSortedQuotes: lodash_1.default.mapValues(percentToSortedQuotes, (p) => p.length),
        }, 'Did not find a valid route without any splits. Continuing search anyway.');
    }
    else {
        bestQuote = by(percentToSortedQuotes[100][0]);
        bestSwap = [percentToSortedQuotes[100][0]];
        for (const routeWithQuote of percentToSortedQuotes[100].slice(0, 5)) {
            bestSwapsPerSplit.push({
                quote: by(routeWithQuote),
                routes: [routeWithQuote],
            });
        }
    }
    // We do a BFS. Each additional node in a path represents us adding an additional split to the route.
    const queue = new mnemonist_1.Queue();
    // First we seed BFS queue with the best quotes for each percentage.
    // i.e. [best quote when sending 10% of amount, best quote when sending 20% of amount, ...]
    // We will explore the various combinations from each node.
    for (let i = percents.length; i >= 0; i--) {
        const percent = percents[i];
        if (!percentToSortedQuotes[percent]) {
            continue;
        }
        queue.enqueue({
            curRoutes: [percentToSortedQuotes[percent][0]],
            percentIndex: i,
            remainingPercent: 100 - percent,
            special: false,
        });
        if (!percentToSortedQuotes[percent] ||
            !percentToSortedQuotes[percent][1]) {
            continue;
        }
        queue.enqueue({
            curRoutes: [percentToSortedQuotes[percent][1]],
            percentIndex: i,
            remainingPercent: 100 - percent,
            special: true,
        });
    }
    let splits = 1;
    let startedSplit = Date.now();
    while (queue.size > 0) {
        metric_1.metric.putMetric(`Split${splits}Done`, Date.now() - startedSplit, metric_1.MetricLoggerUnit.Milliseconds);
        startedSplit = Date.now();
        log_1.log.info({
            top5: lodash_1.default.map(Array.from(bestSwapsPerSplit.consume()), (q) => `${q.quote.toExact()} (${lodash_1.default(q.routes)
                .map((r) => r.toString())
                .join(', ')})`),
            onQueue: queue.size,
        }, `Top 5 with ${splits} splits`);
        bestSwapsPerSplit.clear();
        // Size of the queue at this point is the number of potential routes we are investigating for the given number of splits.
        let layer = queue.size;
        splits++;
        // If we didn't improve our quote by adding another split, very unlikely to improve it by splitting more after that.
        if (splits >= 3 && bestSwap && bestSwap.length < splits - 1) {
            break;
        }
        if (splits > maxSplits) {
            log_1.log.info('Max splits reached. Stopping search.');
            metric_1.metric.putMetric(`MaxSplitsHitReached`, 1, metric_1.MetricLoggerUnit.Count);
            break;
        }
        while (layer > 0) {
            layer--;
            const { remainingPercent, curRoutes, percentIndex, special } = queue.dequeue();
            // For all other percentages, add a new potential route.
            // E.g. if our current aggregated route if missing 50%, we will create new nodes and add to the queue for:
            // 50% + new 10% route, 50% + new 20% route, etc.
            for (let i = percentIndex; i >= 0; i--) {
                const percentA = percents[i];
                if (percentA > remainingPercent) {
                    continue;
                }
                // At some point the amount * percentage is so small that the quoter is unable to get
                // a quote. In this case there could be no quotes for that percentage.
                if (!percentToSortedQuotes[percentA]) {
                    continue;
                }
                const candidateRoutesA = percentToSortedQuotes[percentA];
                // Find the best route in the complimentary percentage that doesn't re-use a pool already
                // used in the current route. Re-using pools is not allowed as each swap through a pool changes its liquidity,
                // so it would make the quotes inaccurate.
                const routeWithQuoteA = findFirstRouteNotUsingUsedPools(curRoutes, candidateRoutesA, forceCrossProtocol);
                if (!routeWithQuoteA) {
                    continue;
                }
                const remainingPercentNew = remainingPercent - percentA;
                const curRoutesNew = [...curRoutes, routeWithQuoteA];
                // If we've found a route combination that uses all 100%, and it has at least minSplits, update our best route.
                if (remainingPercentNew == 0 && splits >= minSplits) {
                    const quotesNew = lodash_1.default.map(curRoutesNew, (r) => by(r));
                    const quoteNew = sumFn(quotesNew);
                    let gasCostL1QuoteToken = amounts_1.CurrencyAmount.fromRawAmount(quoteNew.currency, 0);
                    if (util_1.HAS_L1_FEE.includes(chainId)) {
                        const onlyV3Routes = curRoutesNew.every((route) => route.protocol == router_sdk_1.Protocol.V3);
                        if (gasModel == undefined || !onlyV3Routes) {
                            throw new Error("Can't compute L1 gas fees.");
                        }
                        else {
                            const gasCostL1 = await gasModel.calculateL1GasFees(curRoutesNew);
                            gasCostL1QuoteToken = gasCostL1.gasCostL1QuoteToken;
                        }
                    }
                    const quoteAfterL1Adjust = routeType == sdk_core_1.TradeType.EXACT_INPUT
                        ? quoteNew.subtract(gasCostL1QuoteToken)
                        : quoteNew.add(gasCostL1QuoteToken);
                    bestSwapsPerSplit.push({
                        quote: quoteAfterL1Adjust,
                        routes: curRoutesNew,
                    });
                    if (!bestQuote || quoteCompFn(quoteAfterL1Adjust, bestQuote)) {
                        bestQuote = quoteAfterL1Adjust;
                        bestSwap = curRoutesNew;
                        // Temporary experiment.
                        if (special) {
                            metric_1.metric.putMetric(`BestSwapNotPickingBestForPercent`, 1, metric_1.MetricLoggerUnit.Count);
                        }
                    }
                }
                else {
                    queue.enqueue({
                        curRoutes: curRoutesNew,
                        remainingPercent: remainingPercentNew,
                        percentIndex: i,
                        special,
                    });
                }
            }
        }
    }
    if (!bestSwap) {
        log_1.log.info(`Could not find a valid swap`);
        return undefined;
    }
    const postSplitNow = Date.now();
    let quoteGasAdjusted = sumFn(lodash_1.default.map(bestSwap, (routeWithValidQuote) => routeWithValidQuote.quoteAdjustedForGas));
    // this calculates the base gas used
    // if on L1, its the estimated gas used based on hops and ticks across all the routes
    // if on L2, its the gas used on the L2 based on hops and ticks across all the routes
    const estimatedGasUsed = lodash_1.default(bestSwap)
        .map((routeWithValidQuote) => routeWithValidQuote.gasEstimate)
        .reduce((sum, routeWithValidQuote) => sum.add(routeWithValidQuote), ethers_1.BigNumber.from(0));
    if (!gas_models_1.usdGasTokensByChain[chainId] || !gas_models_1.usdGasTokensByChain[chainId][0]) {
        // Each route can use a different stablecoin to account its gas costs.
        // They should all be pegged, and this is just an estimate, so we do a merge
        // to an arbitrary stable.
        throw new Error(`Could not find a USD token for computing gas costs on ${chainId}`);
    }
    const usdToken = gas_models_1.usdGasTokensByChain[chainId][0];
    const usdTokenDecimals = usdToken.decimals;
    // if on L2, calculate the L1 security fee
    let gasCostsL1ToL2 = {
        gasUsedL1: ethers_1.BigNumber.from(0),
        gasCostL1USD: amounts_1.CurrencyAmount.fromRawAmount(usdToken, 0),
        gasCostL1QuoteToken: amounts_1.CurrencyAmount.fromRawAmount((_a = bestSwap[0]) === null || _a === void 0 ? void 0 : _a.quoteToken, 0),
    };
    // If swapping on an L2 that includes a L1 security fee, calculate the fee and include it in the gas adjusted quotes
    if (util_1.HAS_L1_FEE.includes(chainId)) {
        // ensure the gasModel exists and that the swap route is a v3 only route
        const onlyV3Routes = bestSwap.every((route) => route.protocol == router_sdk_1.Protocol.V3);
        if (gasModel == undefined || !onlyV3Routes) {
            throw new Error("Can't compute L1 gas fees.");
        }
        else {
            gasCostsL1ToL2 = await gasModel.calculateL1GasFees(bestSwap);
        }
    }
    const { gasCostL1USD, gasCostL1QuoteToken } = gasCostsL1ToL2;
    // For each gas estimate, normalize decimals to that of the chosen usd token.
    const estimatedGasUsedUSDs = lodash_1.default(bestSwap)
        .map((routeWithValidQuote) => {
        const decimalsDiff = usdTokenDecimals - routeWithValidQuote.gasCostInUSD.currency.decimals;
        if (decimalsDiff == 0) {
            return amounts_1.CurrencyAmount.fromRawAmount(usdToken, routeWithValidQuote.gasCostInUSD.quotient);
        }
        return amounts_1.CurrencyAmount.fromRawAmount(usdToken, jsbi_1.default.multiply(routeWithValidQuote.gasCostInUSD.quotient, jsbi_1.default.exponentiate(jsbi_1.default.BigInt(10), jsbi_1.default.BigInt(decimalsDiff))));
    })
        .value();
    let estimatedGasUsedUSD = sumFn(estimatedGasUsedUSDs);
    // if they are different usd pools, convert to the usdToken
    if (estimatedGasUsedUSD.currency != gasCostL1USD.currency) {
        const decimalsDiff = usdTokenDecimals - gasCostL1USD.currency.decimals;
        estimatedGasUsedUSD = estimatedGasUsedUSD.add(amounts_1.CurrencyAmount.fromRawAmount(usdToken, jsbi_1.default.multiply(gasCostL1USD.quotient, jsbi_1.default.exponentiate(jsbi_1.default.BigInt(10), jsbi_1.default.BigInt(decimalsDiff)))));
    }
    else {
        estimatedGasUsedUSD = estimatedGasUsedUSD.add(gasCostL1USD);
    }
    log_1.log.info({
        estimatedGasUsedUSD: estimatedGasUsedUSD.toExact(),
        normalizedUsdToken: usdToken,
        routeUSDGasEstimates: lodash_1.default.map(bestSwap, (b) => `${b.percent}% ${routes_1.routeToString(b.route)} ${b.gasCostInUSD.toExact()}`),
        flatL1GasCostUSD: gasCostL1USD.toExact(),
    }, 'USD gas estimates of best route');
    const estimatedGasUsedQuoteToken = sumFn(lodash_1.default.map(bestSwap, (routeWithValidQuote) => routeWithValidQuote.gasCostInToken)).add(gasCostL1QuoteToken);
    let quote = sumFn(lodash_1.default.map(bestSwap, (routeWithValidQuote) => routeWithValidQuote.quote));
    // Adjust the quoteGasAdjusted for the l1 fee
    if (routeType == sdk_core_1.TradeType.EXACT_INPUT) {
        const quoteGasAdjustedForL1 = quoteGasAdjusted.subtract(gasCostL1QuoteToken);
        quoteGasAdjusted = quoteGasAdjustedForL1;
    }
    else {
        const quoteGasAdjustedForL1 = quoteGasAdjusted.add(gasCostL1QuoteToken);
        quoteGasAdjusted = quoteGasAdjustedForL1;
    }
    const routeWithQuotes = bestSwap.sort((routeAmountA, routeAmountB) => routeAmountB.amount.greaterThan(routeAmountA.amount) ? 1 : -1);
    metric_1.metric.putMetric('PostSplitDone', Date.now() - postSplitNow, metric_1.MetricLoggerUnit.Milliseconds);
    return {
        quote,
        quoteGasAdjusted,
        estimatedGasUsed,
        estimatedGasUsedUSD,
        estimatedGasUsedQuoteToken,
        routes: routeWithQuotes,
    };
}
exports.getBestSwapRouteBy = getBestSwapRouteBy;
// We do not allow pools to be re-used across split routes, as swapping through a pool changes the pools state.
// Given a list of used routes, this function finds the first route in the list of candidate routes that does not re-use an already used pool.
const findFirstRouteNotUsingUsedPools = (usedRoutes, candidateRouteQuotes, forceCrossProtocol) => {
    const poolAddressSet = new Set();
    const usedPoolAddresses = lodash_1.default(usedRoutes)
        .flatMap((r) => r.poolAddresses)
        .value();
    for (let poolAddress of usedPoolAddresses) {
        poolAddressSet.add(poolAddress);
    }
    const protocolsSet = new Set();
    const usedProtocols = lodash_1.default(usedRoutes)
        .flatMap((r) => r.protocol)
        .uniq()
        .value();
    for (let protocol of usedProtocols) {
        protocolsSet.add(protocol);
    }
    for (const routeQuote of candidateRouteQuotes) {
        const { poolAddresses, protocol } = routeQuote;
        if (poolAddresses.some((poolAddress) => poolAddressSet.has(poolAddress))) {
            continue;
        }
        // This code is just for debugging. Allows us to force a cross-protocol split route by skipping
        // consideration of routes that come from the same protocol as a used route.
        const needToForce = forceCrossProtocol && protocolsSet.size == 1;
        if (needToForce && protocolsSet.has(protocol)) {
            continue;
        }
        return routeQuote;
    }
    return null;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVzdC1zd2FwLXJvdXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3JvdXRlcnMvYWxwaGEtcm91dGVyL2Z1bmN0aW9ucy9iZXN0LXN3YXAtcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsb0RBQStDO0FBQy9DLGdEQUE4QztBQUM5QyxtQ0FBbUM7QUFDbkMsZ0RBQXdCO0FBQ3hCLG9EQUF1QjtBQUN2Qix5Q0FBb0Q7QUFDcEQsd0NBQW9EO0FBQ3BELG1EQUF1RDtBQUN2RCwyQ0FBd0M7QUFDeEMsaURBQWdFO0FBQ2hFLGlEQUEyRTtBQUUzRSw4Q0FBK0U7QUFNeEUsS0FBSyxVQUFVLGdCQUFnQixDQUNwQyxNQUFzQixFQUN0QixRQUFrQixFQUNsQixxQkFBNEMsRUFDNUMsU0FBb0IsRUFDcEIsT0FBZ0IsRUFDaEIsYUFBZ0MsRUFDaEMsUUFBMkM7SUFTM0MsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBRXZCLGtFQUFrRTtJQUNsRSxvR0FBb0c7SUFDcEcsTUFBTSxlQUFlLEdBQWlELEVBQUUsQ0FBQztJQUN6RSxLQUFLLE1BQU0sbUJBQW1CLElBQUkscUJBQXFCLEVBQUU7UUFDdkQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNqRCxlQUFlLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ25EO1FBQ0QsZUFBZSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0tBQ3pFO0lBRUQsZUFBTSxDQUFDLFNBQVMsQ0FDZCxpQ0FBaUMsRUFDakMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsRUFDaEIseUJBQWdCLENBQUMsWUFBWSxDQUM5QixDQUFDO0lBRUYseUVBQXlFO0lBQ3pFLE1BQU0sU0FBUyxHQUFHLE1BQU0sa0JBQWtCLENBQ3hDLFNBQVMsRUFDVCxlQUFlLEVBQ2YsUUFBUSxFQUNSLE9BQU8sRUFDUCxDQUFDLEVBQXVCLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFDbkQsYUFBYSxFQUNiLFFBQVEsQ0FDVCxDQUFDO0lBRUYsMEVBQTBFO0lBQzFFLElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDZCxPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsNkhBQTZIO0lBQzdILDRFQUE0RTtJQUM1RSxFQUFFO0lBQ0YsaURBQWlEO0lBQ2pELHFJQUFxSTtJQUNySSxNQUFNLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxHQUFHLFNBQVMsQ0FBQztJQUMzQyxNQUFNLFdBQVcsR0FBRyxnQkFBQyxDQUFDLE1BQU0sQ0FDMUIsWUFBWSxFQUNaLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQ3JELHdCQUFjLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUNsRSxDQUFDO0lBRUYsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNuRCxJQUFJLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDaEMsU0FBRyxDQUFDLElBQUksQ0FDTjtZQUNFLGFBQWEsRUFBRSxhQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtTQUNqRCxFQUNELDZHQUE2RyxDQUM5RyxDQUFDO1FBRUYsWUFBWSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFFLENBQUMsTUFBTTtZQUMzQyxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0tBQ3BFO0lBRUQsU0FBRyxDQUFDLElBQUksQ0FDTjtRQUNFLE1BQU0sRUFBRSw2QkFBb0IsQ0FBQyxZQUFZLENBQUM7UUFDMUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxNQUFNO1FBQzlCLE1BQU0sRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFO1FBQ3hCLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtRQUNoQyxnQkFBZ0IsRUFBRSxTQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUNsRCxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUMxRDtRQUNELGVBQWUsRUFBRSxTQUFTLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUNwRCxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUM3RDtRQUNELGlCQUFpQixFQUFFLFNBQVMsQ0FBQywwQkFBMEIsQ0FBQyxPQUFPLENBQzdELElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLDBCQUEwQixDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQ3BFO0tBQ0YsRUFDRCwwQkFBMEIsWUFBWSxDQUFDLE1BQU0sU0FBUyxDQUN2RCxDQUFDO0lBRUYsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQS9GRCw0Q0ErRkM7QUFFTSxLQUFLLFVBQVUsa0JBQWtCLENBQ3RDLFNBQW9CLEVBQ3BCLGVBQTZELEVBQzdELFFBQWtCLEVBQ2xCLE9BQWdCLEVBQ2hCLEVBQXVELEVBQ3ZELGFBQWdDLEVBQ2hDLFFBQTJDOztJQVkzQyxzR0FBc0c7SUFDdEcsTUFBTSxxQkFBcUIsR0FBRyxnQkFBQyxDQUFDLFNBQVMsQ0FDdkMsZUFBZSxFQUNmLENBQUMsV0FBa0MsRUFBRSxFQUFFO1FBQ3JDLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsRUFBRTtZQUNuRCxJQUFJLFNBQVMsSUFBSSxvQkFBUyxDQUFDLFdBQVcsRUFBRTtnQkFDdEMsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzlEO2lCQUFNO2dCQUNMLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMzRDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUNGLENBQUM7SUFFRixTQUFHLENBQUMsSUFBSSxDQUNOO1FBQ0UseUJBQXlCLEVBQUUsZ0JBQUMsQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUNuRSxnQkFBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM1QixRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVE7WUFDcEIsS0FBSyxFQUFFLHNCQUFhLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUM3QixPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU87WUFDbEIsS0FBSyxFQUFFLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQ25DO1NBQ0YsQ0FBQyxDQUFDLENBQ0o7S0FDRixFQUNELGtDQUFrQyxDQUNuQyxDQUFDO0lBRUYsTUFBTSxXQUFXLEdBQ2YsU0FBUyxJQUFJLG9CQUFTLENBQUMsV0FBVztRQUNoQyxDQUFDLENBQUMsQ0FBQyxDQUFpQixFQUFFLENBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQzVELENBQUMsQ0FBQyxDQUFDLENBQWlCLEVBQUUsQ0FBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU5RCxNQUFNLEtBQUssR0FBRyxDQUFDLGVBQWlDLEVBQWtCLEVBQUU7UUFDbEUsSUFBSSxHQUFHLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBRSxDQUFDO1FBQzlCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQy9DLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUUsQ0FBQyxDQUFDO1NBQ3BDO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDLENBQUM7SUFFRixJQUFJLFNBQXFDLENBQUM7SUFDMUMsSUFBSSxRQUEyQyxDQUFDO0lBRWhELHNFQUFzRTtJQUN0RSxNQUFNLGlCQUFpQixHQUFHLElBQUksNEJBQWdCLENBSTVDLEtBQUssRUFDTCxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNQLE9BQU8sV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUMsRUFDRCxDQUFDLENBQ0YsQ0FBQztJQUVGLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLEdBQUcsYUFBYSxDQUFDO0lBRW5FLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxJQUFJLGtCQUFrQixFQUFFO1FBQ3RFLFNBQUcsQ0FBQyxJQUFJLENBQ047WUFDRSxxQkFBcUIsRUFBRSxnQkFBQyxDQUFDLFNBQVMsQ0FDaEMscUJBQXFCLEVBQ3JCLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUNoQjtTQUNGLEVBQ0QsMEVBQTBFLENBQzNFLENBQUM7S0FDSDtTQUFNO1FBQ0wsU0FBUyxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQyxDQUFDO1FBQy9DLFFBQVEsR0FBRyxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDLENBQUM7UUFFNUMsS0FBSyxNQUFNLGNBQWMsSUFBSSxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQ25FLGlCQUFpQixDQUFDLElBQUksQ0FBQztnQkFDckIsS0FBSyxFQUFFLEVBQUUsQ0FBQyxjQUFjLENBQUM7Z0JBQ3pCLE1BQU0sRUFBRSxDQUFDLGNBQWMsQ0FBQzthQUN6QixDQUFDLENBQUM7U0FDSjtLQUNGO0lBRUQscUdBQXFHO0lBQ3JHLE1BQU0sS0FBSyxHQUFHLElBQUksaUJBQUssRUFLbkIsQ0FBQztJQUVMLG9FQUFvRTtJQUNwRSwyRkFBMkY7SUFDM0YsMkRBQTJEO0lBQzNELEtBQUssSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3pDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUUsQ0FBQztRQUU3QixJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbkMsU0FBUztTQUNWO1FBRUQsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUNaLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBRSxDQUFDLENBQUMsQ0FBRSxDQUFDO1lBQ2hELFlBQVksRUFBRSxDQUFDO1lBQ2YsZ0JBQWdCLEVBQUUsR0FBRyxHQUFHLE9BQU87WUFDL0IsT0FBTyxFQUFFLEtBQUs7U0FDZixDQUFDLENBQUM7UUFFSCxJQUNFLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDO1lBQy9CLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFFLENBQUMsQ0FBQyxDQUFDLEVBQ25DO1lBQ0EsU0FBUztTQUNWO1FBRUQsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUNaLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBRSxDQUFDLENBQUMsQ0FBRSxDQUFDO1lBQ2hELFlBQVksRUFBRSxDQUFDO1lBQ2YsZ0JBQWdCLEVBQUUsR0FBRyxHQUFHLE9BQU87WUFDL0IsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDLENBQUM7S0FDSjtJQUVELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNmLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUU5QixPQUFPLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFO1FBQ3JCLGVBQU0sQ0FBQyxTQUFTLENBQ2QsUUFBUSxNQUFNLE1BQU0sRUFDcEIsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLFlBQVksRUFDekIseUJBQWdCLENBQUMsWUFBWSxDQUM5QixDQUFDO1FBRUYsWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUUxQixTQUFHLENBQUMsSUFBSSxDQUNOO1lBQ0UsSUFBSSxFQUFFLGdCQUFDLENBQUMsR0FBRyxDQUNULEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUMsRUFDdkMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUNKLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxnQkFBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7aUJBQ2pDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FDbkI7WUFDRCxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUk7U0FDcEIsRUFDRCxjQUFjLE1BQU0sU0FBUyxDQUM5QixDQUFDO1FBRUYsaUJBQWlCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFMUIseUhBQXlIO1FBQ3pILElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDdkIsTUFBTSxFQUFFLENBQUM7UUFFVCxvSEFBb0g7UUFDcEgsSUFBSSxNQUFNLElBQUksQ0FBQyxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDM0QsTUFBTTtTQUNQO1FBRUQsSUFBSSxNQUFNLEdBQUcsU0FBUyxFQUFFO1lBQ3RCLFNBQUcsQ0FBQyxJQUFJLENBQUMsc0NBQXNDLENBQUMsQ0FBQztZQUNqRCxlQUFNLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUFFLENBQUMsRUFBRSx5QkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuRSxNQUFNO1NBQ1A7UUFFRCxPQUFPLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDaEIsS0FBSyxFQUFFLENBQUM7WUFFUixNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsR0FDMUQsS0FBSyxDQUFDLE9BQU8sRUFBRyxDQUFDO1lBRW5CLHdEQUF3RDtZQUN4RCwwR0FBMEc7WUFDMUcsaURBQWlEO1lBQ2pELEtBQUssSUFBSSxDQUFDLEdBQUcsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RDLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUUsQ0FBQztnQkFFOUIsSUFBSSxRQUFRLEdBQUcsZ0JBQWdCLEVBQUU7b0JBQy9CLFNBQVM7aUJBQ1Y7Z0JBRUQscUZBQXFGO2dCQUNyRixzRUFBc0U7Z0JBQ3RFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDcEMsU0FBUztpQkFDVjtnQkFFRCxNQUFNLGdCQUFnQixHQUFHLHFCQUFxQixDQUFDLFFBQVEsQ0FBRSxDQUFDO2dCQUUxRCx5RkFBeUY7Z0JBQ3pGLDhHQUE4RztnQkFDOUcsMENBQTBDO2dCQUMxQyxNQUFNLGVBQWUsR0FBRywrQkFBK0IsQ0FDckQsU0FBUyxFQUNULGdCQUFnQixFQUNoQixrQkFBa0IsQ0FDbkIsQ0FBQztnQkFFRixJQUFJLENBQUMsZUFBZSxFQUFFO29CQUNwQixTQUFTO2lCQUNWO2dCQUVELE1BQU0sbUJBQW1CLEdBQUcsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDO2dCQUN4RCxNQUFNLFlBQVksR0FBRyxDQUFDLEdBQUcsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUVyRCwrR0FBK0c7Z0JBQy9HLElBQUksbUJBQW1CLElBQUksQ0FBQyxJQUFJLE1BQU0sSUFBSSxTQUFTLEVBQUU7b0JBQ25ELE1BQU0sU0FBUyxHQUFHLGdCQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BELE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFFbEMsSUFBSSxtQkFBbUIsR0FBRyx3QkFBYyxDQUFDLGFBQWEsQ0FDcEQsUUFBUSxDQUFDLFFBQVEsRUFDakIsQ0FBQyxDQUNGLENBQUM7b0JBRUYsSUFBSSxpQkFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTt3QkFDaEMsTUFBTSxZQUFZLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FDckMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUkscUJBQVEsQ0FBQyxFQUFFLENBQ3pDLENBQUM7d0JBRUYsSUFBSSxRQUFRLElBQUksU0FBUyxJQUFJLENBQUMsWUFBWSxFQUFFOzRCQUMxQyxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7eUJBQy9DOzZCQUFNOzRCQUNMLE1BQU0sU0FBUyxHQUFHLE1BQU0sUUFBUSxDQUFDLGtCQUFtQixDQUNsRCxZQUF1QyxDQUN4QyxDQUFDOzRCQUNGLG1CQUFtQixHQUFHLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQzt5QkFDckQ7cUJBQ0Y7b0JBRUQsTUFBTSxrQkFBa0IsR0FDdEIsU0FBUyxJQUFJLG9CQUFTLENBQUMsV0FBVzt3QkFDaEMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUM7d0JBQ3hDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7b0JBRXhDLGlCQUFpQixDQUFDLElBQUksQ0FBQzt3QkFDckIsS0FBSyxFQUFFLGtCQUFrQjt3QkFDekIsTUFBTSxFQUFFLFlBQVk7cUJBQ3JCLENBQUMsQ0FBQztvQkFFSCxJQUFJLENBQUMsU0FBUyxJQUFJLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxTQUFTLENBQUMsRUFBRTt3QkFDNUQsU0FBUyxHQUFHLGtCQUFrQixDQUFDO3dCQUMvQixRQUFRLEdBQUcsWUFBWSxDQUFDO3dCQUV4Qix3QkFBd0I7d0JBQ3hCLElBQUksT0FBTyxFQUFFOzRCQUNYLGVBQU0sQ0FBQyxTQUFTLENBQ2Qsa0NBQWtDLEVBQ2xDLENBQUMsRUFDRCx5QkFBZ0IsQ0FBQyxLQUFLLENBQ3ZCLENBQUM7eUJBQ0g7cUJBQ0Y7aUJBQ0Y7cUJBQU07b0JBQ0wsS0FBSyxDQUFDLE9BQU8sQ0FBQzt3QkFDWixTQUFTLEVBQUUsWUFBWTt3QkFDdkIsZ0JBQWdCLEVBQUUsbUJBQW1CO3dCQUNyQyxZQUFZLEVBQUUsQ0FBQzt3QkFDZixPQUFPO3FCQUNSLENBQUMsQ0FBQztpQkFDSjthQUNGO1NBQ0Y7S0FDRjtJQUVELElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixTQUFHLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDeEMsT0FBTyxTQUFTLENBQUM7S0FDbEI7SUFFRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFaEMsSUFBSSxnQkFBZ0IsR0FBRyxLQUFLLENBQzFCLGdCQUFDLENBQUMsR0FBRyxDQUNILFFBQVEsRUFDUixDQUFDLG1CQUFtQixFQUFFLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FDakUsQ0FDRixDQUFDO0lBRUYsb0NBQW9DO0lBQ3BDLHFGQUFxRjtJQUNyRixxRkFBcUY7SUFDckYsTUFBTSxnQkFBZ0IsR0FBRyxnQkFBQyxDQUFDLFFBQVEsQ0FBQztTQUNqQyxHQUFHLENBQUMsQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDO1NBQzdELE1BQU0sQ0FDTCxDQUFDLEdBQUcsRUFBRSxtQkFBbUIsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxFQUMxRCxrQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDbEIsQ0FBQztJQUVKLElBQUksQ0FBQyxnQ0FBbUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdDQUFtQixDQUFDLE9BQU8sQ0FBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ3RFLHNFQUFzRTtRQUN0RSw0RUFBNEU7UUFDNUUsMEJBQTBCO1FBQzFCLE1BQU0sSUFBSSxLQUFLLENBQ2IseURBQXlELE9BQU8sRUFBRSxDQUNuRSxDQUFDO0tBQ0g7SUFDRCxNQUFNLFFBQVEsR0FBRyxnQ0FBbUIsQ0FBQyxPQUFPLENBQUUsQ0FBQyxDQUFDLENBQUUsQ0FBQztJQUNuRCxNQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFFM0MsMENBQTBDO0lBQzFDLElBQUksY0FBYyxHQUFtQjtRQUNuQyxTQUFTLEVBQUUsa0JBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzVCLFlBQVksRUFBRSx3QkFBYyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELG1CQUFtQixFQUFFLHdCQUFjLENBQUMsYUFBYSxDQUMvQyxNQUFBLFFBQVEsQ0FBQyxDQUFDLENBQUMsMENBQUUsVUFBVyxFQUN4QixDQUFDLENBQ0Y7S0FDRixDQUFDO0lBQ0Ysb0hBQW9IO0lBQ3BILElBQUksaUJBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDaEMsd0VBQXdFO1FBQ3hFLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQ2pDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLHFCQUFRLENBQUMsRUFBRSxDQUN6QyxDQUFDO1FBQ0YsSUFBSSxRQUFRLElBQUksU0FBUyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQzFDLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztTQUMvQzthQUFNO1lBQ0wsY0FBYyxHQUFHLE1BQU0sUUFBUSxDQUFDLGtCQUFtQixDQUNqRCxRQUFtQyxDQUNwQyxDQUFDO1NBQ0g7S0FDRjtJQUVELE1BQU0sRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsR0FBRyxjQUFjLENBQUM7SUFFN0QsNkVBQTZFO0lBQzdFLE1BQU0sb0JBQW9CLEdBQUcsZ0JBQUMsQ0FBQyxRQUFRLENBQUM7U0FDckMsR0FBRyxDQUFDLENBQUMsbUJBQW1CLEVBQUUsRUFBRTtRQUMzQixNQUFNLFlBQVksR0FDaEIsZ0JBQWdCLEdBQUcsbUJBQW1CLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFFeEUsSUFBSSxZQUFZLElBQUksQ0FBQyxFQUFFO1lBQ3JCLE9BQU8sd0JBQWMsQ0FBQyxhQUFhLENBQ2pDLFFBQVEsRUFDUixtQkFBbUIsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUMxQyxDQUFDO1NBQ0g7UUFFRCxPQUFPLHdCQUFjLENBQUMsYUFBYSxDQUNqQyxRQUFRLEVBQ1IsY0FBSSxDQUFDLFFBQVEsQ0FDWCxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUN6QyxjQUFJLENBQUMsWUFBWSxDQUFDLGNBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsY0FBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUM5RCxDQUNGLENBQUM7SUFDSixDQUFDLENBQUM7U0FDRCxLQUFLLEVBQUUsQ0FBQztJQUVYLElBQUksbUJBQW1CLEdBQUcsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFFdEQsMkRBQTJEO0lBQzNELElBQUksbUJBQW1CLENBQUMsUUFBUSxJQUFJLFlBQVksQ0FBQyxRQUFRLEVBQUU7UUFDekQsTUFBTSxZQUFZLEdBQUcsZ0JBQWdCLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDdkUsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUMsR0FBRyxDQUMzQyx3QkFBYyxDQUFDLGFBQWEsQ0FDMUIsUUFBUSxFQUNSLGNBQUksQ0FBQyxRQUFRLENBQ1gsWUFBWSxDQUFDLFFBQVEsRUFDckIsY0FBSSxDQUFDLFlBQVksQ0FBQyxjQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLGNBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FDOUQsQ0FDRixDQUNGLENBQUM7S0FDSDtTQUFNO1FBQ0wsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQzdEO0lBRUQsU0FBRyxDQUFDLElBQUksQ0FDTjtRQUNFLG1CQUFtQixFQUFFLG1CQUFtQixDQUFDLE9BQU8sRUFBRTtRQUNsRCxrQkFBa0IsRUFBRSxRQUFRO1FBQzVCLG9CQUFvQixFQUFFLGdCQUFDLENBQUMsR0FBRyxDQUN6QixRQUFRLEVBQ1IsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUNKLEdBQUcsQ0FBQyxDQUFDLE9BQU8sS0FBSyxzQkFBYSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQ3hFO1FBQ0QsZ0JBQWdCLEVBQUUsWUFBWSxDQUFDLE9BQU8sRUFBRTtLQUN6QyxFQUNELGlDQUFpQyxDQUNsQyxDQUFDO0lBRUYsTUFBTSwwQkFBMEIsR0FBRyxLQUFLLENBQ3RDLGdCQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLG1CQUFtQixFQUFFLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FDN0UsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUUzQixJQUFJLEtBQUssR0FBRyxLQUFLLENBQ2YsZ0JBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUNwRSxDQUFDO0lBRUYsNkNBQTZDO0lBQzdDLElBQUksU0FBUyxJQUFJLG9CQUFTLENBQUMsV0FBVyxFQUFFO1FBQ3RDLE1BQU0scUJBQXFCLEdBQ3pCLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2pELGdCQUFnQixHQUFHLHFCQUFxQixDQUFDO0tBQzFDO1NBQU07UUFDTCxNQUFNLHFCQUFxQixHQUFHLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3hFLGdCQUFnQixHQUFHLHFCQUFxQixDQUFDO0tBQzFDO0lBRUQsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsRUFBRSxDQUNuRSxZQUFZLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQzlELENBQUM7SUFFRixlQUFNLENBQUMsU0FBUyxDQUNkLGVBQWUsRUFDZixJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsWUFBWSxFQUN6Qix5QkFBZ0IsQ0FBQyxZQUFZLENBQzlCLENBQUM7SUFDRixPQUFPO1FBQ0wsS0FBSztRQUNMLGdCQUFnQjtRQUNoQixnQkFBZ0I7UUFDaEIsbUJBQW1CO1FBQ25CLDBCQUEwQjtRQUMxQixNQUFNLEVBQUUsZUFBZTtLQUN4QixDQUFDO0FBQ0osQ0FBQztBQW5iRCxnREFtYkM7QUFFRCwrR0FBK0c7QUFDL0csOElBQThJO0FBQzlJLE1BQU0sK0JBQStCLEdBQUcsQ0FDdEMsVUFBaUMsRUFDakMsb0JBQTJDLEVBQzNDLGtCQUEyQixFQUNDLEVBQUU7SUFDOUIsTUFBTSxjQUFjLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNqQyxNQUFNLGlCQUFpQixHQUFHLGdCQUFDLENBQUMsVUFBVSxDQUFDO1NBQ3BDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztTQUMvQixLQUFLLEVBQUUsQ0FBQztJQUVYLEtBQUssSUFBSSxXQUFXLElBQUksaUJBQWlCLEVBQUU7UUFDekMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUNqQztJQUVELE1BQU0sWUFBWSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7SUFDL0IsTUFBTSxhQUFhLEdBQUcsZ0JBQUMsQ0FBQyxVQUFVLENBQUM7U0FDaEMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1NBQzFCLElBQUksRUFBRTtTQUNOLEtBQUssRUFBRSxDQUFDO0lBRVgsS0FBSyxJQUFJLFFBQVEsSUFBSSxhQUFhLEVBQUU7UUFDbEMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUM1QjtJQUVELEtBQUssTUFBTSxVQUFVLElBQUksb0JBQW9CLEVBQUU7UUFDN0MsTUFBTSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsR0FBRyxVQUFVLENBQUM7UUFFL0MsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUU7WUFDeEUsU0FBUztTQUNWO1FBRUQsK0ZBQStGO1FBQy9GLDRFQUE0RTtRQUM1RSxNQUFNLFdBQVcsR0FBRyxrQkFBa0IsSUFBSSxZQUFZLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztRQUNqRSxJQUFJLFdBQVcsSUFBSSxZQUFZLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzdDLFNBQVM7U0FDVjtRQUVELE9BQU8sVUFBVSxDQUFDO0tBQ25CO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDLENBQUMifQ==