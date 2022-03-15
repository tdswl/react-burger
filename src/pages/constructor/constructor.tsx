import React from "react";
import styles from './constructor.module.css'
import ErrorMessage from "../../components/error-message/error-message";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import {useSelector} from "react-redux";
import {IRootState} from "../../services/types/types";

const ConstructorPage = () => {
    const {ingredientsRequest, ingredientsFailed, orderRequest} = useSelector((store: IRootState) => store.burger);

    return (
        <>
            {ingredientsFailed ? (<ErrorMessage/>) :
                (
                    <article className={styles.constrictorContainer}>
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients/>
                            <BurgerConstructor/>
                        </DndProvider>
                    </article>
                )}
            {/*Индикатор загрузки*/}
            {(ingredientsRequest || orderRequest) && (<div className={styles.spinner}></div>)}
        </>
    )
}

export default ConstructorPage;