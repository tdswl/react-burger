import {Middleware, MiddlewareAPI} from "redux";
import {connectionClosed, connectionError, connectionSucceed, getMessage} from "../actions/feed";
import {FeedAction} from "../constants/feed";
import {AppDispatch, RootState} from "../types";

export const socketMiddleware: Middleware = ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action) => {
        const {dispatch} = store;
        const {type, payload} = action;

        if (type === FeedAction.FEED_WS_CONNECTION_CLOSE && socket) {
            socket.close();
        }

        if (type === FeedAction.FEED_WS_CONNECTION_START) {
            socket = new WebSocket(payload);
        }

        if (socket) {

            // функция, которая вызывается при открытии сокета
            socket.onopen = event => {
                dispatch(connectionSucceed(event));
            };

            // функция, которая вызывается при ошибке соединения
            socket.onerror = event => {
                dispatch(connectionError(event));
            };

            // функция, которая вызывается при получения события от сервера
            socket.onmessage = event => {
                const {data} = event;
                dispatch(getMessage(JSON.parse(data)));
            };
            // функция, которая вызывается при закрытии соединения
            socket.onclose = event => {
                dispatch(connectionClosed(event));
            };
        }

        next(action);
    };
});