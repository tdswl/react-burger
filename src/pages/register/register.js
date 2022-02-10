import React from "react";
import styles from './register.module.css'
import {Button, EmailInput, PasswordInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchRegister} from "../../services/actions/auth";
import {INDEX_ROUTE, LOGIN_ROUTE} from "../../utils/routes";

const RegisterPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const {user, registerRequest} = useSelector(store => store.auth);

    const onSubmit = () => {
        if (name && email && password)
        {
            dispatch(fetchRegister(email, password, name));
        }
    };

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

    React.useEffect(() => {
        if (user)
        {
            const from = location.state?.from?.pathname || INDEX_ROUTE;
            navigate(from, {replace: true});
        }
    }, [user, location, navigate])

    return (
        <article className={styles.container}>
            <p className="text text_type_main-medium">
                Регистрация
            </p>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={e => onNameChange(e)}
                value={name}
                name={'name'}
                error={false}
                size={'default'}
            />
            <EmailInput onChange={onEmailChange} value={email} name={'email'} />
            <PasswordInput onChange={onPasswordChange} value={password} name={'password'} />
            <Button type="primary" size="medium" onClick={onSubmit} disabled={registerRequest || !(name && email && password)}>
                Зарегистрироваться
            </Button>
            <p className="text text_type_main-default text_color_inactive" style={{paddingTop: '56px'}}>
                Уже зарегистрированы?&nbsp;
                <Link to={LOGIN_ROUTE}>Войти</Link>
            </p>
        </article>
    )
}

export default RegisterPage;