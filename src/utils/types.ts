import {To} from "history";

// Ингредиент получаемый из Api
export interface IIngredient {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile?: string,
    image_large?: string,
    __v?: number,
}

export interface ISelectedIngredient extends IIngredient {
    key: string,
}

export interface IOrder {
    number: number;
}

// Информация по заказу после его создания через Api
export interface IOrderInfo {
    name: string;
    order: IOrder;
}

export interface ILocationState {
    background?: string;
    modal?: boolean;
    from?: {
        pathname?: To;
    }
}

export interface IUser {
    name: string;
    email: string;
    password?: string;
}

export interface IAuthResponse {
    accessToken?: string;
    refreshToken?: string;
}

export interface IResponse {
    success: boolean;
    message?: string;
}

export interface IAuthState {
    passwordResetRequest: boolean,
    passwordResetFailed: boolean,

    resetRequest: boolean,
    resetFailed: boolean,

    registerRequest: boolean,
    registerFailed: boolean,

    loginRequest: boolean,
    loginFailed: boolean,

    logoutRequest: boolean,
    logoutFailed: boolean,

    tokenRequest: boolean,
    tokenFailed: boolean,

    getUserRequest: boolean,
    getUserFailed: boolean,

    patchUserRequest: boolean,
    patchUserFailed: boolean,

    user: IUser | null,
}

export interface IBurgerState {
    ingredients: Array<IIngredient>,
    ingredientsRequest: boolean,
    ingredientsFailed: boolean,

    // объект текущего просматриваемого ингредиента
    selectedIngredientInfo: IIngredient | null,

    // список всех ингредиентов в текущем конструкторе бургера
    selectedIngredients: Array<ISelectedIngredient>,
    selectedBun: IIngredient | null,

    // объект созданного заказа
    order: IOrder | null,
    orderRequest: boolean,
    orderFailed: boolean,
}

export interface IRootState {
    auth: IAuthState,
    burger: IBurgerState,
}