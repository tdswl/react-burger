import React from "react";
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient.module.css'
import {ingredientPropTypes} from "../../../../utils/prop-types";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {useDrag} from 'react-dnd';

const Ingredient = ({item, onClick}) => {
    const {selectedIngredients, selectedBun} = useSelector(store => store.burger);

    // Подсчет всех выбранных ингредиентов с тем же id
    const counter = React.useMemo(
        () => {
            if (selectedBun?._id === item._id) {
                return 2;
            }
            return selectedIngredients.filter(x => x._id === item._id).length;
        },
        [selectedIngredients, selectedBun, item]
    );

    const [{opacity}, ref] = useDrag({
        type: item.type,
        item,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    return (
        <section className={styles.ingredientContainer} onClick={onClick} ref={ref} style={{opacity}}>
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