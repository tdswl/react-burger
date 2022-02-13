import React from "react";
import styles from './ingredient-details.module.css'
import IngredientDetailParam from "./components/ingredient-details-param/ingredient-details-param";
import {useLocation, useParams} from "react-router-dom";
import {fetchIngredients, selectIngredient} from "../../services/actions/burger";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";

const IngredientDetails = ({header}) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const {ingredients, ingredientsRequest, selectedIngredientInfo} = useSelector(store => store.burger);

    let { id } = useParams();

    React.useEffect(() => {
        // Если не модалка и нет ингридиентов, то надо бы запросить. Непонятно, есть ли роут для получение одного ингридиента
        if (!location.state?.modal && (!ingredients || ingredients.length === 0) && !ingredientsRequest)
        {
            dispatch(fetchIngredients())
        }
    }, [dispatch, location, ingredients, ingredientsRequest])

    React.useEffect(() => {
        dispatch(selectIngredient(id));
    }, [id, dispatch, ingredients])

    if (!selectedIngredientInfo)
    {
        return null;
    }

    return (
        <section className={styles.content}>
            {header &&
                (
                    <p className={styles.headerText}>
                        {header}
                    </p>
                )}
            <img alt={selectedIngredientInfo.name} src={selectedIngredientInfo.image_large} className='mb-4'/>
            <p className='text text_type_main-medium mb-8'>{selectedIngredientInfo.name}</p>
            <div className={styles.details}>
                <IngredientDetailParam name='Калории,ккал' value={selectedIngredientInfo.calories} />
                <IngredientDetailParam name='Белки, г' value={selectedIngredientInfo.proteins} />
                <IngredientDetailParam name='Жиры, г' value={selectedIngredientInfo.fat} />
                <IngredientDetailParam name='Углеводы, г' value={selectedIngredientInfo.carbohydrates} />
            </div>
        </section>
    )
}

IngredientDetails.propTypes = {
    header: PropTypes.string
};

export default IngredientDetails;