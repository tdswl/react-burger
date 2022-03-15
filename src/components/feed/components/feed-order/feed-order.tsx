import React, {FC} from "react";
import styles from './feed-order.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IOrder} from "../../../../services/types/burger";
import {useSelector} from "react-redux";
import {IRootState} from "../../../../services/types/types";
import moment from "moment-ru";

const FeedOrder: FC<{ order: IOrder }> = ({order}) => {
    const {ingredients} = useSelector((store: IRootState) => store.burger);

    const orderIngredients = React.useMemo(
        () => {
            return ingredients.filter(({_id}) => order.ingredients?.includes(_id));
        },
        [order, ingredients]
    );

    const totalPrice = React.useMemo(
        () => {
            if (orderIngredients && orderIngredients.length > 0) {
                return orderIngredients.reduce((x, obj) => x + obj.price, 0)
            }

            return 0;
        },
        [orderIngredients]
    );

    return (
        <article className={styles.container}>
            <section className={styles.header}>
                <div className={styles.number}>#{order.number}</div>
                <div className={styles.date}>{moment(order.createdAt).locale('ru').calendar()}</div>
            </section>
            <section className={styles.name}>{order.name}</section>
            <section className={styles.footer}>
                <ul className={styles.ingredientsList}>
                    {orderIngredients.length > 6 &&
                        (
                            <li className={styles.imageBorder}>
                                <div className={styles.additional}>+{orderIngredients.length - 5}</div>
                            </li>
                        )
                    }
                    {orderIngredients?.slice(0, orderIngredients.length > 6 ? 5 : 6).map((item, index) =>
                        (
                            <li className={styles.imageBorder} key={index}>
                                <img className={styles.image} alt={item.name} src={item.image_mobile}/>
                            </li>
                        ))}
                </ul>
                <div className={styles.price}>
                    {totalPrice}
                    <CurrencyIcon type="primary"/>
                </div>
            </section>
        </article>
    )
}

export default FeedOrder;