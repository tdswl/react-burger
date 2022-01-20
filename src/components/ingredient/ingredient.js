import React from "react";
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient.module.css'
import {ingredientPropTypes} from "../../utils/prop-types";
import PropTypes from "prop-types";
import {SelectedIngredientsContext} from "../../services/selected-ingredients-context";

const Ingredient = ({item, onClick}) => {
    const {selectedIngredients} = React.useContext(SelectedIngredientsContext);

    // Цена всех ингридиентов + 2 булки
    const counter = React.useMemo(
        () => selectedIngredients.filter(x => x._id === item._id).length,
        [selectedIngredients]
    );

    return (
        <section className={styles.ingredientContainer} onClick={onClick}>
            <img className={styles.image} alt={item.name} src={item.image}/>
            {counter > 0 && (<Counter count={counter} size="default"/>)}
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