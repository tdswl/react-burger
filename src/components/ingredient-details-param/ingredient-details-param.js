import React from "react";
import PropTypes from "prop-types";
import styles from './ingredient-details-param.module.css'

const IngredientDetailParam = (props) => {
    return (
        <div>
            <p className={styles.name}>
                {props.name}
            </p>
            <p className={styles.value}>
                {props.value}
            </p>
        </div>
    );
}

IngredientDetailParam.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
};

export default IngredientDetailParam;