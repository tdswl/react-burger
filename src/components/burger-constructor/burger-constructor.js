import React from "react";
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import PropTypes from "prop-types";
import {ingredientPropTypes} from "../../utils/prop-types";

const BurgerConstructor = (props) => {
    const onCompleteOrder = () => {
        console.log("Оформить заказ");
    };

    const {burgerComponents, selectedBun, onDelete} = props;
    // Цена всех ингридиентов + 2 булки
    const total = burgerComponents.reduce((x, obj) => x + obj.price, 0) + selectedBun.price * 2;

    return (
        <article className={styles.ingredientsContainer}>
            <div className={styles.topBun}>
                {selectedBun && <ConstructorElement
                    isLocked={true}
                    type='top'
                    text={`${selectedBun.name} (верх)`}
                    price={selectedBun.price}
                    thumbnail={selectedBun.image}/>}
            </div>

            <ul className={styles.list}>
                {burgerComponents && burgerComponents.map((component) =>
                    <li key={component._id}>
                        <DragIcon type="primary"/>
                        <ConstructorElement
                            text={component.name}
                            price={component.price}
                            thumbnail={component.image}
                            handleClose={onDelete}/>
                    </li>
                )}
            </ul>

            <div className={styles.bottomBun}>
                {selectedBun && <ConstructorElement
                    isLocked={true}
                    type='bottom'
                    text={`${selectedBun.name} (низ)`}
                    price={selectedBun.price}
                    thumbnail={selectedBun.image}/>}
            </div>

            <div className={styles.summary}>
                <div>
                    {total}
                    <CurrencyIcon type="primary"/>
                </div>
                <Button type="primary" size="large" onClick={onCompleteOrder}>
                    Оформить заказ
                </Button>
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