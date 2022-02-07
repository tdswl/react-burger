import React from "react";
import styles from './register.module.css'
import {Button, EmailInput, PasswordInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

const RegisterPage = () => {
    const [name, setName] = React.useState('')
    const onNameChange = e => {
        setName(e.target.value)
    }

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
                Регистрация
            </p>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={e => onNameChange(e.target.value)}
                value={name}
                name={'name'}
                error={false}
                size={'default'}
            />
            <EmailInput onChange={onEmailChange} value={email} name={'email'} />
            <PasswordInput onChange={onPasswordChange} value={password} name={'password'} />
            <Button type="primary" size="medium">
                Зарегистрироваться
            </Button>
            <p className="text text_type_main-default text_color_inactive" style={{paddingTop: '56px'}}>
                Уже зарегистрированы?&nbsp;
                <Link to='/login'>Войти</Link>
            </p>
        </article>
    )
}

export default RegisterPage;