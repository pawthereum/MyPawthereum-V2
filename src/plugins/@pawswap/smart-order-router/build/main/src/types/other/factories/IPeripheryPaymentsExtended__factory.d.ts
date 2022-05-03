import { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import type { IPeripheryPaymentsExtended, IPeripheryPaymentsExtendedInterface } from "../IPeripheryPaymentsExtended";
export declare class IPeripheryPaymentsExtended__factory {
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IPeripheryPaymentsExtendedInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IPeripheryPaymentsExtended;
}
