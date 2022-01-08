import React from "react";
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import PropTypes from "prop-types";
import {ingredientPropTypes} from "../../utils/prop-types";

class BurgerConstructor extends React.Component {
    render() {
        const {burgerComponents, onDelete} = this.props;
        const total = burgerComponents.reduce((x, obj) => x + obj.price, 0);

        return (
            <article className={styles.ingredientsContainer}>
                <ul className={styles.list}>
                    {burgerComponents && burgerComponents.map((component, index) =>
                        <li key={index}>
                            {(index !== 0 && index !== burgerComponents.length - 1) && <DragIcon type="primary"/>}
                            <ConstructorElement
                                isLocked={index === 0 || index === burgerComponents.length - 1}
                                type={index === 0 ? 'top' : index === burgerComponents.length - 1 ? 'bottom' : ''}
                                text={component.name}
                                price={component.price}
                                thumbnail={component.image}
                                handleClose={onDelete}/>
                        </li>
                    )}
                </ul>

                <div className={styles.summary}>
                    <div>
                        {total}
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            </article>
        )
    }
}

BurgerConstructor.propTypes = {
    burgerComponents: PropTypes.arrayOf(ingredientPropTypes.isRequired),
    onDelete: PropTypes.func.isRequired
};

export default BurgerConstructor;