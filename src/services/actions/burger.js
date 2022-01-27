import {createAction} from '@reduxjs/toolkit'
import {INGREDIENTS_ENDPOINT, ORDERS_ENDPOINT} from "../../utils/api-сonstants";

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
export const successIngredients = createAction(GET_INGREDIENTS_SUCCESS);
export const errorIngredients = createAction(GET_INGREDIENTS_ERROR);

export const addBun = createAction(CONSTRUCTOR_ADD_BUN);
export const addIngredient = createAction(CONSTRUCTOR_ADD);
export const removeIngredient = createAction(CONSTRUCTOR_DELETE);

export const prepareOrder = createAction(ORDER_REQUEST);
export const successOrder = createAction(ORDER_SUCCESS);
export const errorOrder = createAction(ORDER_ERROR);

export const selectIngredient = createAction(SELECT_INGREDIENT);

export const orderClear = createAction(ORDER_CLEAR);

export const dndReorderIngredients = createAction(DND_REORDER_INGREDIENTS);

export function fetchIngredients() {
    return async dispatch => {
        dispatch(getIngredients())
        await fetch(INGREDIENTS_ENDPOINT)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error(`Во время получения ингредиентов произошла ошибка. Запрос вернул код: ${res.status}`);
                }
            })
            .then(data => {
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

export function fetchOrder(selectedIngredients, selectedBun) {
    return async dispatch => {
        dispatch(prepareOrder())

        const ingredients = selectedIngredients.map(x => x._id);
        // Пушим булку. Нужно две и надо ли вообще?
        if (selectedBun)
        {
            ingredients.push(selectedBun._id);
            ingredients.push(selectedBun._id);
        }

        await fetch(ORDERS_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify({
                "ingredients": ingredients
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(`Во время заказа произошла ошибка. Запрос вернул код: ${res.status}`);
            }
        }).then(data => {
            if (data.success) {
                dispatch(successOrder({name: data.name, order: data.order}));
            } else {
                throw new Error(data.message);
            }
        }).catch(e => {
            console.log(`Во время заказа произошла ошибка: ${e.message}`);
            dispatch(errorOrder());
        });
    }
}