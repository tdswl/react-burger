import React from "react";
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import PropTypes from "prop-types";
import {ingredientPropTypes} from "../../utils/prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

const BurgerConstructor = ({burgerComponents, selectedBun, onDelete}) => {
    const [orderDetailsIsOpen, setOrderDetailsIsOpen] = React.useState(false);

    const onCompleteOrder = () => {
        console.log("Оформить заказ");
        setOrderDetailsIsOpen(true);
    };

    const onCloseOrderModal = (e) => {
        console.log("Закрыть оформление заказа");
        e.stopPropagation();
        setOrderDetailsIsOpen(false);
    };

    // Цена всех ингридиентов + 2 булки
    const total = React.useMemo(
        () =>
            selectedBun ? burgerComponents.reduce((x, obj) => x + obj.price, 0) + selectedBun.price * 2 : 0,
        [selectedBun, burgerComponents]
    );

    return (
        <article className={styles.ingredientsContainer}>
            {selectedBun && (<div className={styles.topBun}>
                <ConstructorElement
                    isLocked={true}
                    type='top'
                    text={`${selectedBun.name} (верх)`}
                    price={selectedBun.price}
                    thumbnail={selectedBun.image}/>
            </div>)}

            <ul className={styles.list}>
                {burgerComponents && burgerComponents.map((component) =>
                    (<li key={component._id}>
                        <DragIcon type="primary"/>
                        <ConstructorElement
                            text={component.name}
                            price={component.price}
                            thumbnail={component.image}
                            handleClose={onDelete}/>
                    </li>)
                )}
            </ul>

            {selectedBun && (<div className={styles.bottomBun}>
                <ConstructorElement
                    isLocked={true}
                    type='bottom'
                    text={`${selectedBun.name} (низ)`}
                    price={selectedBun.price}
                    thumbnail={selectedBun.image}/>
            </div>)}

            <div className={styles.summary}>
                <div>
                    {total}
                    <CurrencyIcon type="primary"/>
                </div>
                <Button type="primary" size="large" onClick={onCompleteOrder}>
                    Оформить заказ
                </Button>

                {/*Модалка по клику оформления заказа*/}
                {orderDetailsIsOpen &&
                    (<Modal onClose={onCloseOrderModal}>
                        <OrderDetails/>
                    </Modal>)}
            </div>
        </article>
    )
}

BurgerConstructor.propTypes = {
    burgerComponents: PropTypes.arrayOf(ingredientPropTypes).isRequired,
    onDelete: PropTypes.func.isRequired
};

export default BurgerConstructor;