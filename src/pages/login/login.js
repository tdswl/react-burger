import React from "react";
import styles from './login.module.css'
import {EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link} from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = React.useState('')
    const onEmailChange = e => {
        setEmail(e.target.value)
    }

    const [password, setPassword] = React.useState('')
    const onPasswordChange = e => {
        setPassword(e.target.value)
    }

    return (
        <article className={styles.container}>
            <p className="text text_type_main-medium">
                Вход
            </p>
            <EmailInput onChange={onEmailChange} value={email} name={'email'} />
            <PasswordInput onChange={onPasswordChange} value={password} name={'password'} />
            <Button type="primary" size="medium">
                Войти
            </Button>
            <p className="text text_type_main-default text_color_inactive" style={{paddingTop: '56px'}}>
                Вы — новый пользователь?&nbsp;
                <Link to='/register'>Зарегистрироваться</Link>
            </p>
            <p className="text text_type_main-default text_color_inactive">
                Забыли пароль?&nbsp;
                <Link  to='/forgot-password'>Восстановить пароль</Link>
            </p>
        </article>
    )
}

export default LoginPage;