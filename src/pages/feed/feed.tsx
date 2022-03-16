import React, {useEffect} from "react";
import styles from './feed.module.css'
import Feed from "../../components/feed/feed";
import FeedSummary from "../../components/feed-summary/feed-summary";
import {connectionClose, connectionStart} from "../../services/actions/feed";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {ILocationState, IRootState} from "../../services/types/types";
import {fetchIngredients} from "../../services/actions/burger";

const FeedPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const {feed} = useSelector((store: IRootState) => store.feed);
    const {ingredients, ingredientsRequest} = useSelector((store: IRootState) => store.burger);

    useEffect(
        () => {
            dispatch(connectionStart());

            return () => {
                dispatch(connectionClose());
            }
        },
        [dispatch]
    );

    React.useEffect(() => {
        const locationState = location.state as ILocationState;
        // Если не модалка и нет ингридиентов, то надо бы запросить. Непонятно, есть ли роут для получение одного ингридиента
        if (!locationState?.modal && (!ingredients || ingredients.length === 0) && !ingredientsRequest) {
            dispatch(fetchIngredients())
        }
    }, [dispatch, location, ingredients, ingredientsRequest])

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
            {(ingredientsRequest || !feed) && (<div className="spinner"></div>)}
        </article>
    )
}

export default FeedPage;