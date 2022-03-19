import {combineReducers} from 'redux';
import {burgerReducer} from "./burger";
import {authReducer} from "./auth";
import {feedReducer} from "./feed";

export const rootReducer = combineReducers({
    burger: burgerReducer,
    auth: authReducer,
    feed: feedReducer,
});