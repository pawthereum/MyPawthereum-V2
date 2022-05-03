import { Contract, utils } from 'ethers';
import type { MulticallContext } from './context';
import type { CallState, ListenerOptionsWithGas } from './types';
import { MethodArg } from './validation';
declare type OptionalMethodInputs = Array<MethodArg | MethodArg[] | undefined> | undefined;
export declare function useSingleContractMultipleData(context: MulticallContext, chainId: number | undefined, latestBlockNumber: number | undefined, contract: Contract | null | undefined, methodName: string, callInputs: OptionalMethodInputs[], options?: Partial<ListenerOptionsWithGas>): CallState[];
export declare function useMultipleContractSingleData(context: MulticallContext, chainId: number | undefined, latestBlockNumber: number | undefined, addresses: (string | undefined)[], contractInterface: utils.Interface, methodName: string, callInputs?: OptionalMethodInputs, options?: Partial<ListenerOptionsWithGas>): CallState[];
export declare function useSingleCallResult(context: MulticallContext, chainId: number | undefined, latestBlockNumber: number | undefined, contract: Contract | null | undefined, methodName: string, inputs?: OptionalMethodInputs, options?: Partial<ListenerOptionsWithGas>): CallState;
export declare function useSingleContractWithCallData(context: MulticallContext, chainId: number | undefined, latestBlockNumber: number | undefined, contract: Contract | null | undefined, callDatas: string[], options?: Partial<ListenerOptionsWithGas>): CallState[];
export declare function useMultiChainMultiContractSingleData(context: MulticallContext, chainToBlockNumber: Record<number, number | undefined>, chainToAddresses: Record<number, Array<string | undefined>>, contractInterface: utils.Interface, methodName: string, callInputs?: OptionalMethodInputs, options?: Partial<ListenerOptionsWithGas>): Record<number, CallState[]>;
export declare function useMultiChainSingleContractSingleData(context: MulticallContext, chainToBlockNumber: Record<number, number | undefined>, chainToAddress: Record<number, string | undefined>, contractInterface: utils.Interface, methodName: string, callInputs?: OptionalMethodInputs, options?: Partial<ListenerOptionsWithGas>): Record<number, CallState>;
export {};