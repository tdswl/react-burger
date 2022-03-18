import React from "react";
import styles from './order-info.module.css'
import {useParams} from "react-router-dom";
import {fetchSelectedOrder} from "../../services/actions/feed";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import moment from "moment-ru";
import IngredientInfo from "./ingredient-info/ingredient-info";
import {ISelectedIngredient} from "../../services/types/burger";
import {v4} from "uuid";
import {OrderStatusTranslate} from "../../utils/helpers";
import {useIngredients} from "../../services/hooks/use-ingredients";
import {OrderStatus} from "../../utils/enums";
import {useAppDispatch, useAppSelector} from "../../services/hooks/hooks";

const OrderInfo = () => {
    const dispatch = useAppDispatch();
    const {isIngredientsLoaded} = useIngredients();

    const {ingredients} = useAppSelector(store => store.burger);
    const {selectedOrder} = useAppSelector(store => store.feed);

    let {id} = useParams();

    React.useEffect(() => {
        if (id) {
            dispatch(fetchSelectedOrder(id));
        }
    }, [id, dispatch])

    const orderIngredients = React.useMemo(
        () => {
            let result = new Array<ISelectedIngredient & { count: number }>();

            if (isIngredientsLoaded) {
                selectedOrder?.ingredients?.forEach(value => {
                    if (value && !result.find(a => a._id === value)) {
                        let count = selectedOrder?.ingredients?.filter(a => a === value).reduce((x) => x + 1, 0);
                        result.push({
                            key: v4(), ...ingredients.find(a => a._id === value),
                            count: count
                        } as ISelectedIngredient & { count: number });
                    }
                });
            }

            return result;
        },
        [selectedOrder, ingredients, isIngredientsLoaded]
    );

    const totalPrice = React.useMemo(
        () => {
            if (orderIngredients && orderIngredients.length > 0) {
                return orderIngredients.reduce((x, obj) => x + obj.price * obj.count, 0)
            }

            return 0;
        },
        [orderIngredients]
    );

    if (!selectedOrder) {
        return null;
    }

    return (
        <section className={styles.content}>
            <p className={styles.number}>#{selectedOrder.number}</p>
            <p className={styles.name}>{selectedOrder.name}</p>
            {selectedOrder.status && (
                <p className={selectedOrder.status === OrderStatus.DONE ? styles.statusDone : styles.status}>{OrderStatusTranslate.get(selectedOrder.status)}</p>
            )}
            <p className={styles.name}>Состав:</p>
            <div className={styles.scrollableContainer}>
                <ul className={styles.ingredientsList}>
                    {orderIngredients.map((item) =>
                        (
                            <li key={item.key}>
                                <IngredientInfo ingredient={item}/>
                            </li>
                        ))}
                </ul>
            </div>

            <div className={styles.footer}>
                <div className={styles.date}>{moment(selectedOrder.createdAt).locale('ru').calendar()}</div>
                <p className={styles.price}>{totalPrice}<CurrencyIcon type="primary"/></p>
            </div>
        </section>
    )
}

export default OrderInfo;