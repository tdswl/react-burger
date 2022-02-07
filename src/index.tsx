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
import ConstructorPage from "./pages/constructor/constructor";
import ProfilePage from "./pages/profile/profile";
import LoginPage from "./pages/login/login";
import IngredientPage from "./pages/ingredients/ingredient";
import ResetPasswordPage from "./pages/reset-password/reset-password";
import ForgotPasswordPage from "./pages/forgot-password/forgot-password";
import RegisterPage from "./pages/register/register";
import SecurityPage from "./pages/profile/security";

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
                        <Route path="/" element={<ConstructorPage/>}/>
                        <Route path="/history" element={<ConstructorPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
                        <Route path="/reset-password" element={<ResetPasswordPage/>}/>
                        <Route path="/profile" element={<ProfilePage/>}>
                            <Route path="/profile" element={<SecurityPage/>}/>
                            <Route path="/profile/history" element={<ConstructorPage/>}/>
                            <Route path="/profile/logout" element={<ConstructorPage/>}/>
                        </Route>
                        <Route path="/ingredients/:id" element={<IngredientPage/>}/>
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
