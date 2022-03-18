import {store} from "../store";
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";

export type TwsActionTypes = {
    wsConnect: ActionCreatorWithPayload<string>,
    wsDisconnect: ActionCreatorWithoutPayload,
    onOpen: ActionCreatorWithoutPayload,
    onClose: ActionCreatorWithoutPayload,
    onError: ActionCreatorWithoutPayload,
    onMessage: ActionCreatorWithPayload<any>,
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;