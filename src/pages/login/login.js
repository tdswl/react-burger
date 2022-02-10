import React from "react";
import styles from './login.module.css'
import {EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, useNavigate, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogin} from "../../services/actions/auth";
import {FORGOT_ROUTE, INDEX_ROUTE, REGISTER_ROUTE} from "../../utils/routes";

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const {user, loginRequest} = useSelector(store => store.auth);

    const from = React.useMemo(() => {
        return location.state?.from?.pathname || INDEX_ROUTE;
    }, [location]);

    const onSubmit = () => {
        dispatch(fetchLogin(email, password, () => navigate(from, {replace: true})))
    };

    const [email, setEmail] = React.useState('')
    const onEmailChange = e => {
        setEmail(e.target.value)
    }

    const [password, setPassword] = React.useState('')
    const onPasswordChange = e => {
        setPassword(e.target.value)
    }

    React.useEffect(() => {
        if (user) {
            navigate(from, {replace: true});
        }
    }, [user, navigate, from])

    return (
        <article className={styles.container}>
            <p className="text text_type_main-medium">
                Вход
            </p>
            <EmailInput onChange={onEmailChange} value={email} name={'email'}/>
            <PasswordInput onChange={onPasswordChange} value={password} name={'password'}/>
            <Button type="primary" size="medium" onClick={onSubmit} disabled={!(password && email) || loginRequest}>
                Войти
            </Button>
            <p className="text text_type_main-default text_color_inactive" style={{paddingTop: '56px'}}>
                Вы — новый пользователь?&nbsp;
                <Link to={REGISTER_ROUTE}>Зарегистрироваться</Link>
            </p>
            <p className="text text_type_main-default text_color_inactive">
                Забыли пароль?&nbsp;
                <Link to={FORGOT_ROUTE}>Восстановить пароль</Link>
            </p>
        </article>
    )
}

export default LoginPage;