import {createReducer} from '@reduxjs/toolkit'
import {
    add,
    failedIngredients,
    failedOrder,
    getIngredients,
    orderClear,
    prepareOrder,
    remove,
    selectIngredient,
    successIngredients,
    successOrder
} from "../actions/constructor";
import {v4} from "uuid";

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    selectedIngredientInfo: null,

    selectedIngredients: [],
    selectedBun: null,

    order: null,
    orderRequest: false,
    orderFailed: false,
}

export const constructorReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getIngredients, (state) => {
            return {
                ...state,
                ingredientsRequest: true,
            };
        })
        .addCase(successIngredients, (state, action) => {
            const componentsOnly = action.payload.filter(x => x.type !== 'bun');
            const bun = action.payload.find(x => x.type === 'bun');

            // Небольшой костыль для выбора рандомных компонентов. Потом нужно удалить
            let randomComp = [];
            if (componentsOnly.length > 0) {
                for (let i = 0; i < componentsOnly.length / 2; i++) {
                    let comp = componentsOnly[Math.floor(Math.random() * componentsOnly.length)];
                    // key - подсказали в чатике на случай добавления двух одинаковых компонентов
                    randomComp.push({...comp, key: v4()});
                }
            }

            console.log(bun);

            return {
                ...state,
                ingredients: action.payload,
                ingredientsRequest: false,
                ingredientsFailed: false,
                selectedBun: bun,
                selectedIngredients: randomComp
            };
        })
        .addCase(failedIngredients, (state) => {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true
            };
        })
        .addCase(add, (state, action) => {
        })
        .addCase(remove, (state, action) => {
            const newList = state.selectedIngredients.filter(x => x.key !== action.payload);
            return {
                ...state,
                selectedIngredients: newList,
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
        .addCase(failedOrder, (state) => {
            return {
                ...state,
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
})