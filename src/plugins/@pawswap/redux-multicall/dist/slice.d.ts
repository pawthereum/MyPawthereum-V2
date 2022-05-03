import { PayloadAction } from '@reduxjs/toolkit';
import { MulticallFetchingPayload, MulticallListenerPayload, MulticallResultsPayload, MulticallState } from './types';
export declare function createMulticallSlice(reducerPath: string): import("@reduxjs/toolkit").Slice<MulticallState, {
    addMulticallListeners: (state: import("immer/dist/internal").WritableDraft<MulticallState>, action: PayloadAction<MulticallListenerPayload>) => void;
    removeMulticallListeners: (state: import("immer/dist/internal").WritableDraft<MulticallState>, action: PayloadAction<MulticallListenerPayload>) => void;
    fetchingMulticallResults: (state: import("immer/dist/internal").WritableDraft<MulticallState>, action: PayloadAction<MulticallFetchingPayload>) => void;
    errorFetchingMulticallResults: (state: import("immer/dist/internal").WritableDraft<MulticallState>, action: PayloadAction<MulticallFetchingPayload>) => void;
    updateMulticallResults: (state: import("immer/dist/internal").WritableDraft<MulticallState>, action: PayloadAction<MulticallResultsPayload>) => void;
}, string>;
export declare type MulticallActions = ReturnType<typeof createMulticallSlice>['actions'];
