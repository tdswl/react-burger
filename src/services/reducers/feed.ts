import {createReducer, PayloadAction} from '@reduxjs/toolkit'
import {IFeed, IFeedState} from "../types/feed";
import {
    connectionClose,
    connectionClosed,
    connectionError,
    connectionSucceed, fetchSelectedOrder,
    getMessage,
} from "../actions/feed";
import {IOrder} from "../types/burger";

const initialState: IFeedState = {
    feed: null,
    wsConnected: false,

    selectedOrder: null,
    orderRequest: false,
    orderFailed: false,
}

export const feedReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(connectionSucceed, (state) => {
            return {
                ...state,
                wsConnected: true,
            };
        })
        .addCase(connectionClosed, (state) => {
            return {
                ...state,
                wsConnected: false,
            };
        })
        .addCase(connectionError, (state) => {
            return {
                ...state,
                wsConnected: false,
            };
        })
        .addCase(getMessage, (state, action: PayloadAction<IFeed>) => {
            return {
                ...state,
                feed: action.payload
            };
        })
        .addCase(fetchSelectedOrder.fulfilled, (state, action: PayloadAction<IOrder | null>) => {
            return {
                ...state,
                selectedOrder: action.payload,
                orderRequest: false,
                orderFailed: false,
            };
        })
        .addCase(fetchSelectedOrder.rejected, (state) => {
            return {
                ...state,
                selectedOrder: null,
                orderRequest: false,
                orderFailed: true,
            };
        })
        .addCase(fetchSelectedOrder.pending, (state) => {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
            };
        })
        .addCase(connectionClose, (state) => {
            return {
                ...state,
                feed: null
            };
        })
})

