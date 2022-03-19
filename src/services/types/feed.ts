import {IOrder} from "./burger";

export interface IFeed {
    success: boolean,
    orders: Array<IOrder>,
    total: number,
    totalToday: number,
}

export interface IFeedState {
    feed: IFeed | null,
    wsConnected: boolean,

    selectedOrder: IOrder | null,
    orderRequest: boolean,
    orderFailed: boolean,
}