import React from "react";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import Ingredient from "./components/ingredient/ingredient";
import styles from './burger-ingredients.module.css'
import {fetchIngredients} from "../../services/actions/burger";
import {IngredientType} from "../../utils/enums";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../services/hooks/hooks";

const BurgerIngredients = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const {ingredients} = useAppSelector(store => store.burger);

    const bunRef = React.useRef<HTMLDivElement>(null);
    const sauceRef = React.useRef<HTMLDivElement>(null);
    const mainRef = React.useRef<HTMLDivElement>(null);
    const scrollableContainerRef = React.useRef<HTMLDivElement>(null);

    const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
        const bun = bunRef?.current?.getBoundingClientRect();
        const sauce = sauceRef?.current?.getBoundingClientRect();
        const main = mainRef?.current?.getBoundingClientRect();

        // Берем расстояния до верхней границы
        const offsetTop = scrollableContainerRef?.current?.offsetTop;

        //TODO: небольшой баг с вычислениями - последний пункт выбирается неверно
        const offsetValues = new Map<IngredientType, number>([
            [IngredientType.BUN, bun?.top ?? 0 - (offsetTop ?? 0)],
            [IngredientType.SAUCE, sauce?.top ?? 0 - (offsetTop ?? 0)],
            [IngredientType.MAIN, main?.top ?? 0 - (offsetTop ?? 0)]
        ]);

        // Выбираем элемент, у которого оно меньше
        const tab = Array.from(offsetValues.keys())
            .reduce((prev: IngredientType, curr: IngredientType) => Math.abs(offsetValues.get(prev) as number) < Math.abs(offsetValues.get(curr) as number) ? prev : curr);

        //  Выбираем вкладку
        if (currentTab !== tab) {
            setCurrentTabState(tab);
        }
    };

    // Выбранный таб
    const [currentTab, setCurrentTabState] = React.useState(IngredientType.BUN);

    const onIngredientClick = (id: string) => {
        navigate(`/ingredient/${id}`, {state: {background: location}})
    };

    React.useEffect(() => {
        dispatch(fetchIngredients() as any)
    }, [dispatch])

    const setCurrentTab = (selectedTab: string) => {
        scrollToContent(selectedTab);
    };

    const scrollToContent = (selectedTab: string) => {
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
                    <article ref={scrollableContainerRef} className={styles.scrollableContainer} onScroll={onScroll}>
                        <section ref={bunRef}>
                            <h1 className={styles.ingredientsLabel}>Булки</h1>
                            <ul className={styles.ingredientsList}>
                                {ingredients.filter(component => component.type === IngredientType.BUN).map((component) =>
                                    (
                                        <li key={component._id}>
                                            <Ingredient item={component}
                                                        onClick={() => onIngredientClick(component._id)}/>
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
                                            <Ingredient item={component}
                                                        onClick={() => onIngredientClick(component._id)}/>
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
                                            <Ingredient item={component}
                                                        onClick={() => onIngredientClick(component._id)}/>
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