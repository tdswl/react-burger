import React from "react";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import Ingredient from "./components/ingredient/ingredient";
import styles from './burger-ingredients.module.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchIngredients} from "../../services/actions/burger";
import {IngredientType} from "../../utils/enums";
import {useLocation, useNavigate} from "react-router-dom";

const BurgerIngredients = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const {ingredients} = useSelector(store => store.burger);

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

        // Выбираем элемент, у которого оно меньше
        const tab = Object.keys(offsetValues)
            .reduce((prev, curr) => Math.abs(offsetValues[prev]) < Math.abs(offsetValues[curr]) ? prev : curr);

        //  Выбираем вкладку
        if (currentTab !== tab) {
            setCurrentTabState(tab);
        }
    };

    // Выбранный таб
    const [currentTab, setCurrentTabState] = React.useState(IngredientType.BUN);

    const onIngredientClick = (id) => {
        navigate(`/ingredient/${id}`, {state: { background: location }})
    };

    React.useEffect(() => {
        dispatch(fetchIngredients())
    }, [dispatch])

    const setCurrentTab = (selectedTab) => {
        scrollToContent(selectedTab);
    };

    const scrollToContent = (selectedTab) => {
        let node = null;
        switch (selectedTab) {
            case IngredientType.BUN:
                node = bunRef.current;
                break;
            case IngredientType.SAUCE:
                node = sauceRef.current;
                break;
            case IngredientType.MAIN:
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
                <Tab value={IngredientType.BUN} active={currentTab === IngredientType.BUN} onClick={setCurrentTab}>
                    Булки
                </Tab>
                <Tab value={IngredientType.SAUCE} active={currentTab === IngredientType.SAUCE} onClick={setCurrentTab}>
                    Соусы
                </Tab>
                <Tab value={IngredientType.MAIN} active={currentTab === IngredientType.MAIN} onClick={setCurrentTab}>
                    Начинки
                </Tab>
            </div>

            {ingredients &&
                (
                    <article className={styles.scrollableContainer} onScroll={onScroll}>
                        <section ref={bunRef}>
                            <h1 className={styles.ingredientsLabel}>Булки</h1>
                            <ul className={styles.ingredientsList}>
                                {ingredients.filter(component => component.type === IngredientType.BUN).map((component) =>
                                    (
                                        <li key={component._id}>
                                            <Ingredient item={component} onClick={() => onIngredientClick(component._id)}/>
                                        </li>
                                    ))}
                            </ul>
                        </section>

                        <section ref={sauceRef}>
                            <h1 className={styles.ingredientsLabel}>Соусы</h1>
                            <ul className={styles.ingredientsList}>
                                {ingredients.filter(component => component.type === IngredientType.SAUCE).map((component) =>
                                    (
                                        <li key={component._id}>
                                            <Ingredient item={component} onClick={() => onIngredientClick(component._id)}/>
                                        </li>
                                    ))}
                            </ul>
                        </section>

                        <section ref={mainRef}>
                            <h1 className={styles.ingredientsLabel}>Начинки</h1>
                            <ul className={styles.ingredientsList}>
                                {ingredients.filter(component => component.type === IngredientType.MAIN).map((component) =>
                                    (
                                        <li key={component._id}>
                                            <Ingredient item={component} onClick={() => onIngredientClick(component._id)}/>
                                        </li>
                                    ))}
                            </ul>
                        </section>
                    </article>
                )}
        </article>
    )
}

export default BurgerIngredients;