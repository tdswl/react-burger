import React from "react";
import PropTypes from "prop-types";
import styles from './ingredient-details-param.module.css'

const IngredientDetailParam = ({name, value}) => {
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

IngredientDetailParam.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
};

export default IngredientDetailParam;