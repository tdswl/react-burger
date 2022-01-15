import React from "react";
import styles from './ingredient-details.module.css'
import IngredientDetailParam from "../ingredient-details-param/ingredient-details-param";
import PropTypes from "prop-types";

const IngredientDetails = ({name, image_large, calories, proteins, fat, carbohydrates}) => {
    return (
        <section className={styles.content}>
            <img alt={name} src={image_large} className='mb-4'/>
            <p className='text text_type_main-medium mb-8'>{name}</p>
            <div className={styles.details}>
                <IngredientDetailParam name='Калории,ккал' value={calories} />
                <IngredientDetailParam name='Белки, г' value={proteins} />
                <IngredientDetailParam name='Жиры, г' value={fat} />
                <IngredientDetailParam name='Углеводы, г' value={carbohydrates} />
            </div>
        </section>
    )
}

IngredientDetails.propTypes = {
    name: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    image_large: PropTypes.string.isRequired,
};

export default IngredientDetails;