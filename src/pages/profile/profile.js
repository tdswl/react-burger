import React from "react";
import styles from './profile.module.css'
import {Link, Outlet} from "react-router-dom";

const ProfilePage = () => {

    return (
        <article className={styles.container}>
            <section className={styles.panel}>
                <p className="text text_type_main-medium">
                    <Link to='/profile'>Профиль</Link>
                </p>
                <p className="text text_type_main-medium">
                    <Link to='/profile/history'>История заказов</Link>
                </p>
                <p className="text text_type_main-medium">
                    <Link to='/profile/logout'>Выход</Link>
                </p>

                <p className="text text_type_main-default text_color_inactive" style={{paddingTop: '56px'}}>
                    В этом разделе вы можете
                    <br/>
                    изменить свои персональные данные
                </p>
            </section>

            <section className={styles.panel}>
                <Outlet />
            </section>
        </article>
    )
}

export default ProfilePage;