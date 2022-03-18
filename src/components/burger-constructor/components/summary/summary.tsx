import React from "react";
import styles from './summary.module.css'
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../../modal/modal";
import OrderDetails from "../../../order-details/order-details";
import {fetchOrder, orderClear} from "../../../../services/actions/burger";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../services/hooks";

const Summary = () => {
    let navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {order, orderRequest, selectedIngredients, selectedBun} = useAppSelector(store => store.burger);
    const {user} = useAppSelector(store => store.auth);

    const onCompleteOrder = () => {
        if (!user) {
            navigate("/login", {replace: true});
            return;
        }
        console.log("Оформить заказ");
        if (selectedBun) {
            dispatch(fetchOrder({selectedIngredients, selectedBun}) as any)
        }
    };

    const onCloseOrderModal = () => {
        console.log("Закрыть оформление заказа");
        dispatch(orderClear())
    };

    const totalPrice = React.useMemo(
        () => {
            let price = 0;
            if (selectedIngredients) {
                price += selectedIngredients.reduce((x, obj) => x + obj.price, 0);
            }
            if (selectedBun) {
                price += selectedBun.price * 2;
            }
            return price;
        },
        [selectedIngredients, selectedBun]
    );

    const disabled = orderRequest || !selectedIngredients || selectedIngredients.length === 0 || !selectedBun;

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
                        <OrderDetails order={order}/>
                    </Modal>
                )}
        </div>
    )
}

export default Summary;