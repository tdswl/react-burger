import {createAction} from '@reduxjs/toolkit'
import {INGREDIENTS_ENDPOINT, ORDERS_ENDPOINT} from "../../utils/api-сonstants";
import {v4} from "uuid";
import axios from "axios";
import {axiosWithAuth} from "../axiosInterceptors";
import {fetchToken} from "./auth";
import {IResponse} from "../types/types";
import {AppDispatch} from "../../index";
import {BurgerAction} from "../constants/burger";
import {IIngredient, IOrderInfo, ISelectedIngredient} from "../types/burger";

export const getIngredients = createAction(BurgerAction.GET_INGREDIENTS_REQUEST);
export const successIngredients = createAction<Array<IIngredient> | undefined>(BurgerAction.GET_INGREDIENTS_SUCCESS);
export const errorIngredients = createAction(BurgerAction.GET_INGREDIENTS_ERROR);

export const addBun = createAction<IIngredient>(BurgerAction.CONSTRUCTOR_ADD_BUN);
export const addIngredient = createAction(BurgerAction.CONSTRUCTOR_ADD, function prepare(ingredient) {
    return {
        payload: {
            ...ingredient,
            key: v4(),
        },
    }
});
export const removeIngredient = createAction<ISelectedIngredient>(BurgerAction.CONSTRUCTOR_DELETE);

export const prepareOrder = createAction(BurgerAction.ORDER_REQUEST);
export const successOrder = createAction<IOrderInfo>(BurgerAction.ORDER_SUCCESS);
export const errorOrder = createAction(BurgerAction.ORDER_ERROR);

export const selectIngredient = createAction<string | undefined | null>(BurgerAction.SELECT_INGREDIENT);

export const orderClear = createAction(BurgerAction.ORDER_CLEAR);

export const dndReorderIngredients = createAction<{dragIndex: number, hoverIndex: number}>(BurgerAction.DND_REORDER_INGREDIENTS);

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