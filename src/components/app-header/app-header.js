import React from "react";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'
import {NavLink} from "react-router-dom";

const AppHeader = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <NavLink className={({ isActive }) => isActive ? styles.activeLink : styles.link} to='/'>
                    <BurgerIcon type="primary"/>
                    <p className={styles.label}>Конструктор</p>
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? styles.activeLink : styles.link} to='/history' >
                    <ListIcon type="secondary"/>
                    <p className={styles.label_inactive}>Лента заказов</p>
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? styles.activeLogin : styles.login} to='/profile'>
                    <ProfileIcon type="secondary"/>
                    <p className={styles.label_inactive}>Личный кабинет</p>
                </NavLink>
            </nav>
            <Logo />
        </header>
    )
}

export default AppHeader;