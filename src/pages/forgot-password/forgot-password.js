import React from "react";
import styles from './forgot-password.module.css'
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

const ForgotPasswordPage = () => {
    const [email, setEmail] = React.useState('')
    const onEmailChange = e => {
        setEmail(e.target.value)
    }

    return (
        <article className={styles.container}>
            <p className="text text_type_main-medium">
                Восстановление пароля
            </p>
            <EmailInput onChange={onEmailChange} value={email} name={'email'} />
            <Button type="primary" size="medium">
                Восстановить
            </Button>
            <p className="text text_type_main-default text_color_inactive" style={{paddingTop: '56px'}}>
                Вспомнили пароль?&nbsp;
                <Link to='/login'>Войти</Link>
            </p>
        </article>
    )
}

export default ForgotPasswordPage;