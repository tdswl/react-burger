import React from "react";
import styles from './order-details.module.css'
import {ReactComponent as DoneImg} from "../../images/done.svg";

const OrderDetails = () => {
    const number = Math.floor(Math.random() * 1000000);

    return (
        <section className={styles.content}>
            <p className='text text_type_digits-large'>{number}</p>
            <p className='text text_type_main-default'>идентификатор заказа</p>
            <DoneImg />
            <p className='text text_type_main-medium'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-medium text_color_inactive'>
                Дождитесь готовности на орбитальной станции
            </p>
        </section>
    )
}

export default OrderDetails;