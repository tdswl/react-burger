import React from "react";
import styles from './profile.module.css'
import {Link, NavLink, Outlet} from "react-router-dom";

const ProfilePage = () => {

    return (
        <article className={styles.container}>
            <section className={styles.panel}>
                <NavLink className={({ isActive }) => isActive ? styles.link : styles.inactiveLink} to=''>Профиль</NavLink>
                <NavLink className={({ isActive }) => isActive ? styles.link : styles.inactiveLink} to='orders'>История заказов</NavLink>
                <NavLink className={({ isActive }) => isActive ? styles.link : styles.inactiveLink} to='logout'>Выход</NavLink>

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