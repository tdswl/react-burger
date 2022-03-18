import React, {FC} from "react";
import styles from './ingredient-details.module.css'
import IngredientDetailParam from "./components/ingredient-details-param/ingredient-details-param";
import {useParams} from "react-router-dom";
import {selectIngredient} from "../../services/actions/burger";
import {useIngredients} from "../../utils/use-ingredients";
import {useAppDispatch, useAppSelector} from "../../services/hooks";

const IngredientDetails: FC<{ header?: string }> = ({header}) => {
    const dispatch = useAppDispatch();
    const {isIngredientsLoaded} = useIngredients();

    const {selectedIngredientInfo} = useAppSelector(store => store.burger);

    let {id} = useParams();

    React.useEffect(() => {
        if (isIngredientsLoaded) {
            dispatch(selectIngredient(id));
        }
    }, [id, dispatch, isIngredientsLoaded])

    if (!selectedIngredientInfo) {
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
                <IngredientDetailParam name='Калории,ккал' value={selectedIngredientInfo.calories}/>
                <IngredientDetailParam name='Белки, г' value={selectedIngredientInfo.proteins}/>
                <IngredientDetailParam name='Жиры, г' value={selectedIngredientInfo.fat}/>
                <IngredientDetailParam name='Углеводы, г' value={selectedIngredientInfo.carbohydrates}/>
            </div>
        </section>
    )
}

export default IngredientDetails;