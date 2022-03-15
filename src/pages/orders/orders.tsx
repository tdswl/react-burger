import React, {useEffect} from "react";
import styles from './orders.module.css'
import Feed from "../../components/feed/feed";
import {useDispatch} from "react-redux";
import {connectionStart} from "../../services/actions/feed";
import {getCookie} from "../../utils/cookie-helper";

const OrdersPage = () => {
    const dispatch = useDispatch();

    const token = getCookie('token');

    useEffect(
        () => {
            dispatch(connectionStart(token));
        },
        [dispatch, token]
    );

    return (
        <div className={styles.container}>
            <Feed/>
        </div>
    )
}

export default OrdersPage;