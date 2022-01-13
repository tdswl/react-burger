import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from './app.module.css'
import {ingredientsAddress} from "../../utils/apiConstants";

const App = () => {
    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        burgerComponents: [],
        selectedComponents: [],
        selectedBun: {}
    });

    React.useEffect(() => {
        const getComponents = async () => {
            setState({...state, hasError: false, isLoading: true});
            await fetch(ingredientsAddress)
                .then(res => res.json())
                .then(data => {
                    const componentsOnly = data.data.filter(x => x.type !== 'bun');
                    const bun = data.data.find(x => x.type === 'bun');

                    setState({
                        ...state,
                        isLoading: false,
                        burgerComponents: data.data,
                        selectedComponents: componentsOnly,
                        selectedBun: bun
                    })
                })
                .catch(e => {
                    setState({
                        ...state,
                        hasError: true,
                        isLoading: false,
                    });
                });
        }

        getComponents();
    }, [])

    const onDelete = () => {
        console.log("delete");
        // TODO: удаление
    };

    const onAdd = () => {
        console.log("add");
        // TODO: добавление
    };

    const onSelectBun = () => {
        console.log('selectBun');
        // TODO: выбор булки
        // Отдельная функция, потому что булки не входят в общий список ингридиентов
    };

    return (
        <div className={styles.app}>
            <AppHeader/>
            <main className={styles.mainContainer}>
                <article className={styles.constrictorContainer}>
                    <BurgerIngredients burgerComponents={state.burgerComponents}
                                       onAdd={onAdd}
                                       onSelectBun={onSelectBun}/>
                    <BurgerConstructor burgerComponents={state.selectedComponents}
                                       onDelete={onDelete}
                                       selectedBun={state.selectedBun}/>
                </article>
            </main>
        </div>
    );
}

export default App;