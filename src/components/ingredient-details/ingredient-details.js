import React from "react";
import styles from './ingredient-details.module.css'
import {ingredientPropTypes} from "../../utils/prop-types";

const IngredientDetails = (props) => {
    const {item} = props;

    return (
        <section className={styles.content}>
            <img alt={item.name} src={item.image}/>
            <p className='text text_type_main-default'>{item.name}</p>

            <div className={styles.details}>
                <div>
                    <p className='text text_type_main-small text_color_inactive'>
                        Каллории, ккал
                    </p>
                    <p className='text text_type_digits-default text_color_inactive'>
                        {item.calories}
                    </p>
                </div>
                <div>
                    <p className='text text_type_main-small text_color_inactive'>
                        Белки, г
                    </p>
                    <p className='text text_type_digits-default text_color_inactive'>
                        {item.proteins}
                    </p>
                </div>
                <div>
                    <p className='text text_type_main-small text_color_inactive'>
                        Жиры, г
                    </p>
                    <p className='text text_type_digits-default text_color_inactive'>
                        {item.fat}
                    </p>
                </div>
                <div>
                    <p className='text text_type_main-small text_color_inactive'>
                        Углеводы, г
                    </p>
                    <p className='text text_type_digits-default text_color_inactive'>
                        {item.carbohydrates}
                    </p>
                </div>
            </div>
        </section>
    )
}

IngredientDetails.propTypes = {
    item: ingredientPropTypes.isRequired,
};

export default IngredientDetails;