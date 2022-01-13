import React from "react";
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient.module.css'
import {ingredientPropTypes} from "../../utils/prop-types";
import PropTypes from "prop-types";

const Ingredient = (props) => {
    const [counter, setCounter] = React.useState(1);

    const {item, onClick} = props;

    return (
        <section className={styles.ingredientContainer} onClick={onClick}>
            <img className={styles.image} alt={item.name} src={item.image}/>
            <Counter count={counter} size="default"/>
            <p className={styles.price}>
                {item.price}
                <CurrencyIcon type="primary"/>
            </p>
            <p className={styles.name}>{item.name}</p>
        </section>
    )
}

Ingredient.propTypes = {
    item: ingredientPropTypes.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Ingredient;