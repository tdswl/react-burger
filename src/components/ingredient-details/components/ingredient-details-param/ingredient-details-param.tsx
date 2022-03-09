import React, {FC} from "react";
import styles from './ingredient-details-param.module.css'

const IngredientDetailParam: FC<{ name: string, value: number }> = ({name, value}) => {
    return (
        <div className={styles.container}>
            <p className={styles.name}>
                {name}
            </p>
            <p className={styles.value}>
                {value}
            </p>
        </div>
    );
}

export default IngredientDetailParam;