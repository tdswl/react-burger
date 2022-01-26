import React from "react";
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import Summary from "./components/summary/summary";
import {useDispatch, useSelector} from "react-redux";
import {addBun, addIngredient, removeIngredient} from "../../services/actions/burger";
import {useDrop} from 'react-dnd';

const BurgerConstructor = () => {
    const dispatch = useDispatch();

    const {selectedBun, selectedIngredients} = useSelector(store => store.burger);

    const onDelete = (e, ingredient) => {
        e.stopPropagation();
        dispatch(removeIngredient(ingredient));
    };

    const [, bunTarget] = useDrop({
        accept: "bun",
        collect: monitor => ({
            isHoverBun: monitor.isOver(),
            canDropBun: monitor.canDrop(),
        }),
        drop(item) {
            dispatch(addBun(item));
        },
    });

    const [, ingredientTarget] = useDrop({
        accept: ["sauce", "main"],
        collect: monitor => ({
            isHoverIngredient: monitor.isOver(),
            canDropIngredient: monitor.canDrop(),
        }),
        drop(item) {
            dispatch(addIngredient(item));
        },
    });

    return (
        <article className={styles.ingredientsContainer}>
            <div className={styles.topBun} ref={bunTarget}>{selectedBun && (
                <ConstructorElement
                    isLocked={true}
                    type='top'
                    text={`${selectedBun.name} (верх)`}
                    price={selectedBun.price}
                    thumbnail={selectedBun.image}/>
            )}
            </div>

            <ul className={styles.list} ref={ingredientTarget}>
                {selectedIngredients && selectedIngredients.map((component) =>
                    (
                        <li key={component.key}>
                            <DragIcon type="primary"/>
                            <ConstructorElement
                                text={component.name}
                                price={component.price}
                                thumbnail={component.image}
                                handleClose={(e) => onDelete(e, component)}/>
                        </li>
                    ))}
            </ul>

            <div className={styles.bottomBun} ref={bunTarget}>
                {selectedBun && (
                    <ConstructorElement
                        isLocked={true}
                        type='bottom'
                        text={`${selectedBun.name} (низ)`}
                        price={selectedBun.price}
                        thumbnail={selectedBun.image}/>
                )}  </div>

            <Summary/>
        </article>
    )
}
export default BurgerConstructor;