import React from "react";
import styles from './ingredients.module.css'
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

const IngredientPage = () => {
    return (
        <article className={styles.container}>
            <IngredientDetails header='Детали ингредиента'/>
        </article>
    )
}

export default IngredientPage;