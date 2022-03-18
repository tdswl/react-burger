import React, {FC, MouseEventHandler} from "react";
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient.module.css'
import {useDrag} from 'react-dnd';
import {IIngredient} from "../../../../services/types/burger";
import {useAppSelector} from "../../../../services/hooks/hooks";

const Ingredient: FC<{ item: IIngredient, onClick: MouseEventHandler<HTMLElement> }> = ({item, onClick}) => {
    const {selectedIngredients, selectedBun} = useAppSelector(store => store.burger);

    // Подсчет всех выбранных ингредиентов с тем же id
    const counter = React.useMemo(
        () => {
            if (selectedBun?._id === item._id) {
                return 2;
            }
            return selectedIngredients.filter(x => x._id === item._id).length;
        },
        [selectedIngredients, selectedBun, item]
    );

    const [{opacity}, ref] = useDrag({
        type: item.type,
        item,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    return (
        <section className={styles.ingredientContainer} onClick={onClick} ref={ref} style={{opacity}}>
            <img className={styles.image} alt={item.name} src={item.image}/>
            {counter > 0 && (<Counter count={counter} size="default"/>)}
            <p className={styles.price}>
                {item.price}
                <CurrencyIcon type="primary"/>
            </p>
            <p className={styles.name}>{item.name}</p>
        </section>
    )
}

export default Ingredient;