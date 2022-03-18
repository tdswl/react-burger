import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./reducers/root";
import thunk from "redux-thunk";
import {socketMiddleware} from "./middlewares/socket-middleware";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware).concat(thunk),
    devTools: process.env.NODE_ENV !== 'production',
})
