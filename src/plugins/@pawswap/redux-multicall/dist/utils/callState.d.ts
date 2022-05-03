import type { utils } from 'ethers';
import type { CallResult, CallState } from '../types';
export declare function toCallState(callResult: CallResult | undefined, contractInterface: utils.Interface | undefined, fragment: utils.FunctionFragment | undefined, latestBlockNumber: number | undefined): CallState;
