import React, {FC} from "react";
import styles from './ingredient-info.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredient} from "../../../services/types/burger";

const IngredientInfo: FC<{ ingredient: IIngredient }> = ({ingredient}) => {
    return (
        <div className={styles.container}>
            <div className={styles.imageBorder}>
                <img className={styles.image} alt={ingredient.name} src={ingredient.image}/>
            </div>
            <p className={styles.name}>{ingredient.name}</p>
            <p className={styles.price}>
                {ingredient.price}
                <CurrencyIcon type="primary"/>
            </p>
        </div>
    );
}

export default IngredientInfo;