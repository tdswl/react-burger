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

    const [{isHoverTop}, bunTopTarget] = useDrop({
        accept: "bun",
        collect: monitor => ({
            isHoverTop: monitor.isOver(),
            canDropBun: monitor.canDrop(),
        }),
        drop(item) {
            dispatch(addBun(item));
        },
    });

    const [{isHoverBottom}, bunBottomTarget] = useDrop({
        accept: "bun",
        collect: monitor => ({
            isHoverBottom: monitor.isOver(),
            canDropBun: monitor.canDrop(),
        }),
        drop(item) {
            dispatch(addBun(item));
        },
    });

    const [{isHoverIngredient}, ingredientTarget] = useDrop({
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
            <div className={styles.topBun} ref={bunTopTarget}>
                {selectedBun ? (
                        <ConstructorElement
                            isLocked={true}
                            type='top'
                            text={`${selectedBun.name} (верх)`}
                            price={selectedBun.price}
                            thumbnail={selectedBun.image}/>
                    ) :
                    (
                        <div className={isHoverTop ? styles.placeholderHover : styles.placeholder}>
                            Положите булку сюда
                        </div>
                    )}
            </div>

            <ul className={styles.list} ref={ingredientTarget}>
                {selectedIngredients && selectedIngredients.length > 0 ? selectedIngredients.map((component) =>
                        (
                            <li key={component.key}>
                                <DragIcon type="primary"/>
                                <ConstructorElement
                                    text={component.name}
                                    price={component.price}
                                    thumbnail={component.image}
                                    handleClose={(e) => onDelete(e, component)}/>
                            </li>
                        )) :
                    (
                        <div className={isHoverIngredient ? styles.placeholderIngredientHover : styles.placeholderIngredient}>
                            Положите ингредиенты сюда
                        </div>
                    )
                }
            </ul>

            <div className={styles.bottomBun} ref={bunBottomTarget}>
                {selectedBun ? (<ConstructorElement
                            isLocked={true}
                            type='bottom'
                            text={`${selectedBun.name} (низ)`}
                            price={selectedBun.price}
                            thumbnail={selectedBun.image}/>
                    ) :
                    (
                        <div className={isHoverBottom ? styles.placeholderHover : styles.placeholder}>
                            Положите булку сюда
                        </div>
                    )}
            </div>

            <Summary/>
        </article>
    )
}
export default BurgerConstructor;