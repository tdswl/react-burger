import {Middleware, MiddlewareAPI} from "redux";
import {AppDispatch, RootState, TWsActionTypes} from "../types";

export const socketMiddleware = (wsActions: TWsActionTypes): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action) => {
            const {dispatch} = store;
            const {wsConnect, wsDisconnect, onOpen, onClose, onError, onMessage} = wsActions;

            if (wsDisconnect.match(action) && socket) {
                socket.close();
            }

            if (wsConnect.match(action)) {
                socket = new WebSocket(action.payload);
            }

            if (socket) {
                // функция, которая вызывается при открытии сокета
                socket.onopen = event => {
                    dispatch(onOpen());
                };

                // функция, которая вызывается при ошибке соединения
                socket.onerror = event => {
                    dispatch(onError());
                };

                // функция, которая вызывается при получения события от сервера
                socket.onmessage = event => {
                    const {data} = event;
                    dispatch(onMessage(JSON.parse(data)));
                };
                // функция, которая вызывается при закрытии соединения
                socket.onclose = event => {
                    dispatch(onClose());
                };
            }

            next(action);
        };
    });
};