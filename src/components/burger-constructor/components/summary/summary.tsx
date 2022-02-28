import React from "react";
import styles from './summary.module.css'
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../../modal/modal";
import OrderDetails from "../../../order-details/order-details";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrder, orderClear} from "../../../../services/actions/burger";
import {useNavigate} from "react-router-dom";
import {IRootState} from "../../../../utils/types";

const Summary = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const {order, orderRequest, selectedIngredients, selectedBun} = useSelector((store: IRootState) => store.burger);
    const {user} = useSelector((store: IRootState) => store.auth);

    const onCompleteOrder = () => {
        if (!user) {
            navigate("/login", {replace: true});
            return;
        }
        console.log("Оформить заказ");
        dispatch(fetchOrder(selectedIngredients, selectedBun))
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