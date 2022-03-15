import React, {ChangeEvent} from "react";
import styles from './login.module.css'
import {EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, useNavigate, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogin} from "../../services/actions/auth";
import {FORGOT_ROUTE, INDEX_ROUTE, REGISTER_ROUTE} from "../../utils/routes";
import {ILocationState, IRootState} from "../../services/types/types";

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const {user, loginRequest} = useSelector((store: IRootState) => store.auth);

    const from = React.useMemo(() => {
        const locationState = location.state as ILocationState;
        return locationState?.from?.pathname ?? INDEX_ROUTE;
    }, [location]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(fetchLogin(email, password, () => navigate(from, {replace: true})))
    };

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
            navigate(from, {replace: true});
        }
    }, [user, navigate, from])

    return (
        <form className={styles.container} onSubmit={onSubmit}>
            <p className="text text_type_main-medium">
                Вход
            </p>
            <EmailInput onChange={onEmailChange} value={email} name={'email'}/>
            <PasswordInput onChange={onPasswordChange} value={password} name={'password'}/>
            <Button type="primary" size="medium" disabled={!(password && email) || loginRequest}>
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
        </form>
    )
}

export default LoginPage;