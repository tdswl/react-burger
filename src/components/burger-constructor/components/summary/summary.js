import React from "react";
import styles from './summary.module.css'
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../../modal/modal";
import OrderDetails from "../../../order-details/order-details";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrder, orderClear} from "../../../../services/actions/constructor";

const Summary = () => {
    const dispatch = useDispatch();

    const { order, orderRequest, selectedIngredients, selectedBun } = useSelector(store => store.constructor);

    const onCompleteOrder = () => {
        console.log("Оформить заказ");
        dispatch(fetchOrder(selectedIngredients, selectedBun))
    };

    const onCloseOrderModal = (e) => {
        console.log("Закрыть оформление заказа");
        e.stopPropagation();
        dispatch(orderClear())
    };

    // Цена всех выбранных ингредиентов + 2 булки
    const total = React.useMemo(
        () =>
            selectedBun ? selectedIngredients.reduce((x, obj) => x + obj.price, 0) + selectedBun.price * 2 : 0,
        [selectedBun, selectedIngredients]
    );

    return (
        <div className={styles.summary}>
            <div>
                {total}
                <CurrencyIcon type="primary"/>
            </div>
            <Button type="primary" size="large" onClick={onCompleteOrder} disabled={orderRequest}>
                Оформить заказ
            </Button>

            {/*Модалка по клику оформления заказа*/}
            {order &&
                (<Modal onClose={onCloseOrderModal}>
                        <OrderDetails {...order}/>
                    </Modal>
                )}
        </div>
    )
}

export default Summary;