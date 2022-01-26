import { combineReducers } from 'redux';
import {constructorReducer} from "./constructor";

export const root = combineReducers({
    constructor: constructorReducer
});