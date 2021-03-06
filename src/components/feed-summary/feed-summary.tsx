import React from "react";
import styles from './feed-summary.module.css'
import {OrderStatus} from "../../utils/enums";
import {useAppSelector} from "../../services/hooks/hooks";

const FeedSummary = () => {
    const {feed} = useAppSelector(store => store.feed);

    return (
        <section className={styles.ingredientsContainer}>
            <div className={styles.ordersContainer}>
                <div>
                    <div className={styles.header}>Готовы:</div>
                    <ul className={styles.orderReady}>
                        {feed?.orders?.filter(a => a.status === OrderStatus.DONE).slice(0, 10).map((item) =>
                            (
                                <li key={item.number}>
                                    {item.number}
                                </li>
                            ))}
                    </ul>
                </div>
                <div>
                    <div className={styles.header}>В работе:</div>
                    <ul className={styles.ordersList}>
                        {feed?.orders?.filter(a => a.status !== OrderStatus.DONE).slice(0, 10).map((item) =>
                            (
                                <li key={item.number}>
                                    {item.number}
                                </li>
                            ))}
                    </ul>
                </div>

            </div>

            <div>
                <div className={styles.header}>Выполнено за всё время:</div>
                <div className={styles.summary}>{feed?.total}</div>
            </div>

            <div>
                <div className={styles.header}>Выполнено за сегодня:</div>
                <div className={styles.summary}>{feed?.totalToday}</div>
            </div>
        </section>
    )
}

export default FeedSummary;