import React from 'react';
import AppHeader from "../app-header/app-header";
import styles from './app.module.css'
import ProtectedRoute from "../require-auth/protected-route";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {
    ConstructorPage,
    ProfilePage,
    LoginPage,
    IngredientPage,
    ResetPasswordPage,
    ForgotPasswordPage,
    RegisterPage
} from '../../pages'
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {selectIngredient} from "../../services/actions/burger";
import {useDispatch} from "react-redux";
import {
    INDEX_ROUTE,
    LOGIN_ROUTE,
    REGISTER_ROUTE,
    FORGOT_ROUTE,
    RESET_ROUTE,
    INGREDIENT_ROUTE,
    HISTORY_ROUTE,
    PROFILE_ROUTE,
    ORDERS_ROUTE,
    ORDER_ROUTE
} from "../../utils/routes";
import {fetchGetUser} from "../../services/actions/auth";
import UserProfile from "../user-profile/user-profile";
import {ILocationState} from "../../utils/types";

const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const locationState = location.state as ILocationState;
    const navigate = useNavigate();

    const onCloseIngredientModal = () => {
        dispatch(selectIngredient(null));
        navigate(-1);
    };

    React.useEffect(() => {
        dispatch(fetchGetUser())
    }, [dispatch])

    return (
        <div className={styles.app}>
            <AppHeader/>
            <main className={styles.mainContainer}>
                <Routes location={locationState?.background || location}>
                    <Route path={INDEX_ROUTE}>
                        <Route index element={<ConstructorPage/>}/>
                        <Route path={LOGIN_ROUTE} element={<LoginPage/>}/>
                        <Route path={REGISTER_ROUTE} element={<RegisterPage/>}/>
                        <Route path={FORGOT_ROUTE} element={<ForgotPasswordPage/>}/>
                        <Route path={RESET_ROUTE} element={<ResetPasswordPage/>}/>
                        <Route path={INGREDIENT_ROUTE} element={<IngredientPage/>}/>
                        <Route element={<ProtectedRoute/>}>
                            <Route path={HISTORY_ROUTE} element={<p>Тут пока ничего нет</p>}/>
                            <Route path={PROFILE_ROUTE} element={<ProfilePage/>}>
                                <Route index element={<UserProfile/>}/>
                                <Route path={ORDERS_ROUTE} element={<p>Тут пока ничего нет</p>}/>
                            </Route>
                            <Route path={ORDER_ROUTE} element={<p>Тут пока ничего нет</p>}/>
                        </Route>
                    </Route>
                </Routes>

                {/*Модалка для клика по ингредиенту*/}
                {locationState?.background && (
                    <Routes>
                        <Route path={INGREDIENT_ROUTE} element={
                            (<Modal onClose={onCloseIngredientModal} header='Детали ингредиента'>
                                <IngredientDetails/>
                            </Modal>)
                        }/>
                    </Routes>
                )}
            </main>
        </div>
    );
}

export default App;