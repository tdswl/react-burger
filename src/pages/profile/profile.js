import React from "react";
import styles from './profile.module.css'
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {LOGOUT_ROUTE, ORDERS_ROUTE} from "../../utils/routes";
import {useDispatch} from "react-redux";
import {fetchLogout} from "../../services/actions/auth";

const ProfilePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(fetchLogout(() => navigate({LOGOUT_ROUTE})));
    }

    return (
        <article className={styles.container}>
            <section className={styles.panel}>
                <NavLink end className={({isActive}) => isActive ? styles.link : styles.inactiveLink}
                         to=''>Профиль</NavLink>
                <NavLink className={({isActive}) => isActive ? styles.link : styles.inactiveLink} to={ORDERS_ROUTE}>История
                    заказов</NavLink>
                <NavLink className={({isActive}) => isActive ? styles.link : styles.inactiveLink} to={LOGOUT_ROUTE}
                         onClick={onLogout}>Выход</NavLink>

                <p className="text text_type_main-default text_color_inactive" style={{paddingTop: '56px'}}>
                    В этом разделе вы можете
                    <br/>
                    изменить свои персональные данные
                </p>
            </section>

            <section className={styles.panel}>
                <Outlet/>
            </section>
        </article>
    )
}

export default ProfilePage;