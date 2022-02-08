import React from "react";
import styles from './forgot-password.module.css'
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchPasswordReset} from "../../services/actions/auth";

const ForgotPasswordPage = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const {passwordResetRequest} = useSelector(store => store.auth);

    const onSubmit = () => {
        dispatch(fetchPasswordReset(email, () => {
            navigate("/reset-password", {replace: true});
        }))
    };

    const [email, setEmail] = React.useState('')
    const onEmailChange = e => {
        setEmail(e.target.value)
    }

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
                <Link to='/login'>Войти</Link>
            </p>
        </article>
    )
}

export default ForgotPasswordPage;