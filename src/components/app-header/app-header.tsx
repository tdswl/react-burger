import React from "react";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'
import {NavLink, Link} from "react-router-dom";
import {INDEX_ROUTE, FEEDS_ROUTE, PROFILE_ROUTE} from "../../utils/routes";
import {useAppSelector} from "../../services/hooks";

const AppHeader = () => {
    const {user} = useAppSelector(store => store.auth);

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <NavLink className={styles.link} to={INDEX_ROUTE}
                         children={({isActive}) =>
                             (<>
                                 <BurgerIcon type={isActive ? 'primary' : 'secondary'}/>
                                 <p className={isActive ? styles.label : styles.label_inactive}>Конструктор</p>
                             </>)}/>
                <NavLink className={styles.link} to={FEEDS_ROUTE}
                         children={({isActive}) =>
                             (<>
                                 <ListIcon type={isActive ? 'primary' : 'secondary'}/>
                                 <p className={isActive ? styles.label : styles.label_inactive}>Лента заказов</p>
                             </>)}/>
                <NavLink className={styles.login} to={PROFILE_ROUTE}
                         children={({isActive}) =>
                             (<>
                                 <ProfileIcon type={isActive ? 'primary' : 'secondary'}/>
                                 <p className={isActive ? styles.label : styles.label_inactive}>{user ? user.name : 'Личный кабинет'}</p>
                             </>)}/>
            </nav>
            <Link className={styles.logo} to={INDEX_ROUTE}>
                <Logo/>
            </Link>
        </header>
    )
}

export default AppHeader;