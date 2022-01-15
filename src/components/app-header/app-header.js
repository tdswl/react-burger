import React from "react";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'

const AppHeader = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <a className={styles.link}>
                    <BurgerIcon type="primary"/>
                    <p className={styles.label}>Конструктор</p>
                </a>
                <a className={styles.link}>
                    <ListIcon type="secondary"/>
                    <p className={styles.label_inactive}>Лента заказов</p>
                </a>
                <a className={styles.login}>
                    <ProfileIcon type="secondary"/>
                    <p className={styles.label_inactive}>Личный кабинет</p>
                </a>
            </nav>
            <Logo />
        </header>
    )
}

export default AppHeader;