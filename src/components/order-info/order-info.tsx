import React from "react";
import styles from './order-info.module.css'
import {useLocation, useParams} from "react-router-dom";
import {fetchIngredients} from "../../services/actions/burger";
import {useDispatch, useSelector} from "react-redux";
import {ILocationState, IRootState} from "../../services/types/types";
import {fetchSelectedOrder} from "../../services/actions/feed";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import moment from "moment-ru";
import IngredientInfo from "./ingredient-info/ingredient-info";

const OrderInfo = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const {ingredients, ingredientsRequest} = useSelector((store: IRootState) => store.burger);
    const {selectedOrder} = useSelector((store: IRootState) => store.feed);

    let {id} = useParams();

    React.useEffect(() => {
        const locationState = location.state as ILocationState;
        // Если не модалка и нет ингридиентов, то надо бы запросить. Непонятно, есть ли роут для получение одного ингридиента
        if (!locationState?.modal && (!ingredients || ingredients.length === 0) && !ingredientsRequest) {
            dispatch(fetchIngredients())
        }
    }, [dispatch, location, ingredients, ingredientsRequest])

    React.useEffect(() => {
        if (id) {
            dispatch(fetchSelectedOrder(id));
        }
    }, [id, dispatch])

    const orderIngredients = React.useMemo(
        () => {
            return ingredients.filter(({_id}) => selectedOrder?.ingredients?.includes(_id));
        },
        [selectedOrder, ingredients]
    );

    const totalPrice = React.useMemo(
        () => {
            if (orderIngredients && orderIngredients.length > 0) {
                return orderIngredients.reduce((x, obj) => x + obj.price, 0)
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
            <p className={styles.status}>{selectedOrder.status}</p>
            <p className={styles.name}>Состав:</p>
            <div className={styles.scrollableContainer}>
                <ul className={styles.ingredientsList}>
                    {orderIngredients.map((item, index) =>
                        (
                            <li key={index}>
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