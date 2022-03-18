import React from "react";
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import Summary from "./components/summary/summary";
import {addBun, addIngredient} from "../../services/actions/burger";
import {useDrop} from 'react-dnd';
import DraggableElement from "./components/draggable-element/draggable-element";
import {IngredientType} from "../../utils/enums";
import {IIngredient} from "../../services/types/burger";
import {useAppDispatch, useAppSelector} from "../../services/hooks/hooks";

const BurgerConstructor = () => {
    const dispatch = useAppDispatch();

    const {selectedBun, selectedIngredients} = useAppSelector(store => store.burger);

    const [{isHoverTop}, bunTopTarget] = useDrop({
        accept: IngredientType.BUN,
        collect: monitor => ({
            isHoverTop: monitor.isOver(),
        }),
        drop(item: IIngredient) {
            dispatch(addBun(item));
        },
    });

    const [{isHoverBottom}, bunBottomTarget] = useDrop({
        accept: IngredientType.BUN,
        collect: monitor => ({
            isHoverBottom: monitor.isOver(),
        }),
        drop(item: IIngredient) {
            dispatch(addBun(item));
        },
    });

    const [{isHoverIngredient}, ingredientTarget] = useDrop({
        accept: [IngredientType.SAUCE, IngredientType.MAIN],
        collect: monitor => ({
            isHoverIngredient: monitor.isOver(),
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
                {selectedIngredients && selectedIngredients.length > 0 ? selectedIngredients.map((component, index) =>
                        (
                            <DraggableElement key={component.key} component={component} index={index}/>
                        )
                    ) :
                    (
                        <div
                            className={isHoverIngredient ? styles.placeholderIngredientHover : styles.placeholderIngredient}>
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