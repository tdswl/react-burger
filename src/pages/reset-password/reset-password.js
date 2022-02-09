import React from "react";
import styles from './reset-password.module.css'
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchPasswordReset} from "../../services/actions/auth";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const {user, resetRequest} = useSelector(store => store.auth);

    const onSubmit = () => {
        if (password && code)
        {
            dispatch(fetchPasswordReset(password, code));
        }
    };

    const [password, setPassword] = React.useState('')
    const onPasswordChange = e => {
        setPassword(e.target.value)
    }

    const [code, setCode] = React.useState('')
    const onCodeChange = e => {
        setCode(e.target.value)
    }

    React.useEffect(() => {
        if (user)
        {
            const from = location.state?.from?.pathname || "/";
            navigate(from, {replace: true});
        }
    }, [user])

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
            <Button type="primary" size="medium" onClick={onSubmit} disabled={!(password && code) || resetRequest}>
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