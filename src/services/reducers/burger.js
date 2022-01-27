import {createReducer} from '@reduxjs/toolkit'
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
import {v4} from "uuid";

const initialState = {
    // список всех полученных ингредиентов
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    // объект текущего просматриваемого ингредиента
    selectedIngredientInfo: null,

    // список всех ингредиентов в текущем конструкторе бургера
    selectedIngredients: [],
    selectedBun: null,
    totalPrice: 0,

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
        .addCase(successIngredients, (state, action) => {
            return {
                ...state,
                ingredients: action.payload,
                ingredientsRequest: false,
                ingredientsFailed: false,
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
        .addCase(addBun, (state, action) => {
            let newPrice = state.totalPrice + action.payload.price * 2;
            if (state.selectedBun)
            {
                newPrice -= state.selectedBun.price * 2;
            }

            return {
                ...state,
                totalPrice: newPrice,
                selectedBun: action.payload,
            };
        })
        .addCase(addIngredient, (state, action) => {
            const newPrice = state.totalPrice + action.payload.price;

            return {
                ...state,
                selectedIngredients: [
                    ...state.selectedIngredients,
                    {...action.payload, key: v4()}
                ],
                totalPrice: newPrice,
            };
        })
        .addCase(removeIngredient, (state, action) => {
            const newList = state.selectedIngredients.filter(x => x.key !== action.payload.key);
            const newPrice = state.totalPrice - action.payload.price;

            return {
                ...state,
                selectedIngredients: newList,
                totalPrice: newPrice,
            };
        })
        .addCase(prepareOrder, (state) => {
            return {
                ...state,
                orderRequest: true,
            };
        })
        .addCase(successOrder, (state, action) => {
            return {
                ...state,
                order: action.payload,
                orderRequest: false,
                orderFailed: false,
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
        .addCase(selectIngredient, (state, action) => {
            return {
                ...state,
                selectedIngredientInfo: action.payload,
            };
        })
        .addCase(dndReorderIngredients, (state, action) => {
            const dragIngredient = state.selectedIngredients[action.payload.dragIndex];
            const newList = state.selectedIngredients.filter(x => x.key !== dragIngredient.key);
            newList.splice(action.payload.hoverIndex, 0, dragIngredient);

            return {
                ...state,
                selectedIngredients: newList
            };
        })
})