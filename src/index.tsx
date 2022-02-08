import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import thunk from 'redux-thunk';
import {Provider} from "react-redux";
import {rootReducer} from "./services/reducers/root";
import {configureStore} from '@reduxjs/toolkit'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {
    ConstructorPage,
    ProfilePage,
    LoginPage,
    IngredientPage,
    ResetPasswordPage,
    ForgotPasswordPage,
    RegisterPage,
    SecurityPage
} from './pages'
import RequireAuth from "./components/require-auth/require-auth";

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== 'production',
})

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App/>}>
                        <Route path="login" element={<LoginPage/>}/>
                        <Route path="register" element={<RegisterPage/>}/>
                        <Route path="forgot-password" element={<ForgotPasswordPage/>}/>
                        <Route path="reset-password" element={<ResetPasswordPage/>}/>
                        <Route element={<RequireAuth/>}>
                            <Route index element={<ConstructorPage/>}/>
                            <Route path="history" element={<p>Тут пока ничего нет</p>}/>
                            <Route path="profile" element={<ProfilePage/>}>
                                <Route index element={<SecurityPage/>}/>
                                <Route path="orders" element={<p>Тут пока ничего нет</p>}/>
                                <Route path="logout" element={<p>И тут ничего нет</p>}/>
                            </Route>
                            <Route path="ingredients/:id" element={<IngredientPage/>}/>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
