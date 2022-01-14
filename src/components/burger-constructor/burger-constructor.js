import React from "react";
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import PropTypes from "prop-types";
import {ingredientPropTypes} from "../../utils/prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

const BurgerConstructor = ({burgerComponents, selectedBun, onDelete}) => {
    const [orderDetailsIsOpen, setOrderDetailsIsOpen] = React.useState(false);
    const [ingredientDetailsIsOpen, setIngredientDetailsIsOpen] = React.useState(false);
    const [selectedIngredient, setSelectedIngredient] = React.useState({});

    const onCompleteOrder = () => {
        console.log("Оформить заказ");
        setOrderDetailsIsOpen(true);
    };

    const onCloseOrderModal = (e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget || e.keyCode === 27) {
            console.log("Закрыть оформление заказа");
            setOrderDetailsIsOpen(false);
        }
    };

    const onIngredientClick = (ingredient) => {
        console.log("Открыть ингридиент");
        setIngredientDetailsIsOpen(true);
        setSelectedIngredient(ingredient);
    };

    const onCloseIngredientModal = (e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget || e.keyCode === 27) {
            console.log("Закрыть ингридиент");
            setIngredientDetailsIsOpen(false);
        }
    };

    // Цена всех ингридиентов + 2 булки
    const total = selectedBun ? burgerComponents.reduce((x, obj) => x + obj.price, 0) + selectedBun.price * 2 : 0;

    return (
        <article className={styles.ingredientsContainer}>
            {selectedBun && <div className={styles.topBun} onClick={() => onIngredientClick(selectedBun)}>
                <ConstructorElement
                    isLocked={true}
                    type='top'
                    text={`${selectedBun.name} (верх)`}
                    price={selectedBun.price}
                    thumbnail={selectedBun.image}/>
            </div>}

            <ul className={styles.list}>
                {burgerComponents && burgerComponents.map((component) =>
                    <li key={component._id} onClick={() => onIngredientClick(component)}>
                        <DragIcon type="primary"/>
                        <ConstructorElement
                            text={component.name}
                            price={component.price}
                            thumbnail={component.image}
                            handleClose={onDelete}/>
                    </li>
                )}
            </ul>

            {selectedBun && <div className={styles.bottomBun} onClick={() => onIngredientClick(selectedBun)}>
                <ConstructorElement
                    isLocked={true}
                    type='bottom'
                    text={`${selectedBun.name} (низ)`}
                    price={selectedBun.price}
                    thumbnail={selectedBun.image}/>
            </div>}

            <div className={styles.summary}>
                <div>
                    {total}
                    <CurrencyIcon type="primary"/>
                </div>
                <Button type="primary" size="large" onClick={onCompleteOrder}>
                    Оформить заказ
                </Button>

                {/*Модалка для клика по ингридиенту*/}
                {ingredientDetailsIsOpen &&
                    <Modal onClose={onCloseIngredientModal} header='Детали ингридиента'>
                        <IngredientDetails item={selectedIngredient}/>
                    </Modal>}

                {/*Модалка по клику оформления заказа*/}
                {orderDetailsIsOpen &&
                    <Modal onClose={onCloseOrderModal}>
                        <OrderDetails/>
                    </Modal>}
            </div>
        </article>
    )
}

BurgerConstructor.propTypes = {
    burgerComponents: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
    selectedBun: ingredientPropTypes.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default BurgerConstructor;