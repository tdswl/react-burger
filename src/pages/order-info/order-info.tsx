import React from "react";
import styles from './order-info.module.css'
import OrderInfo from "../../components/order-info/order-info";

const OrderInfoPage = () => {
    return (
        <article className={styles.container}>
            <OrderInfo/>
        </article>
    )
}

export default OrderInfoPage;