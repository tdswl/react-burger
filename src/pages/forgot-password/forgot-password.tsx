import React, {ChangeEvent} from "react";
import styles from './forgot-password.module.css'
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {fetchPasswordReset} from "../../services/actions/auth";
import {INDEX_ROUTE, LOGIN_ROUTE, RESET_ROUTE} from "../../utils/routes";
import {ILocationState} from "../../services/types/types";
import {useAppDispatch, useAppSelector} from "../../services/hooks/hooks";

const ForgotPasswordPage = () => {
    let navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const {user, passwordResetRequest} = useAppSelector(store => store.auth);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const successCallback = (): void => {
            navigate(RESET_ROUTE, {replace: true, state: {from: location}});
        }
        dispatch(fetchPasswordReset({email, successCallback}))
    };

    const [email, setEmail] = React.useState('')
    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
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
                Восстановление пароля
            </p>
            <EmailInput onChange={onEmailChange} value={email} name={'email'}/>
            <Button type="primary" size="medium" disabled={!email || passwordResetRequest} htmlType={"button"}>
                Восстановить
            </Button>
            <p className="text text_type_main-default text_color_inactive" style={{paddingTop: '56px'}}>
                Вспомнили пароль?&nbsp;
                <Link to={LOGIN_ROUTE}>Войти</Link>
            </p>
        </form>
    )
}

export default ForgotPasswordPage;