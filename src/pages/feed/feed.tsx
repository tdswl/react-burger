import React, {useEffect} from "react";
import styles from './feed.module.css'
import Feed from "../../components/feed/feed";
import FeedSummary from "../../components/feed-summary/feed-summary";
import {connectionStart} from "../../services/actions/feed";
import {useDispatch} from "react-redux";

const FeedPage = () => {
    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(connectionStart());
        },
        [dispatch]
    );

    return (
        <article className={styles.constrictorContainer}>
            <div>
                <h1 className={styles.pageHeader}>
                    Лента заказов
                </h1>
                <Feed/>
            </div>
            <FeedSummary/>
        </article>
    )
}

export default FeedPage;