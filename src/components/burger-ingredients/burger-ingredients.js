import React from "react";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import Ingredient from "../ingredient/ingredient";
import styles from './burger-ingredients.module.css'
import PropTypes from "prop-types";
import {ingredientPropTypes} from "../../utils/prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

const BurgerIngredients = ({burgerComponents}) => {
    const bunRef = React.useRef(null);
    const sauceRef = React.useRef(null);
    const mainRef = React.useRef(null);

    const [currentTab, setCurrentTabState] = React.useState('bun');
    const [selectedIngredient, setSelectedIngredient] = React.useState(null);

    const onIngredientClick = (ingredient) => {
        console.log("Открыть ингридиент");
        setSelectedIngredient(ingredient);
    };

    const onCloseIngredientModal = (e) => {
        console.log("Закрыть ингридиент");
        e.stopPropagation();
        setSelectedIngredient(null);
    };

    const setCurrentTab = (selectedTab) => {
        setCurrentTabState(selectedTab);
        scrollToContent(selectedTab);
    };

    const scrollToContent = (selectedTab) => {
        let node = null;
        switch (selectedTab) {
            case "bun":
                node = bunRef.current;
                break;
            case "sauce":
                node = sauceRef.current;
                break;
            case "main":
                node = mainRef.current;
                break;
            default:
                break;
        }

        if (node) {
            node.scrollIntoView({behavior: 'smooth'});
        }
    }

    return (
        <article className={styles.ingredientsContainer}>
            <h1 className={styles.pageHeader}>
                Соберите бургер
            </h1>
            <div className={styles.tabsContainer}>
                <Tab value="bun" active={currentTab === 'bun'} onClick={setCurrentTab}>
                    Булки
                </Tab>
                <Tab value="sauce" active={currentTab === 'sauce'} onClick={setCurrentTab}>
                    Соусы
                </Tab>
                <Tab value="main" active={currentTab === 'main'} onClick={setCurrentTab}>
                    Начинки
                </Tab>
            </div>

            {burgerComponents &&
                (<article className={styles.scrollableContainer}>
                    <section ref={bunRef}>
                        <h1 className={styles.ingredientsLabel}>Булки</h1>
                        <ul className={styles.ingredientsList}>
                            {burgerComponents.filter(component => component.type === 'bun').map((component) =>
                                (<li key={component._id}>
                                    <Ingredient item={component} onClick={() => onIngredientClick(component)}/>
                                </li>)
                            )}
                        </ul>
                    </section>

                    <section ref={sauceRef}>
                        <h1 className={styles.ingredientsLabel}>Соусы</h1>
                        <ul className={styles.ingredientsList}>
                            {burgerComponents.filter(component => component.type === 'sauce').map((component) =>
                                (<li key={component._id}>
                                    <Ingredient item={component} onClick={() => onIngredientClick(component)}/>
                                </li>)
                            )}
                        </ul>
                    </section>

                    <section ref={mainRef}>
                        <h1 className={styles.ingredientsLabel}>Начинки</h1>
                        <ul className={styles.ingredientsList}>
                            {burgerComponents.filter(component => component.type === 'main').map((component) =>
                                (<li key={component._id}>
                                    <Ingredient item={component} onClick={() => onIngredientClick(component)}/>
                                </li>)
                            )}
                        </ul>
                    </section>
                </article>)}

            {/*Модалка для клика по ингридиенту*/}
            {selectedIngredient &&
                (<Modal onClose={onCloseIngredientModal} header='Детали ингридиента'>
                    <IngredientDetails {...selectedIngredient}/>
                </Modal>)}
        </article>
    )
}

BurgerIngredients.propTypes = {
    burgerComponents: PropTypes.arrayOf(ingredientPropTypes).isRequired,
};

export default BurgerIngredients;