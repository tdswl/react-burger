import React from "react";
import {BurgerIcon, ListIcon, Logo, ProfileIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'

class AppHeader extends React.Component {
    render() {
        return (
            <header className={styles.header}>
                <nav className={styles.navbar}>
                    <Button type="secondary" size="medium">
                        <BurgerIcon type="primary"/>
                        <p className={styles.label}>Конструктор</p>
                    </Button>
                    <Button type="secondary" size="medium">
                        <ListIcon type="secondary"/>
                        <p className={styles.label_inactive}>Лента заказов</p>
                    </Button>
                    <Logo/>
                    <Button type="secondary" size="medium">
                        <ProfileIcon type="secondary"/>
                        <p className={styles.label_inactive}>Личный кабинет</p>
                    </Button>
                </nav>
            </header>
        )
    }
}

export default AppHeader;