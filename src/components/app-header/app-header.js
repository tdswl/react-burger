import React from "react";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'
import {NavLink} from "react-router-dom";

const AppHeader = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <NavLink className={styles.link} to='/'
                         children={({isActive}) =>
                             (<>
                                 <BurgerIcon type={isActive ? 'primary' : 'secondary'}/>
                                 <p className={isActive ? styles.label : styles.label_inactive}>Конструктор</p>
                             </>)}>
                </NavLink>
                <NavLink className={styles.link} to='/history'
                         children={({isActive}) =>
                             (<>
                                 <ListIcon type={isActive ? 'primary' : 'secondary'}/>
                                 <p className={isActive ? styles.label : styles.label_inactive}>Лента заказов</p>
                             </>)}>
                </NavLink>
                <NavLink className={styles.login} to='/profile'
                         children={({isActive}) =>
                             (<>
                                 <ProfileIcon type={isActive ? 'primary' : 'secondary'}/>
                                 <p className={isActive ? styles.label : styles.label_inactive}>Личный кабинет</p>
                             </>)}>
                </NavLink>
            </nav>
            <Logo/>
        </header>
    )
}

export default AppHeader;