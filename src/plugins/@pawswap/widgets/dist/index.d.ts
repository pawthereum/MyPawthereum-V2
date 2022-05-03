/// <reference types="react" />
import { TokenInfo } from '@uniswap/token-lists';
export { TokenInfo } from '@uniswap/token-lists';
import { Provider as Provider$1 } from '@ethersproject/abstract-provider';
export { Provider as EthersProvider } from '@ethersproject/abstract-provider';
import { Provider } from '@web3-react/types';
export { Provider as Eip1193Provider } from '@web3-react/types';
import { ErrorInfo } from 'react';

interface FeeOptions {
    convenienceFee?: number;
    convenienceFeeRecipient?: string | string | {
        [chainId: number]: string;
    };
}

declare type DefaultAddress = string | {
    [chainId: number]: string | 'NATIVE';
} | 'NATIVE';
interface TokenDefaults {
    defaultInputTokenAddress?: DefaultAddress;
    defaultInputAmount?: number | string;
    defaultOutputTokenAddress?: DefaultAddress;
    defaultOutputAmount?: number | string;
}

interface SwapProps extends TokenDefaults, FeeOptions {
    tokenList?: string | TokenInfo[];
    onConnectWallet?: () => void;
}

declare const SUPPORTED_LOCALES: string[];
declare type SupportedLocale = typeof SUPPORTED_LOCALES[number] | 'pseudo';

interface Colors {
    accent: string;
    container: string;
    module: string;
    interactive: string;
    outline: string;
    dialog: string;
    primary: string;
    onAccent: string;
    secondary: string;
    hint: string;
    onInteractive: string;
    active: string;
    success: string;
    warning: string;
    error: string;
    currentColor: 'currentColor';
}
interface Attributes {
    borderRadius: boolean | number;
    fontFamily: string;
    fontFamilyVariable: string;
    fontFamilyCode: string;
    tokenColorExtraction: boolean;
}
interface Theme extends Partial<Attributes>, Partial<Colors> {
}

declare const lightTheme: Colors;
declare const darkTheme: Colors;

declare type ErrorHandler = (error: Error, info: ErrorInfo) => void;

declare type WidgetProps = {
    theme?: Theme;
    locale?: SupportedLocale;
    provider?: Provider | Provider$1;
    jsonRpcEndpoint?: string;
    width?: string | number;
    dialog?: HTMLElement | null;
    className?: string;
    onError?: ErrorHandler;
};

declare type SwapWidgetProps = SwapProps & WidgetProps;
declare function SwapWidget(props: SwapWidgetProps): JSX.Element;

export { DefaultAddress, ErrorHandler, FeeOptions, SUPPORTED_LOCALES, SupportedLocale, SwapWidget, SwapWidgetProps, Theme, TokenDefaults, darkTheme, lightTheme };
