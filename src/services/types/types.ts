import {To} from "history";
import {IAuthState} from "./auth";
import {IBurgerState} from "./burger";
import {IFeedState} from "./feed";

export interface ILocationState {
    background?: string;
    modal?: boolean;
    from?: {
        pathname?: To;
    }
}

export interface IResponse {
    success: boolean;
    message?: string;
}

export interface IRootState {
    auth: IAuthState,
    burger: IBurgerState,
    feed: IFeedState,
}