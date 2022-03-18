import {createAction, createAsyncThunk} from '@reduxjs/toolkit'
import {INGREDIENTS_ENDPOINT, ORDERS_ENDPOINT} from "../../utils/api-сonstants";
import {v4} from "uuid";
import axios from "axios";
import {axiosWithAuth} from "../axiosInterceptors";
import {fetchToken} from "./auth";
import {IResponse} from "../types/types";
import {BurgerAction} from "../constants/burger";
import {IIngredient, IOrderInfo, ISelectedIngredient} from "../types/burger";

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

export const dndReorderIngredients = createAction<{ dragIndex: number, hoverIndex: number }>(BurgerAction.DND_REORDER_INGREDIENTS);

export const fetchIngredients = createAsyncThunk('ingredients/get', async () => {
    const response = await axios.get<IResponse & { data: Array<IIngredient> }>(INGREDIENTS_ENDPOINT);
    if (response.data.success) {
        return response.data.data;
    } else {
        throw new Error(response.data.message);
    }
})

export const fetchOrder = createAsyncThunk('order/post', async (params: { selectedIngredients: Array<ISelectedIngredient>, selectedBun: IIngredient }) => {
    const {selectedIngredients, selectedBun} = params;

    const ingredients = selectedIngredients.map(x => x._id);
    if (selectedBun) {
        ingredients.push(selectedBun._id);
        ingredients.push(selectedBun._id);
    }

    const response = await axiosWithAuth((refreshToken: string) => fetchToken({refreshToken}))
        .post(ORDERS_ENDPOINT,
            {
                "ingredients": ingredients
            });

    let data = response.data;
    if (data.success) {
        return {name: data.name, order: data.order};
    } else {
        throw new Error(data.message);
    }
})