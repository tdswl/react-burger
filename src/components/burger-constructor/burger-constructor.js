import React from "react";
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import Summary from "./components/summary/summary";
import {useDispatch, useSelector} from "react-redux";
import {remove} from "../../services/actions/constructor";

const BurgerConstructor = () => {
    const dispatch = useDispatch();

    const { selectedBun, selectedIngredients } = useSelector(store => store.constructor);

    const onDelete = (e, key) => {
        console.log(`delete ${key}`);
        e.stopPropagation();
        dispatch(remove(key));
    };

    return (
        <article className={styles.ingredientsContainer}>
            {selectedBun && (
                <div className={styles.topBun}>
                    <ConstructorElement
                        isLocked={true}
                        type='top'
                        text={`${selectedBun.name} (верх)`}
                        price={selectedBun.price}
                        thumbnail={selectedBun.image}/>
                </div>
            )}

            <ul className={styles.list}>
                {selectedIngredients && selectedIngredients.map((component) =>
                    (
                        <li key={component.key}>
                            <DragIcon type="primary"/>
                            <ConstructorElement
                                text={component.name}
                                price={component.price}
                                thumbnail={component.image}
                                handleClose={(e) => onDelete(e, component.key)}/>
                        </li>
                    ))}
            </ul>

            {selectedBun && (
                <div className={styles.bottomBun}>
                    <ConstructorElement
                        isLocked={true}
                        type='bottom'
                        text={`${selectedBun.name} (низ)`}
                        price={selectedBun.price}
                        thumbnail={selectedBun.image}/>
                </div>
            )}

            <Summary/>
        </article>
    )
}
export default BurgerConstructor;