import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {burgerComponentsData} from "../../utils/data";
import styles from './app.module.css'

export default class App extends React.Component {
    state = {
        burgerComponents: burgerComponentsData,
        // TODO: selectedComponents должна содержать коллекцию выбранных ингридиентов
        selectedComponents: burgerComponentsData,
        selectedBun: burgerComponentsData.find(x => x.type === 'bun')
    };

    onDelete = () => {
        console.log("delete");
        // TODO: удаление
    };

    onAdd = () => {
        console.log("add");
        // TODO: добавление
    };

    onSelectBun = () => {
        // Отдельная функция, потому что булки не входят в общий список ингридиентов
        console.log('selectBun');
        // TODO: выбор булки
    };

    render() {
        return (
            <div className={styles.app}>
                <AppHeader/>
                <main className={styles.mainContainer}>
                    <article className={styles.constrictorContainer}>
                        <BurgerIngredients burgerComponents={this.state.burgerComponents} onAdd={this.onAdd} onSelectBun={this.onSelectBun}/>
                        <BurgerConstructor burgerComponents={this.state.selectedComponents} onDelete={this.onDelete} selectedBun={this.state.selectedBun}/>
                    </article>
                </main>
            </div>
        );
    }
}
