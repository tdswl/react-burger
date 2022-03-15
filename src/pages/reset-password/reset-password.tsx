import React, {ChangeEvent} from "react";
import styles from './reset-password.module.css'
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchReset} from "../../services/actions/auth";
import {FORGOT_ROUTE, INDEX_ROUTE, LOGIN_ROUTE} from "../../utils/routes";
import {ILocationState, IRootState} from "../../services/types/types";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const {user, resetRequest} = useSelector((store: IRootState) => store.auth);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password && code) {
            dispatch(fetchReset(password, code, () => {
                navigate(LOGIN_ROUTE, {replace: true})
            }));
        }
    };

    const [password, setPassword] = React.useState('')
    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const [code, setCode] = React.useState('')
    const onCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value)
    }

    React.useEffect(() => {
        const locationState = location.state as ILocationState;
        const from = locationState?.from?.pathname ?? INDEX_ROUTE;
        if (user || from !== FORGOT_ROUTE) {
            navigate(from, {replace: true});
        }
    }, [user, location, navigate])

    return (
        <form className={styles.container} onSubmit={onSubmit}>
            <p className="text text_type_main-medium">
                Восстановление пароля
            </p>
            <PasswordInput onChange={onPasswordChange} value={password} name={'password'}/>
            <Input type={'text'}
                   placeholder={'Введите код из письма'}
                   onChange={e => onCodeChange(e)}
                   value={code}
                   name={'code'}
                   error={false}
                   size={'default'}/>
            <Button type="primary" size="medium" disabled={!(password && code) || resetRequest}>
                Сохранить
            </Button>
            <p className="text text_type_main-default text_color_inactive" style={{paddingTop: '56px'}}>
                Вспомнили пароль?&nbsp;
                <Link to={LOGIN_ROUTE}>Войти</Link>
            </p>
        </form>
    )
}

export default ResetPasswordPage;