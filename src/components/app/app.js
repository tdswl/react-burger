import React from 'react';
import AppHeader from "../app-header/app-header";
import styles from './app.module.css'
import {Outlet} from "react-router-dom";

const App = () => {
    return (
        <div className={styles.app}>
            <AppHeader/>
            <main className={styles.mainContainer}>
                <Outlet />
            </main>
        </div>
    );
}

export default App;