import {createAction} from '@reduxjs/toolkit'
import {FeedAction} from "../constants/feed";
import {IFeed} from "../types/feed";
import {IOrder} from "../types/burger";
import {AppDispatch} from "../../index";
import axios from "axios";
import {IResponse} from "../types/types";
import {ORDERS_ENDPOINT} from "../../utils/api-сonstants";

export const connectionStart = createAction<string | undefined>(FeedAction.FEED_WS_CONNECTION_START);
export const connectionSucceed = createAction<Event>(FeedAction.FEED_WS_CONNECTION_SUCCESS);
export const connectionClosed = createAction<Event>(FeedAction.FEED_WS_CONNECTION_CLOSED);
export const connectionError = createAction<Event>(FeedAction.FEED_WS_CONNECTION_ERROR);
export const getMessage = createAction<IFeed>(FeedAction.FEED_WS_GET_MESSAGE);

export const getOrder = createAction(FeedAction.FEED_GET_ORDER_FROM_SERVER);
export const errorOrder = createAction(FeedAction.FEED_ERROR_ORDER_FROM_SERVER);
export const selectOrder = createAction<IOrder | null>(FeedAction.FEED_SELECT_ORDER);

export function fetchSelectedOrder(number: string) {
    return async (dispatch: AppDispatch) => {
        dispatch(getOrder())

        await axios.get<IResponse & { orders: Array<IOrder> }>(`${ORDERS_ENDPOINT}/${number}`)
            .then(response => {
                let data = response.data;
                if (data.success) {
                    dispatch(selectOrder(data.orders[0]));
                } else {
                    throw new Error(data.message);
                }
            })
            .catch(e => {
                console.log(`Во время получения заказа произошла ошибка: ${e.message}`);
                dispatch(errorOrder());
            });
    }
}