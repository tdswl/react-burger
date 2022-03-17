import React, {useEffect} from "react";
import styles from './orders.module.css'
import Feed from "../../components/feed/feed";
import {useDispatch, useSelector} from "react-redux";
import {connectionClose, connectionStart} from "../../services/actions/feed";
import {getCookie} from "../../utils/cookie-helper";
import {useLocation, useNavigate} from "react-router-dom";
import {IRootState} from "../../services/types/types";
import {useIngredients} from "../../utils/use-ingredients";

const OrdersPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const {feed} = useSelector((store: IRootState) => store.feed);
    const {isIngredientsLoaded} = useIngredients();

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