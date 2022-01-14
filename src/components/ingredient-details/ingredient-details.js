import React from "react";
import styles from './ingredient-details.module.css'
import {ingredientPropTypes} from "../../utils/prop-types";
import IngredientDetailParam from "../ingredient-details-param/ingredient-details-param";

const IngredientDetails = ({item}) => {
    return (
        <section className={styles.content}>
            <img alt={item.name} src={item.image_large} className='mb-4'/>
            <p className='text text_type_main-medium mb-8'>{item.name}</p>
            <div className={styles.details}>
                <IngredientDetailParam name='Калории,ккал' value={item.calories} />
                <IngredientDetailParam name='Белки, г' value={item.proteins} />
                <IngredientDetailParam name='Жиры, г' value={item.fat} />
                <IngredientDetailParam name='Углеводы, г' value={item.carbohydrates} />
            </div>
        </section>
    )
}

IngredientDetails.propTypes = {
    item: ingredientPropTypes.isRequired,
};

export default IngredientDetails;