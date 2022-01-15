import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from './app.module.css'
import {INGREDIENTS_ENDPOINT} from "../../utils/api-сonstants";
import ErrorMessage from "../error-message/error-message";

const App = () => {
    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        burgerComponents: [],
        selectedComponents: [],
        selectedBun: null
    });

    React.useEffect(() => {
        const getComponents = async () => {
            setState({...state, hasError: false, isLoading: true});
            await fetch(INGREDIENTS_ENDPOINT)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error(`Во время получения данных произошла ошибка. Запрос вернул код: ${res.status}`);
                    }
                })
                .then(data => {
                    if (data.success === true) {
                        const componentsOnly = data.data.filter(x => x.type !== 'bun');
                        const bun = data.data.find(x => x.type === 'bun');

                        setState({
                            ...state,
                            isLoading: false,
                            selectedBun: bun,
                            burgerComponents: data.data,
                            selectedComponents: componentsOnly,
                        })
                    } else {
                        throw new Error("Во время получения данных произошла ошибка");
                    }
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

    const onDelete = (e) => {
        console.log("delete");
        e.stopPropagation();
        // TODO: удаление
    };

    return (
        <div className={styles.app}>
            <AppHeader/>
            <main className={styles.mainContainer}>
                {state.hasError === true ? (<ErrorMessage />) :
                    (<article className={styles.constrictorContainer}>
                        <BurgerIngredients burgerComponents={state.burgerComponents}/>
                        {state.selectedBun && state.selectedComponents &&
                            (<BurgerConstructor burgerComponents={state.selectedComponents}
                                                onDelete={onDelete}
                                                selectedBun={state.selectedBun}/>)
                        }
                    </article>)}
                {/*Индикатор загрузки*/}
                {state.isLoading && (<div className={styles.spinner}></div>)}
            </main>
        </div>
    );
}

export default App;