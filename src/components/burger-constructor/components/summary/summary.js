import React from "react";
import styles from './summary.module.css'
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../../modal/modal";
import OrderDetails from "../../../order-details/order-details";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrder, orderClear} from "../../../../services/actions/burger";

const Summary = () => {
    const dispatch = useDispatch();

    const {order, orderRequest, selectedIngredients, selectedBun, totalPrice} = useSelector(store => store.burger);

    const onCompleteOrder = () => {
        console.log("Оформить заказ");
        dispatch(fetchOrder(selectedIngredients, selectedBun))
    };

    const onCloseOrderModal = (e) => {
        console.log("Закрыть оформление заказа");
        e.stopPropagation();
        dispatch(orderClear())
    };

    const disabled = orderRequest || ((!selectedIngredients || selectedIngredients.length === 0) && !selectedBun);

    return (
        <div className={styles.summary}>
            <div>
                {totalPrice}
                <CurrencyIcon type="primary"/>
            </div>
            <Button type="primary" size="large" onClick={onCompleteOrder} disabled={disabled}>
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