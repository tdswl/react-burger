import React, {FC} from "react";
import styles from './feed-order.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IOrder, ISelectedIngredient} from "../../../../services/types/burger";
import {useSelector} from "react-redux";
import {IRootState} from "../../../../services/types/types";
import moment from "moment-ru";
import {v4} from "uuid";
import {OrderStatusTranslate} from "../../../../utils/helpers";
import {OrderStatus} from "../../../../utils/enums";

const FeedOrder: FC<{ order: IOrder }> = ({order}) => {
    const {ingredients} = useSelector((store: IRootState) => store.burger);

    const orderIngredients = React.useMemo(
        () => {
            let result = new Array<ISelectedIngredient>();

            order.ingredients?.forEach(value => {
                if (value) {
                    result.push({key: v4(), ...ingredients.find(a => a._id === value)} as ISelectedIngredient);
                }
            });

            return result;
        },
        [order, ingredients]
    );

    const totalPrice = React.useMemo(
        () => {
            if (orderIngredients && orderIngredients.length > 0) {
                return orderIngredients.reduce((x, obj) => x + obj.price, 0);
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
            {order.status && (
                <p className={order.status === OrderStatus.DONE ? styles.statusDone : styles.status}>{OrderStatusTranslate.get(order.status)}</p>
            )}
            <section className={styles.footer}>
                <ul className={styles.ingredientsList}>
                    {orderIngredients.length > 6 &&
                        (
                            <li className={styles.imageBorder}>
                                <div className={styles.additional}>+{orderIngredients.length - 5}</div>
                            </li>
                        )
                    }
                    {orderIngredients?.slice(0, orderIngredients.length > 6 ? 5 : 6).map((item) =>
                        (
                            <li className={styles.imageBorder} key={item.key}>
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