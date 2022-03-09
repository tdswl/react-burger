import React, {FC} from "react";
import styles from './order-details.module.css'
import {ReactComponent as DoneImg} from "../../images/done.svg";
import {IOrder} from "../../utils/types";

const OrderDetails : FC<{order: IOrder}> = ({order}) => {
    return (
        <section className={styles.content}>
            <p className={styles.number}>{order.number}</p>
            <p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
            <div className='mt-15'>
                <DoneImg/>
            </div>
            <p className='text text_type_main-default mt-15'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive mt-2 mb-20'>
                Дождитесь готовности на орбитальной станции
            </p>
        </section>
    )
}

export default OrderDetails;
