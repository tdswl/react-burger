import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from './app.module.css'
import {ingredientsAddress} from "../../utils/api-сonstants";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

const App = () => {
    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        burgerComponents: [],
        selectedComponents: [],
        selectedBun: null
    });

    const [ingredientDetailsIsOpen, setIngredientDetailsIsOpen] = React.useState(false);
    const [selectedIngredient, setSelectedIngredient] = React.useState({});

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
                        selectedBun: bun,
                        burgerComponents: data.data,
                        selectedComponents: componentsOnly,
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

    const onDelete = (e) => {
        console.log("delete");
        e.stopPropagation();
        // TODO: удаление
    };

    const onIngredientClick = (ingredient) => {
        console.log("Открыть ингридиент");
        setIngredientDetailsIsOpen(true);
        setSelectedIngredient(ingredient);
    };

    const onCloseIngredientModal = (e) => {
        console.log("Закрыть ингридиент");
        e.stopPropagation();
        setIngredientDetailsIsOpen(false);
    };

    return (
        <div className={styles.app}>
            <AppHeader/>
            <main className={styles.mainContainer}>
                <article className={styles.constrictorContainer}>
                    <BurgerIngredients burgerComponents={state.burgerComponents}
                                       onIngredientClick={onIngredientClick} />
                    {state.selectedBun && state.selectedComponents &&
                        <BurgerConstructor burgerComponents={state.selectedComponents}
                                           onDelete={onDelete}
                                           onIngredientClick={onIngredientClick}
                                           selectedBun={state.selectedBun}/>
                    }
                </article>
            </main>

            {/*Модалка для клика по ингридиенту*/}
            {ingredientDetailsIsOpen &&
                <Modal onClose={onCloseIngredientModal} header='Детали ингридиента'>
                    <IngredientDetails item={selectedIngredient}/>
                </Modal>}
        </div>
    );
}

export default App;