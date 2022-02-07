import React from "react";
import styles from './constructor.module.css'
import ErrorMessage from "../../components/error-message/error-message";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import {useSelector} from "react-redux";

const ConstructorPage = () => {
    const {ingredientsRequest, ingredientsFailed} = useSelector(store => store.burger);

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
            {ingredientsRequest && (<div className={styles.spinner}></div>)}
        </>
    )
}

export default ConstructorPage;