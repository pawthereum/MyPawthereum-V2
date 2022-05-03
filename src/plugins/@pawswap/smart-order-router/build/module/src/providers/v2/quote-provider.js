import { TradeType } from '@uniswap/sdk-core';
import { InsufficientInputAmountError, InsufficientReservesError, } from '@uniswap/v2-sdk';
import { BigNumber } from 'ethers';
import { log } from '../../util/log';
import { routeToString } from '../../util/routes';
/**
 * Computes quotes for V2 off-chain. Quotes are computed using the balances
 * of the pools within each route provided.
 *
 * @export
 * @class V2QuoteProvider
 */
export class V2QuoteProvider {
    constructor() { }
    async getQuotesManyExactIn(amountIns, routes) {
        return this.getQuotes(amountIns, routes, TradeType.EXACT_INPUT);
    }
    async getQuotesManyExactOut(amountOuts, routes) {
        return this.getQuotes(amountOuts, routes, TradeType.EXACT_OUTPUT);
    }
    async getQuotes(amounts, routes, tradeType) {
        const routesWithQuotes = [];
        let debugStrs = [];
        for (const route of routes) {
            const amountQuotes = [];
            let insufficientInputAmountErrorCount = 0;
            let insufficientReservesErrorCount = 0;
            for (const amount of amounts) {
                try {
                    if (tradeType == TradeType.EXACT_INPUT) {
                        let outputAmount = amount.wrapped;
                        for (const pair of route.pairs) {
                            const [outputAmountNew] = pair.getOutputAmount(outputAmount);
                            outputAmount = outputAmountNew;
                        }
                        amountQuotes.push({
                            amount,
                            quote: BigNumber.from(outputAmount.quotient.toString()),
                        });
                    }
                    else {
                        let inputAmount = amount.wrapped;
                        for (let i = route.pairs.length - 1; i >= 0; i--) {
                            const pair = route.pairs[i];
                            [inputAmount] = pair.getInputAmount(inputAmount);
                        }
                        amountQuotes.push({
                            amount,
                            quote: BigNumber.from(inputAmount.quotient.toString()),
                        });
                    }
                }
                catch (err) {
                    // Can fail to get quotes, e.g. throws InsufficientReservesError or InsufficientInputAmountError.
                    if (err instanceof InsufficientInputAmountError) {
                        insufficientInputAmountErrorCount =
                            insufficientInputAmountErrorCount + 1;
                        amountQuotes.push({ amount, quote: null });
                    }
                    else if (err instanceof InsufficientReservesError) {
                        insufficientReservesErrorCount = insufficientReservesErrorCount + 1;
                        amountQuotes.push({ amount, quote: null });
                    }
                    else {
                        throw err;
                    }
                }
            }
            if (insufficientInputAmountErrorCount > 0 ||
                insufficientReservesErrorCount > 0) {
                debugStrs.push(`${[
                    routeToString(route),
                ]} Input: ${insufficientInputAmountErrorCount} Reserves: ${insufficientReservesErrorCount} }`);
            }
            routesWithQuotes.push([route, amountQuotes]);
        }
        if (debugStrs.length > 0) {
            log.info({ debugStrs }, `Failed quotes for V2 routes`);
        }
        return {
            routesWithQuotes,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVvdGUtcHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvcHJvdmlkZXJzL3YyL3F1b3RlLXByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEVBQ0wsNEJBQTRCLEVBQzVCLHlCQUF5QixHQUMxQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFHbkMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQXNCbEQ7Ozs7OztHQU1HO0FBQ0gsTUFBTSxPQUFPLGVBQWU7SUFDMUIsZ0JBQWUsQ0FBQztJQUVULEtBQUssQ0FBQyxvQkFBb0IsQ0FDL0IsU0FBMkIsRUFDM0IsTUFBaUI7UUFFakIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTSxLQUFLLENBQUMscUJBQXFCLENBQ2hDLFVBQTRCLEVBQzVCLE1BQWlCO1FBRWpCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRU8sS0FBSyxDQUFDLFNBQVMsQ0FDckIsT0FBeUIsRUFDekIsTUFBaUIsRUFDakIsU0FBb0I7UUFFcEIsTUFBTSxnQkFBZ0IsR0FBd0IsRUFBRSxDQUFDO1FBRWpELElBQUksU0FBUyxHQUFhLEVBQUUsQ0FBQztRQUM3QixLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtZQUMxQixNQUFNLFlBQVksR0FBb0IsRUFBRSxDQUFDO1lBRXpDLElBQUksaUNBQWlDLEdB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