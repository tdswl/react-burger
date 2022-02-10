import React from "react";
import styles from './forgot-password.module.css'
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchPasswordReset} from "../../services/actions/auth";
import {LOGIN_ROUTE, RESET_ROUTE} from "../../utils/routes";

const ForgotPasswordPage = () => {
    let navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const {user, passwordResetRequest} = useSelector(store => store.auth);

    const onSubmit = () => {
        dispatch(fetchPasswordReset(email, () => {
            navigate(RESET_ROUTE, {replace: true});
        }))
    };

    const [email, setEmail] = React.useState('')
    const onEmailChange = e => {
        setEmail(e.target.value)
    }

    React.useEffect(() => {
        if (user) {
            const from = location.state?.from?.pathname || "/";
            navigate(from, {replace: true});
        }
    }, [user, location, navigate])

    return (
        <article className={styles.container}>
            <p className="text text_type_main-medium">
                Восстановление пароля
            </p>
            <EmailInput onChange={onEmailChange} value={email} name={'email'}/>
            <Button type="primary" size="medium" onClick={onSubmit} disabled={!email || passwordResetRequest}>
                Восстановить
            </Button>
            <p className="text text_type_main-default text_color_inactive" style={{paddingTop: '56px'}}>
                Вспомнили пароль?&nbsp;
                <Link to={LOGIN_ROUTE}>Войти</Link>
            </p>
        </article>
    )
}

export default ForgotPasswordPage;