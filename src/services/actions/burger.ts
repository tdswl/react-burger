import {createAction} from '@reduxjs/toolkit'
import {INGREDIENTS_ENDPOINT, ORDERS_ENDPOINT} from "../../utils/api-сonstants";
import {v4} from "uuid";
import axios from "axios";
import {axiosWithAuth} from "../axiosInterceptors";
import {fetchToken} from "./auth";
import {IIngredient, IOrderInfo, IResponse, ISelectedIngredient} from "../../utils/types";
import {AppDispatch} from "../../index";

const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

const CONSTRUCTOR_ADD_BUN = 'CONSTRUCTOR_ADD_BUN';
const CONSTRUCTOR_ADD = 'CONSTRUCTOR_ADD';
const CONSTRUCTOR_DELETE = 'CONSTRUCTOR_DELETE';

const ORDER_REQUEST = 'ORDER_REQUEST';
const ORDER_SUCCESS = 'ORDER_SUCCESS';
const ORDER_ERROR = 'ORDER_ERROR';

const ORDER_CLEAR = 'ORDER_CLEAR';

const SELECT_INGREDIENT = 'SELECT_INGREDIENT';

const DND_REORDER_INGREDIENTS = 'DND_REORDER_INGREDIENTS';

export const getIngredients = createAction(GET_INGREDIENTS_REQUEST);
export const successIngredients = createAction<Array<IIngredient> | undefined>(GET_INGREDIENTS_SUCCESS);
export const errorIngredients = createAction(GET_INGREDIENTS_ERROR);

export const addBun = createAction<IIngredient>(CONSTRUCTOR_ADD_BUN);
export const addIngredient = createAction(CONSTRUCTOR_ADD, function prepare(ingredient) {
    return {
        payload: {
            ...ingredient,
            key: v4(),
        },
    }
});
export const removeIngredient = createAction<ISelectedIngredient>(CONSTRUCTOR_DELETE);

export const prepareOrder = createAction(ORDER_REQUEST);
export const successOrder = createAction<IOrderInfo>(ORDER_SUCCESS);
export const errorOrder = createAction(ORDER_ERROR);

export const selectIngredient = createAction<string | undefined | null>(SELECT_INGREDIENT);

export const orderClear = createAction(ORDER_CLEAR);

export const dndReorderIngredients = createAction<{dragIndex: number, hoverIndex: number}>(DND_REORDER_INGREDIENTS);

export function fetchIngredients() {
    return async (dispatch: AppDispatch) => {
        dispatch(getIngredients())

        await axios.get<IResponse & {data: Array<IIngredient>}>(INGREDIENTS_ENDPOINT)
            .then(response => {
                let data = response.data;
                if (data.success) {
                    dispatch(successIngredients(data.data));
                } else {
                    throw new Error(data.message);
                }
            })
            .catch(e => {
                console.log(`Во время получения ингредиентов произошла ошибка: ${e.message}`);
                dispatch(errorIngredients());
            });
    }
}

export function fetchOrder(selectedIngredients: Array<ISelectedIngredient>, selectedBun: IIngredient) {
    return async (dispatch: AppDispatch) => {
        dispatch(prepareOrder())

        const ingredients = selectedIngredients.map(x => x._id);
        // Пушим булку. Нужно две?
        if (selectedBun) {
            ingredients.push(selectedBun._id);
            ingredients.push(selectedBun._id);
        }

        await axiosWithAuth((refreshToken: string) => fetchToken(refreshToken))
            .post(ORDERS_ENDPOINT,
                {
                    "ingredients": ingredients
                })
            .then(response => {
                let data = response.data;
                if (data.success) {
                    dispatch(successOrder({name: data.name, order: data.order}));
                } else {
                    throw new Error(data.message);
                }
            })
            .catch(e => {
                console.log(`Во время заказа произошла ошибка: ${e.message}`);
                dispatch(errorOrder());
            });
    }
}