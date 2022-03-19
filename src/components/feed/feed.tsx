import React, {FC} from "react";
import styles from './feed.module.css'
import FeedOrder from "./components/feed-order/feed-order";
import {IOrder} from "../../services/types/burger";

const Feed: FC<{ orders: Array<IOrder> | undefined, onClick(id: number): void }> = ({orders, onClick}) => {
    return (
        <section className={styles.ingredientsContainer}>
            {orders &&
                (
                    <article className={styles.scrollableContainer}>
                        <ul className={styles.ingredientsList}>
                            {orders?.map((item) =>
                                (
                                    <li key={item.number} onClick={() => onClick(item.number)}>
                                        <FeedOrder order={item}/>
                                    </li>
                                ))}
                        </ul>
                    </article>
                )}
        </section>
    )
}

export default Feed;