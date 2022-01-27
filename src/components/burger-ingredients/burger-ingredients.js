import React from "react";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import Ingredient from "./components/ingredient/ingredient";
import styles from './burger-ingredients.module.css'
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useDispatch, useSelector} from "react-redux";
import {selectIngredient, addIngredient, fetchIngredients} from "../../services/actions/burger";

const BurgerIngredients = () => {
    const dispatch = useDispatch();

    const {ingredients, selectedIngredientInfo} = useSelector(store => store.burger);

    const bunRef = React.useRef(null);
    const sauceRef = React.useRef(null);
    const mainRef = React.useRef(null);

    const onScroll = (e) => {
        const bun = bunRef.current.getBoundingClientRect();
        const sauce = sauceRef.current.getBoundingClientRect();
        const main = mainRef.current.getBoundingClientRect();

        // Берем расстояния до верхней границы
        const offsetValues = {
            'bun': bun.top - e.target.offsetTop,
            'sauce': sauce.top - e.target.offsetTop,
            'main': main.top - e.target.offsetTop,
        }

        // Выбираем того, у кого оно меньше
        const tab = Object.keys(offsetValues)
            .reduce((prev, curr) => Math.abs(offsetValues[prev]) < Math.abs(offsetValues[curr]) ? prev : curr);

        //  Выбираем вкладку
        if (currentTab !== tab) {
            setCurrentTabState(tab);
        }
    };

    // Выбранный таб
    const [currentTab, setCurrentTabState] = React.useState('bun');

    const onIngredientClick = (ingredient) => {
        dispatch(selectIngredient(ingredient));
        dispatch(addIngredient(ingredient));
    };

    React.useEffect(() => {
        dispatch(fetchIngredients())
    }, [dispatch])

    const onBunClick = (bun) => {
        dispatch(selectIngredient(bun));
    };

    const onCloseIngredientModal = (e) => {
        e.stopPropagation();
        dispatch(selectIngredient(null));
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

            {ingredients &&
                (
                    <article className={styles.scrollableContainer} onScroll={onScroll}>
                        <section ref={bunRef}>
                            <h1 className={styles.ingredientsLabel}>Булки</h1>
                            <ul className={styles.ingredientsList}>
                                {ingredients.filter(component => component.type === 'bun').map((component) =>
                                    (
                                        <li key={component._id}>
                                            <Ingredient item={component} onClick={() => onBunClick(component)}/>
                                        </li>
                                    ))}
                            </ul>
                        </section>

                        <section ref={sauceRef}>
                            <h1 className={styles.ingredientsLabel}>Соусы</h1>
                            <ul className={styles.ingredientsList}>
                                {ingredients.filter(component => component.type === 'sauce').map((component) =>
                                    (
                                        <li key={component._id}>
                                            <Ingredient item={component} onClick={() => onIngredientClick(component)}/>
                                        </li>
                                    ))}
                            </ul>
                        </section>

                        <section ref={mainRef}>
                            <h1 className={styles.ingredientsLabel}>Начинки</h1>
                            <ul className={styles.ingredientsList}>
                                {ingredients.filter(component => component.type === 'main').map((component) =>
                                    (
                                        <li key={component._id}>
                                            <Ingredient item={component} onClick={() => onIngredientClick(component)}/>
                                        </li>
                                    ))}
                            </ul>
                        </section>
                    </article>
                )}

            {/*Модалка для клика по ингредиенту*/}
            {selectedIngredientInfo && (
                <Modal onClose={onCloseIngredientModal} header='Детали ингредиента'>
                    <IngredientDetails {...selectedIngredientInfo}/>
                </Modal>
            )}
        </article>
    )
}

export default BurgerIngredients;