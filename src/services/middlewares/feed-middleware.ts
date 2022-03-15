import {Middleware, MiddlewareAPI} from "redux";
import {AppDispatch, RootState} from "../../index";
import {connectionClosed, connectionError, connectionSucceed, getMessage} from "../actions/feed";
import {FeedAction} from "../constants/feed";
import {WS_ORDERS} from "../../utils/api-сonstants";

export const feedMiddleware: Middleware = ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action) => {
        const {dispatch} = store;
        const {type, payload} = action;

        if (type === FeedAction.FEED_WS_CONNECTION_START) {
            // объект класса WebSocket
            if (payload) {
                socket = new WebSocket(`${WS_ORDERS}?token=${payload}`);
            } else {
                socket = new WebSocket(`${WS_ORDERS}/all`);
            }
        }
        if (socket) {

            // функция, которая вызывается при открытии сокета
            socket.onopen = event => {
                console.log('connectionSucceed');
                dispatch(connectionSucceed(event));
            };

            // функция, которая вызывается при ошибке соединения
            socket.onerror = event => {
                console.log('connectionError');
                dispatch(connectionError(event));
            };

            // функция, которая вызывается при получения события от сервера
            socket.onmessage = event => {
                console.log('onmessage');
                const {data} = event;
                dispatch(getMessage(JSON.parse(data)));
            };
            // функция, которая вызывается при закрытии соединения
            socket.onclose = event => {
                console.log('connectionClosed');
                dispatch(connectionClosed(event));
            };
        }

        next(action);
    };
});