import React from "react";
import styles from './ingredients.module.css'
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import {useSelector} from "react-redux";

const IngredientPage = () => {
    const {selectedIngredientInfo} = useSelector(store => store.burger);

    return (
        <article className={styles.container}>
            <IngredientDetails {...selectedIngredientInfo}/>
        </article>
    )
}

export default IngredientPage;