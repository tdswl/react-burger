import {createReducer, PayloadAction} from '@reduxjs/toolkit'
import {
    addIngredient,
    errorIngredients,
    errorOrder,
    getIngredients,
    orderClear,
    prepareOrder,
    removeIngredient,
    selectIngredient,
    successIngredients,
    successOrder,
    addBun, dndReorderIngredients
} from "../actions/burger";
import {IBurgerState, IIngredient, IOrderInfo, ISelectedIngredient} from "../../utils/types";

const initialState: IBurgerState = {
    // список всех полученных ингредиентов
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    // объект текущего просматриваемого ингредиента
    selectedIngredientInfo: null,

    // список всех ингредиентов в текущем конструкторе бургера
    selectedIngredients: [],
    selectedBun: null,

    // объект созданного заказа
    order: null,
    orderRequest: false,
    orderFailed: false,
}

export const burgerReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getIngredients, (state) => {
            return {
                ...state,
                ingredientsRequest: true,
            };
        })
        .addCase(errorIngredients, (state) => {
            return {
                ...state,
                ingredients: initialState.ingredients,
                ingredientsRequest: false,
                ingredientsFailed: true
            };
        })
        .addCase(prepareOrder, (state) => {
            return {
                ...state,
                orderRequest: true,
            };
        })
        .addCase(errorOrder, (state) => {
            return {
                ...state,
                order: initialState.order,
                orderRequest: false,
                orderFailed: true,
            };
        })
        .addCase(orderClear, (state) => {
            return {
                ...state,
                order: null,
            };
        })
        .addCase(dndReorderIngredients, (state, action: PayloadAction<{ dragIndex: number, hoverIndex: number }>) => {
            const dragIngredient = state.selectedIngredients[action.payload.dragIndex];
            const newList = state.selectedIngredients.filter(x => x.key !== dragIngredient.key);
            newList.splice(action.payload.hoverIndex, 0, dragIngredient);

            return {
                ...state,
                selectedIngredients: newList
            };
        })
        .addCase(addBun, (state, action: PayloadAction<IIngredient>) => {
            return {
                ...state,
                selectedBun: action.payload,
            };
        })
        .addCase(removeIngredient, (state, action: PayloadAction<ISelectedIngredient>) => {
            const newList = state.selectedIngredients.filter(x => x.key !== action.payload.key);
            return {
                ...state,
                selectedIngredients: newList
            };
        })
        .addCase(addIngredient, (state, action: PayloadAction<ISelectedIngredient>) => {
            return {
                ...state,
                selectedIngredients: [
                    ...state.selectedIngredients,
                    {...action.payload}
                ]
            };
        })
        .addCase(successIngredients, (state, action: PayloadAction<Array<IIngredient> | undefined>) => {
            return {
                ...state,
                ingredients: action.payload ?? [],
                ingredientsRequest: false,
                ingredientsFailed: false,
            };
        })
        .addCase(successOrder, (state, action: PayloadAction<IOrderInfo>) => {
            return {
                ...state,
                selectedBun: null,
                selectedIngredients: [],
                order: action.payload.order,
                orderRequest: false,
                orderFailed: false,
            };
        })
        .addCase(selectIngredient, (state, action: PayloadAction<string | undefined | null>) => {
            if (action.payload) {
                const selected = state.ingredients.find(x => x._id === action.payload);

                return {
                    ...state,
                    selectedIngredientInfo: selected ?? null,
                };
            }
        })
})

