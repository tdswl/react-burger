import React, {useEffect} from "react";
import styles from './feed.module.css'
import Feed from "../../components/feed/feed";
import FeedSummary from "../../components/feed-summary/feed-summary";
import {connectionClose, connectionStart} from "../../services/actions/feed";
import {useLocation, useNavigate} from "react-router-dom";
import {useIngredients} from "../../services/hooks/use-ingredients";
import {useAppDispatch, useAppSelector} from "../../services/hooks/hooks";
import {WS_ORDERS} from "../../utils/api-сonstants";

const FeedPage = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const {feed} = useAppSelector(store => store.feed);
    const {isIngredientsLoaded} = useIngredients();

    useEffect(
        () => {
            dispatch(connectionStart(`${WS_ORDERS}/all`));

            return () => {
                dispatch(connectionClose());
            }
        },
        [dispatch]
    );


    const onOrderClick = (id: number) => {
        if (id) {
            navigate(`/feed/${id}`, {state: {background: location}})
        }
    };

    return (
        <article className={styles.constrictorContainer}>
            <div>
                <h1 className={styles.pageHeader}>
                    Лента заказов
                </h1>
                <Feed orders={feed?.orders} onClick={onOrderClick}/>
            </div>
            <FeedSummary/>

            {/*Индикатор загрузки*/}
            {(!isIngredientsLoaded || !feed) && (<div className="spinner"></div>)}
        </article>
    )
}

export default FeedPage;