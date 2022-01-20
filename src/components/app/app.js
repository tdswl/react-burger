import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from './app.module.css'
import {INGREDIENTS_ENDPOINT} from "../../utils/api-сonstants";
import ErrorMessage from "../error-message/error-message";
import {SelectedIngredientsContext} from '../../services/selected-ingredients-context';
import {SelectedBunContext} from '../../services/selected-bun-context';
import {v4} from "uuid";

const App = () => {
    const [ingredients, setIngredients] = React.useState([]);
    const [selectedBun, setSelectedBun] = React.useState(null);
    const [selectedIngredients, setSelectedIngredients] = React.useState([]);

    const [requestState, setRequestState] = React.useState({
        isLoading: false,
        hasError: false
    });

    React.useEffect(() => {
        const getComponents = async () => {
            setRequestState({hasError: false, isLoading: true});
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

                        // Небольшой костыль для выбора рандомных компонентов. Потом нужно удалить
                        let randomComp = [];
                        if (componentsOnly.length > 0) {
                            for (let i = 0; i < componentsOnly.length / 2; i++) {
                                let comp = componentsOnly[Math.floor(Math.random() * componentsOnly.length)];
                                // key - подсказали в чатике на случай добавления двух одинаковых компонентов
                                randomComp.push({...comp, key: v4()});
                            }
                        }

                        setIngredients(data.data);
                        setSelectedIngredients(randomComp);
                        setSelectedBun(bun)

                        setRequestState({hasError: false, isLoading: false});
                    } else {
                        throw new Error("Во время получения данных произошла ошибка");
                    }
                })
                .catch(e => {
                    setRequestState({hasError: true, isLoading: false});
                });
        }

        getComponents();
    }, [])

    return (
        <div className={styles.app}>
            <AppHeader/>
            <main className={styles.mainContainer}>
                {requestState.hasError === true ? (<ErrorMessage/>) :
                    (
                        <article className={styles.constrictorContainer}>
                            <SelectedBunContext.Provider value={{selectedBun, setSelectedBun}}>
                                <SelectedIngredientsContext.Provider value={{selectedIngredients, setSelectedIngredients}}>
                                    <BurgerIngredients burgerComponents={ingredients}/>
                                    <BurgerConstructor/>
                                </SelectedIngredientsContext.Provider>
                            </SelectedBunContext.Provider>
                        </article>
                    )}
                {/*Индикатор загрузки*/}
                {requestState.isLoading && (<div className={styles.spinner}></div>)}
            </main>
        </div>
    );
}

export default App;