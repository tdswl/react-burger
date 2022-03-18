import React, {ChangeEvent} from "react";
import styles from './register.module.css'
import {Button, EmailInput, PasswordInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {fetchRegister} from "../../services/actions/auth";
import {INDEX_ROUTE, LOGIN_ROUTE} from "../../utils/routes";
import {ILocationState} from "../../services/types/types";
import {useAppDispatch, useAppSelector} from "../../services/hooks";

const RegisterPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const {user, registerRequest} = useAppSelector(store => store.auth);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && email && password) {
            dispatch(fetchRegister({email, password, name}) as any)
        }
    };

    const [name, setName] = React.useState('')
    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const [email, setEmail] = React.useState('')
    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const [password, setPassword] = React.useState('')
    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    React.useEffect(() => {
        if (user) {
            const locationState = location.state as ILocationState;
            const from = locationState?.from?.pathname ?? INDEX_ROUTE;
            navigate(from, {replace: true});
        }
    }, [user, location, navigate])

    return (
        <form className={styles.container} onSubmit={onSubmit}>
            <p className="text text_type_main-medium">
                Регистрация
            </p>
            <Input type={'text'}
                   placeholder={'Имя'}
                   onChange={e => onNameChange(e)}
                   value={name}
                   name={'name'}
                   error={false}
                   size={'default'}/>
            <EmailInput onChange={onEmailChange} value={email} name={'email'}/>
            <PasswordInput onChange={onPasswordChange} value={password} name={'password'}/>
            <Button type="primary" size="medium" disabled={registerRequest || !(name && email && password)}>
                Зарегистрироваться
            </Button>
            <p className="text text_type_main-default text_color_inactive" style={{paddingTop: '56px'}}>
                Уже зарегистрированы?&nbsp;
                <Link to={LOGIN_ROUTE}>Войти</Link>
            </p>
        </form>
    )
}

export default RegisterPage;