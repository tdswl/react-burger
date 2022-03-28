import {AnyAction} from "redux";
import {IBurgerState, IIngredient, IOrderInfo} from "../types/burger";
import {burgerReducer} from "./burger";
import {
    addBun,
    addIngredient, dndReorderIngredients,
    fetchIngredients,
    fetchOrder,
    orderClear,
    removeIngredient,
    selectIngredient
} from "../actions/burger";

const original: IBurgerState = {
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

const bun: IIngredient = {
    _id: "fhgjfjf",
    price: 123123,
    type: "bun",
    image: "link",
    __v: undefined,
    fat: 123,
    calories: 567,
    carbohydrates: 767,
    name: "test name",
    image_large: undefined,
    image_mobile: undefined,
    proteins: 45623,
};

describe('burger reducer tests', () => {
    it('should return the initial state', () => {
        const expected: IBurgerState = {
            ...original,
        };

        expect(burgerReducer(undefined, {} as AnyAction)).toEqual(expected)
    })

    it('should fetchIngredients pending', () => {
        const previousState: IBurgerState = {
            ...original,
            ingredients: [],
            ingredientsRequest: false,
            ingredientsFailed: false,
        };

        const expected: IBurgerState = {
            ...original,
            ingredients: [],
            ingredientsRequest: true,
            ingredientsFailed: false,
        };

        expect(burgerReducer(previousState, fetchIngredients.pending(''))).toEqual(expected)
    })


    it('should fetchIngredients fulfilled', () => {
        const previousState: IBurgerState = {
            ...original,
            ingredients: [],
            ingredientsRequest: true,
            ingredientsFailed: true,
        };

        const expected: IBurgerState = {
            ...original,
            ingredients: [
                {
                    _id: "asdasd",
                    price: 123123,
                    type: "num",
                    image: "link",
                    __v: undefined,
                    fat: 123,
                    calories: 567,
                    carbohydrates: 767,
                    name: "test name",
                    image_large: undefined,
                    image_mobile: undefined,
                    proteins: 45623,
                }
            ],
            ingredientsRequest: false,
            ingredientsFailed: false,
        };

        const ingredients: Array<IIngredient> = [
            {
                _id: "asdasd",
                price: 123123,
                type: "num",
                image: "link",
                __v: undefined,
                fat: 123,
                calories: 567,
                carbohydrates: 767,
                name: "test name",
                image_large: undefined,
                image_mobile: undefined,
                proteins: 45623,
            }
        ];

        expect(burgerReducer(previousState, fetchIngredients.fulfilled(ingredients, ''))).toEqual(expected)
    })

    it('should fetchIngredients rejected', () => {
        const previousState: IBurgerState = {
            ...original,
            ingredients: [],
            ingredientsRequest: true,
            ingredientsFailed: false,
        };

        const expected: IBurgerState = {
            ...original,
            ingredients: [],
            ingredientsRequest: false,
            ingredientsFailed: true,
        };

        expect(burgerReducer(previousState, fetchIngredients.rejected(new Error(), ''))).toEqual(expected)
    })

    it('should fetchOrder pending', () => {
        const previousState: IBurgerState = {
            ...original,
            orderRequest: false,
            orderFailed: false,
        };

        const expected: IBurgerState = {
            ...original,
            orderRequest: true,
            orderFailed: false,
        };

        expect(burgerReducer(previousState, fetchOrder.pending('', {
            selectedIngredients: [],
            selectedBun: bun
        }))).toEqual(expected)
    })


    it('should fetchOrder fulfilled', () => {
        const previousState: IBurgerState = {
            ...original,
            selectedBun: bun,
            selectedIngredients: [{key: "asdasd", ...bun}],
            orderRequest: true,
            orderFailed: true,
        };

        const expected: IBurgerState = {
            ...original,
            selectedBun: null,
            selectedIngredients: [],
            order: {
                number: 12312399,
            },
            orderRequest: false,
            orderFailed: false,
        };

        const order: IOrderInfo = {
            order: {
                number: 12312399,
            },
            name: "test",
        }

        expect(burgerReducer(previousState, fetchOrder.fulfilled(order, '', {
            selectedIngredients: [],
            selectedBun: bun
        }))).toEqual(expected)
    })

    it('should fetchOrder rejected', () => {
        const previousState: IBurgerState = {
            ...original,
            order: {
                number: 12312399,
            },
            orderRequest: true,
            orderFailed: false,
        };

        const expected: IBurgerState = {
            ...original,
            order: null,
            orderRequest: false,
            orderFailed: true,
        };

        expect(burgerReducer(previousState, fetchOrder.rejected(new Error(), '', {
            selectedIngredients: [],
            selectedBun: bun
        }))).toEqual(expected)
    })

    it('should orderClear', () => {
        const previousState: IBurgerState = {
            ...original,
            order: {
                number: 12312399,
            },
        };

        const expected: IBurgerState = {
            ...original,
            order: null,
        };

        expect(burgerReducer(previousState, orderClear())).toEqual(expected)
    })

    it('should addBun', () => {
        const previousState: IBurgerState = {
            ...original,
            selectedBun: null,
        };

        const expected: IBurgerState = {
            ...original,
            selectedBun: bun,
        };

        expect(burgerReducer(previousState, addBun(bun))).toEqual(expected)
    })

    it('should removeIngredient', () => {
        const previousState: IBurgerState = {
            ...original,
            selectedIngredients: [
                {
                    ...bun,
                    key: "numm",
                },
                {
                    ...bun,
                    key: "numm223",
                }
            ],
        };

        const expected: IBurgerState = {
            ...original,
            selectedIngredients: [
                {
                    ...bun,
                    key: "numm223",
                }
            ],
        };

        expect(burgerReducer(previousState, removeIngredient({ ...bun, key: 'numm' }))).toEqual(expected)
    })

    it('should addIngredient', () => {
        const previousState: IBurgerState = {
            ...original,
            selectedIngredients: [
                {
                    ...bun,
                    key: "numm223",
                },
            ],
        };

        expect(burgerReducer(previousState, addIngredient(bun)).selectedIngredients).toHaveLength(2)
    })

    it('should selectIngredient', () => {
        const previousState: IBurgerState = {
            ...original,
            ingredients: [
                bun,
            ],
        };

        const expected: IBurgerState = {
            ...original,
            ingredients: [
                bun,
            ],
            selectedIngredientInfo: bun,
        };

        expect(burgerReducer(previousState, selectIngredient(bun._id))).toEqual(expected)
    })


    it('should dndReorderIngredients', () => {
        const previousState: IBurgerState = {
            ...original,
            selectedIngredients: [
                {
                    ...bun,
                    key: "numm1",
                },
                {
                    ...bun,
                    key: "numm2",
                },
                {
                    ...bun,
                    key: "numm3",
                }
            ],
        };

        const expected: IBurgerState = {
            ...original,
            selectedIngredients: [
                {
                    ...bun,
                    key: "numm2",
                },
                {
                    ...bun,
                    key: "numm3",
                },
                {
                    ...bun,
                    key: "numm1",
                }
            ],
        };

        expect(burgerReducer(previousState, dndReorderIngredients({ dragIndex:0, hoverIndex: 2 }))).toEqual(expected)
    })
})