import {createAction, createAsyncThunk} from '@reduxjs/toolkit'
import {FeedAction} from "../constants/feed";
import {IFeed} from "../types/feed";
import {IOrder} from "../types/burger";
import axios from "axios";
import {IResponse} from "../types/types";
import {ORDERS_ENDPOINT} from "../../utils/api-сonstants";

export const connectionStart = createAction<string | undefined>(FeedAction.FEED_WS_CONNECTION_START);
export const connectionSucceed = createAction<Event>(FeedAction.FEED_WS_CONNECTION_SUCCESS);
export const connectionClosed = createAction<Event>(FeedAction.FEED_WS_CONNECTION_CLOSED);
export const connectionError = createAction<Event>(FeedAction.FEED_WS_CONNECTION_ERROR);
export const getMessage = createAction<IFeed>(FeedAction.FEED_WS_GET_MESSAGE);
export const connectionClose = createAction(FeedAction.FEED_WS_CONNECTION_CLOSE);

export const fetchSelectedOrder = createAsyncThunk('order/getByNumber', async (number: string | null) => {

    if (!number) {
        return null;
    }

    const response = await axios.get<IResponse & { orders: Array<IOrder> }>(`${ORDERS_ENDPOINT}/${number}`)
    let data = response.data;
    if (data.success) {
        return data.orders[0];
    } else {
        throw new Error(data.message);
    }
})