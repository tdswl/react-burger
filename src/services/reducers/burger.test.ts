import {AnyAction} from "redux";
import {IBurgerState} from "../types/burger";
import {burgerReducer} from "./burger";

describe('burger reducer tests', () => {
    it('should return the initial state', () => {
        const expected: IBurgerState = {
            ingredients: [],
            ingredientsRequest: false,
            ingredientsFailed: false,

            selectedIngredientInfo: null,

            selectedIngredients: [],
            selectedBun: null,

            order: null,
            orderRequest: false,
            orderFailed: false,
        };

        expect(burgerReducer(undefined, {} as AnyAction)).toEqual(expected)
    })
})