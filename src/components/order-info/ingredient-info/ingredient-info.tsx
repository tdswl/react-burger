import React, {FC} from "react";
import styles from './ingredient-info.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ISelectedIngredient} from "../../../services/types/burger";

const IngredientInfo: FC<{ ingredient: ISelectedIngredient & { count: number } }> = ({ingredient}) => {
    return (
        <div className={styles.container}>
            <div className={styles.imageBorder}>
                <img className={styles.image} alt={ingredient.name} src={ingredient.image}/>
            </div>
            <p className={styles.name}>{ingredient.name}</p>
            <p className={styles.price}>
                {ingredient.count}x{ingredient.price}
                <CurrencyIcon type="primary"/>
            </p>
        </div>
    );
}

export default IngredientInfo;