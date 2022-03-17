import React, {useEffect} from "react";
import styles from './feed.module.css'
import Feed from "../../components/feed/feed";
import FeedSummary from "../../components/feed-summary/feed-summary";
import {connectionClose, connectionStart} from "../../services/actions/feed";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {IRootState} from "../../services/types/types";
import {useIngredientsStatus} from "../../utils/use-ingredient";

const FeedPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const {feed} = useSelector((store: IRootState) => store.feed);
    const {isIngredientLoaded} = useIngredientsStatus();

    useEffect(
        () => {
            dispatch(connectionStart());

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
            {(!isIngredientLoaded || !feed) && (<div className="spinner"></div>)}
        </article>
    )
}

export default FeedPage;