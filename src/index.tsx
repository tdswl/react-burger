import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import thunk from 'redux-thunk';
import {Provider} from "react-redux";
import {rootReducer} from "./services/reducers/root";
import {configureStore} from '@reduxjs/toolkit'
import {BrowserRouter} from "react-router-dom";
import {feedMiddleware} from "./services/middlewares/feed-middleware";

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk, feedMiddleware],
    devTools: process.env.NODE_ENV !== 'production',
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
