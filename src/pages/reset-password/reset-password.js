import React from "react";
import styles from './reset-password.module.css'
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

const ResetPasswordPage = () => {
    const [password, setPassword] = React.useState('')
    const onPasswordChange = e => {
        setPassword(e.target.value)
    }

    const [code, setCode] = React.useState('')
    const onCodeChange = e => {
        setCode(e.target.value)
    }

    return (
        <article className={styles.container}>
            <p className="text text_type_main-medium">
                Восстановление пароля
            </p>
            <PasswordInput onChange={onPasswordChange} value={password} name={'password'} />
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={e => onCodeChange(e.target.value)}
                value={code}
                name={'code'}
                error={false}
                size={'default'}
            />
            <Button type="primary" size="medium">
                Сохранить
            </Button>
            <p className="text text_type_main-default text_color_inactive" style={{paddingTop: '56px'}}>
                Вспомнили пароль?&nbsp;
                <Link to='/'>Войти</Link>
            </p>
        </article>
    )
}

export default ResetPasswordPage;