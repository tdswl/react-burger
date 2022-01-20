import React from "react";
import styles from './summary.module.css'
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {ORDERS_ENDPOINT} from "../../utils/api-сonstants";
import {SelectedIngredientsContext} from "../../services/selected-ingredients-context";
import {SelectedBunContext} from "../../services/selected-bun-context";

const Summary = () => {
    const [order, setOrder] = React.useState(null);
    const [orderDetailsIsOpen, setOrderDetailsIsOpen] = React.useState(false);
    const [isRequestSent, setRequestSent] = React.useState(false);

    const {selectedIngredients} = React.useContext(SelectedIngredientsContext);
    const {selectedBun} = React.useContext(SelectedBunContext);

    const onCompleteOrder = () => {
        setRequestSent(true);
        console.log("Оформить заказ");
        const registerOrder = async () => {

            const ingredients = selectedIngredients.map(x => x._id);
            // Пушим булку. Нужно две и надо ли вообще?
            ingredients.push(selectedBun._id);
            ingredients.push(selectedBun._id);

            await fetch(ORDERS_ENDPOINT, {
                method: 'POST',
                body: JSON.stringify({
                    "ingredients": ingredients
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error(`Во время получения данных произошла ошибка. Запрос вернул код: ${res.status}`);
                }
            }).then(data => {
                if (data.success === true) {
                    setOrder(data);
                    setOrderDetailsIsOpen(true);
                    setRequestSent(false);
                } else {
                    throw new Error("Во время получения данных произошла ошибка");
                }
            }).catch(e => {
                setRequestSent(false);
            });
        }

        registerOrder();
    };

    const onCloseOrderModal = (e) => {
        console.log("Закрыть оформление заказа");
        e.stopPropagation();
        setOrderDetailsIsOpen(false);
    };

    // Цена всех ингридиентов + 2 булки
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
            <Button type="primary" size="large" onClick={onCompleteOrder} disabled={isRequestSent}>
                Оформить заказ
            </Button>

            {/*Модалка по клику оформления заказа*/}
            {orderDetailsIsOpen &&
                (<Modal onClose={onCloseOrderModal}>
                        <OrderDetails {...order}/>
                    </Modal>
                )}
        </div>
    )
}

export default Summary;