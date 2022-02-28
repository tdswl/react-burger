import React from 'react';
import styles from "./error-message.module.css";

const ErrorMessage = () => {
    return (
        <section className={styles.error}>
            <h1>Что-то пошло не так :(</h1>
            <p>
                В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
            </p>
        </section>
    );
}

export default ErrorMessage;