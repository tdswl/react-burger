import React, {useEffect} from "react";
import styles from './orders.module.css'
import Feed from "../../components/feed/feed";
import {connectionClose, connectionStart} from "../../services/actions/feed";
import {getCookie} from "../../utils/cookie-helper";
import {useLocation, useNavigate} from "react-router-dom";
import {useIngredients} from "../../services/hooks/use-ingredients";
import {useAppDispatch, useAppSelector} from "../../services/hooks/hooks";
import {WS_ORDERS} from "../../utils/api-сonstants";

const OrdersPage = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const {feed} = useAppSelector(store => store.feed);
    const {isIngredientsLoaded} = useIngredients();

    useEffect(
        () => {
            const token = getCookie('token');
            dispatch(connectionStart(`${WS_ORDERS}?token=${token}`));

            return () => {
                dispatch(connectionClose());
            }
        },
        [dispatch]
    );

    const onOrderClick = (id: number) => {
        if (id) {
            navigate(`/profile/orders/${id}`, {state: {background: location}})
        }
    };

    return (
        <div className={styles.container}>
            <Feed orders={feed?.orders} onClick={onOrderClick}/>

            {/*Индикатор загрузки*/}
            {(!isIngredientsLoaded || !feed) && (<div className="spinner"></div>)}
        </div>

    )
}

export default OrdersPage;