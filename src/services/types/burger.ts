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
    number: number,
    ingredients?: ReadonlyArray<string>,
    _id?: string,
    status?: string,
    createdAt?: Date,
    updatedAt?: Date,
    name?: string,
    owner?: string,
}

// Информация по заказу после его создания через Api
export interface IOrderInfo {
    name: string,
    order: IOrder,
}

export interface Feed {
    orders: ReadonlyArray<IOrder>,
    total: number,
    totalToday: number,
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