import React from "react";
import styles from './feed-summary.module.css'
import {useSelector} from "react-redux";
import {IRootState} from "../../services/types/types";
import {OrderStatus} from "../../utils/enums";

const FeedSummary = () => {
    const {feed} = useSelector((store: IRootState) => store.feed);

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