import {createReducer, PayloadAction} from '@reduxjs/toolkit'
import {IFeed, IFeedState} from "../types/feed";
import {
    connectionClose,
    connectionClosed,
    connectionError,
    connectionSucceed,
    getMessage,
    getOrder,
    selectOrder
} from "../actions/feed";
import {IOrder} from "../types/burger";
import {errorOrder} from "../actions/burger";

const initialState: IFeedState = {
    feed: null,
    wsConnected: false,

    selectedOrder: null,
    orderRequest: false,
    orderFailed: false,
}

export const feedReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(connectionSucceed, (state, action: PayloadAction<Event>) => {
            return {
                ...state,
                wsConnected: true,
            };
        })
        .addCase(connectionClosed, (state, action: PayloadAction<Event>) => {
            return {
                ...state,
                wsConnected: false,
            };
        })
        .addCase(connectionError, (state, action: PayloadAction<Event>) => {
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
        .addCase(selectOrder, (state, action: PayloadAction<IOrder | null>) => {
            return {
                ...state,
                selectedOrder: action.payload,
                orderRequest: false,
                orderFailed: false,
            };
        })
        .addCase(errorOrder, (state) => {
            return {
                ...state,
                selectedOrder: null,
                orderRequest: false,
                orderFailed: true,
            };
        })
        .addCase(getOrder, (state) => {
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

