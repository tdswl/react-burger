import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./reducers/root";
import thunk from "redux-thunk";
import {socketMiddleware} from "./middlewares/socket-middleware";
import {TWsActionTypes} from "./types";
import {
    connectionClose,
    connectionClosed,
    connectionError,
    connectionStart,
    connectionSucceed,
    getMessage
} from "./actions/feed";

const wsActions : TWsActionTypes = {
    wsConnect: connectionStart,
    wsDisconnect: connectionClose,
    onOpen: connectionSucceed,
    onClose: connectionClosed,
    onError: connectionError,
    onMessage: getMessage,
};

const wsMiddleware = socketMiddleware(wsActions);

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(wsMiddleware).concat(thunk),
    devTools: process.env.NODE_ENV !== 'production',
})
