import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from './app.module.css'
import ErrorMessage from "../error-message/error-message";
import {useSelector} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

const App = () => {
    const {ingredientsRequest, ingredientsFailed} = useSelector(store => store.burger);

    return (
        <div className={styles.app}>
            <AppHeader/>
            <main className={styles.mainContainer}>
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
            </main>
        </div>
    );
}

export default App;