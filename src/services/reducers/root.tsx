import { combineReducers } from 'redux';
import {burgerReducer} from "./burger";
import {authReducer} from "./auth";

export const rootReducer = combineReducers({
    burger: burgerReducer,
    auth: authReducer
});