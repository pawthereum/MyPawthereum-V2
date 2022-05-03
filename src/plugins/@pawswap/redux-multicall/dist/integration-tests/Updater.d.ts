import { ChainId } from './consts';
interface Props {
    chainId: ChainId;
    blockNumber: number | undefined;
}
export declare function Updater({ chainId, blockNumber }: Props): JSX.Element;
export {};
