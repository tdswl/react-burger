import {
    connectionClose,
    connectionClosed,
    connectionError,
    connectionSucceed, fetchSelectedOrder,
    getMessage
} from "../actions/feed";
import {feedReducer} from "./feed";
import {AnyAction} from "redux";
import {IFeed, IFeedState} from "../types/feed";
import {IOrder} from "../types/burger";

describe('feed reducer tests', () => {
    it('should return the initial state', () => {
        const expected: IFeedState = {
            feed: null,
            wsConnected: false,

            selectedOrder: null,
            orderRequest: false,
            orderFailed: false,
        };

        expect(feedReducer(undefined, {} as AnyAction)).toEqual(expected)
    })

    it('should connectionSucceed', () => {
        const previousState: IFeedState =
            {
                feed: null,
                wsConnected: false,

                selectedOrder: null,
                orderRequest: false,
                orderFailed: false,
            };

        const expected: IFeedState = {
            feed: null,
            wsConnected: true,

            selectedOrder: null,
            orderRequest: false,
            orderFailed: false,
        };

        expect(feedReducer(previousState, connectionSucceed())).toEqual(expected);
    })

    it('should connectionClosed', () => {
        const previousState: IFeedState =
            {
                feed: null,
                wsConnected: true,

                selectedOrder: null,
                orderRequest: false,
                orderFailed: false,
            };

        const expected: IFeedState = {
            feed: null,
            wsConnected: false,

            selectedOrder: null,
            orderRequest: false,
            orderFailed: false,
        };

        expect(feedReducer(previousState, connectionClosed())).toEqual(expected);
    })

    it('should connectionError', () => {
        const previousState: IFeedState =
            {
                feed: null,
                wsConnected: true,

                selectedOrder: null,
                orderRequest: false,
                orderFailed: false,
            };

        const expected: IFeedState = {
            feed: null,
            wsConnected: false,

            selectedOrder: null,
            orderRequest: false,
            orderFailed: false,
        };

        expect(feedReducer(previousState, connectionError())).toEqual(expected);
    })

    it('should getMessage', () => {
        const previousState: IFeedState =
            {
                feed: null,
                wsConnected: false,

                selectedOrder: null,
                orderRequest: false,
                orderFailed: false,
            };

        const expected: IFeedState = {
            feed: {
                orders: [{number: 123123}],
                total: 1,
                totalToday: 34,
                success: true,
            },
            wsConnected: false,

            selectedOrder: null,
            orderRequest: false,
            orderFailed: false,
        };

        const message: IFeed = {
            orders: [{number: 123123}],
            total: 1,
            totalToday: 34,
            success: true,
        }

        expect(feedReducer(previousState, getMessage(message))).toEqual(expected);
    })

    it('should fetchSelectedOrder fulfilled', () => {
        const previousState: IFeedState =
            {
                feed: null,
                wsConnected: false,

                selectedOrder: null,
                orderRequest: true,
                orderFailed: true,
            };

        const expected: IFeedState = {
            feed: null,
            wsConnected: false,

            selectedOrder: {
                number: 12312399,
            },
            orderRequest: false,
            orderFailed: false,
        };

        const order: IOrder = {
            number: 12312399,
        }

        expect(feedReducer(previousState, fetchSelectedOrder.fulfilled(order, '', ''))).toEqual(expected);
    })

    it('should fetchSelectedOrder rejected', () => {
        const previousState: IFeedState =
            {
                feed: null,
                wsConnected: false,

                selectedOrder: {
                    number: 12312399,
                },
                orderRequest: true,
                orderFailed: false,
            };

        const expected: IFeedState = {
            feed: null,
            wsConnected: false,

            selectedOrder: null,
            orderRequest: false,
            orderFailed: true,
        };

        expect(feedReducer(previousState, fetchSelectedOrder.rejected(new Error(), '', ''))).toEqual(expected);
    })

    it('should fetchSelectedOrder pending', () => {
        const previousState: IFeedState =
            {
                feed: null,
                wsConnected: false,

                selectedOrder: null,
                orderRequest: false,
                orderFailed: true,
            };

        const expected: IFeedState = {
            feed: null,
            wsConnected: false,

            selectedOrder: null,
            orderRequest: true,
            orderFailed: false,
        };

        expect(feedReducer(previousState, fetchSelectedOrder.pending('', ''))).toEqual(expected);
    })

    it('should connectionClose', () => {
        const previousState: IFeedState =
            {
                feed: {
                    orders: [{number: 123123}],
                    total: 1,
                    totalToday: 34,
                    success: true,
                },
                wsConnected: false,

                selectedOrder: null,
                orderRequest: false,
                orderFailed: false,
            };

        const expected: IFeedState = {
            feed: null,
            wsConnected: false,

            selectedOrder: null,
            orderRequest: false,
            orderFailed: false,
        };

        expect(feedReducer(previousState, connectionClose())).toEqual(expected);
    })
})