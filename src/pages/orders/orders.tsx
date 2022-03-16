import React, {useEffect} from "react";
import styles from './orders.module.css'
import Feed from "../../components/feed/feed";
import {useDispatch, useSelector} from "react-redux";
import {connectionClose, connectionStart} from "../../services/actions/feed";
import {getCookie} from "../../utils/cookie-helper";
import {useLocation, useNavigate} from "react-router-dom";
import {ILocationState, IRootState} from "../../services/types/types";
import {fetchIngredients} from "../../services/actions/burger";

const OrdersPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const {feed} = useSelector((store: IRootState) => store.feed);
    const {ingredients, ingredientsRequest} = useSelector((store: IRootState) => store.burger);

    useEffect(
        () => {
            const token = getCookie('token');
            dispatch(connectionStart(token));

            return () => {
                dispatch(connectionClose());
            }
        },
        [dispatch]
    );

    useEffect(() => {
        const locationState = location.state as ILocationState;
        // Если не модалка и нет ингридиентов, то надо бы запросить. Непонятно, есть ли роут для получение одного ингридиента
        if (!locationState?.modal && (!ingredients || ingredients.length === 0) && !ingredientsRequest) {
            dispatch(fetchIngredients())
        }
    }, [dispatch, location, ingredients, ingredientsRequest])

    const onOrderClick = (id: number) => {
        if (id) {
            navigate(`/profile/orders/${id}`, {state: {background: location}})
        }
    };

    return (
        <div className={styles.container}>
            <Feed orders={feed?.orders} onClick={onOrderClick}/>

            {/*Индикатор загрузки*/}
            {(ingredientsRequest || !feed) && (<div className="spinner"></div>)}
        </div>

    )
}

export default OrdersPage;