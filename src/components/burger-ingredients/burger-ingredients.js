import React from "react";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import Ingredient from "../ingridient/ingridient";
import styles from './burger-ingredients.module.css'
import PropTypes from "prop-types";
import {ingredientPropTypes} from "../../utils/prop-types";

class BurgerIngredients extends React.Component {
    state = {
        currentTab: 'bun',
    };

    setCurrentTab = (selectedTab) => {
        this.setState({
            currentTab: selectedTab
        });

        let element = document.querySelector(`#${selectedTab}`);
        // TODO: скроллит всю страницу и хедер уезжает вверх :(
        element.scrollIntoView({ behavior: 'smooth'});
    };

    render() {
        const {burgerComponents, onAdd} = this.props;

        return (
            <article className={styles.ingredientsContainer}>
                <h1 className={styles.pageHeader}>
                    Соберите бургер
                </h1>
                <div className={styles.tabsContainer}>
                    <Tab value="bun" active={this.state.currentTab === 'bun'} onClick={this.setCurrentTab}>
                        Булки
                    </Tab>
                    <Tab value="sauce" active={this.state.currentTab === 'sauce'} onClick={this.setCurrentTab}>
                        Соусы
                    </Tab>
                    <Tab value="main" active={this.state.currentTab === 'main'} onClick={this.setCurrentTab}>
                        Начинки
                    </Tab>
                </div>

                <article className={styles.scrollableContainer}>
                    <section id="bun">
                        <h1 className={styles.ingredientsLabel}>Булки</h1>
                        <ul className={styles.ingredientsList}>
                            {burgerComponents.filter(component => component.type === 'bun').map((component) =>
                                <li key={component._id}><Ingredient item={component} onClick={onAdd}/></li>
                            )}
                        </ul>
                    </section>

                    <section id="sauce">
                        <h1 className={styles.ingredientsLabel}>Соусы</h1>
                        <ul className={styles.ingredientsList}>
                            {burgerComponents.filter(component => component.type === 'sauce').map((component) =>
                                <li key={component._id} ><Ingredient item={component} onClick={onAdd}/></li>
                            )}
                        </ul>
                    </section>

                    <section id="main">
                        <h1 className={styles.ingredientsLabel}>Начинки</h1>
                        <ul className={styles.ingredientsList}>
                            {burgerComponents.filter(component => component.type === 'main').map((component) =>
                                <li key={component._id} ><Ingredient item={component} onClick={onAdd}/></li>
                            )}
                        </ul>
                    </section>
                </article>
            </article>
        )
    }
}

BurgerIngredients.propTypes = {
    burgerComponents: PropTypes.arrayOf(ingredientPropTypes.isRequired),
    onAdd: PropTypes.func.isRequired
};

export default BurgerIngredients;