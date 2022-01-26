import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import thunk from 'redux-thunk';
import {Provider} from "react-redux";
import {root} from "./services/reducers/root";
import {configureStore} from '@reduxjs/toolkit'

const store = configureStore({
    reducer: root,
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== 'production',
})

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
