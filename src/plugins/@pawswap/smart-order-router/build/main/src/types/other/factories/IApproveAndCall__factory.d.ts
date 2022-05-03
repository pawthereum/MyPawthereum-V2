import { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import type { IApproveAndCall, IApproveAndCallInterface } from "../IApproveAndCall";
export declare class IApproveAndCall__factory {
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    } | {
        inputs: {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    })[];
    static createInterface(): IApproveAndCallInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IApproveAndCall;
}
