import React from "react";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import styles from './user-profile.module.css'
import {fetchUpdateUser} from "../../services/actions/auth";

const UserProfile = () => {
    const dispatch = useDispatch();

    const {user} = useSelector(store => store.auth);

    const [name, setName] = React.useState(user.name)
    const onNameChange = e => {
        setName(e.target.value)
    }

    const [email, setEmail] = React.useState(user.email)
    const onEmailChange = e => {
        setEmail(e.target.value)
    }

    const [password, setPassword] = React.useState('')
    const onPasswordChange = e => {
        setPassword(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchUpdateUser(name, email, password))
    };

    const onCancel = (e) => {
        e.preventDefault();
        setName(user.name);
        setEmail(user.email);
    };

    return (
        <form className="formContainer" onSubmit={onSubmit}>
            <Input type={'text'}
                   placeholder={'Имя'}
                   onChange={onNameChange}
                   name={'name'}
                   value={name}
                   error={false}
                   size={'default'}/>
            <EmailInput onChange={onEmailChange} value={email} name={'email'}/>
            <PasswordInput onChange={onPasswordChange} value={password} name={'password'}/>

            <div className={styles.buttonsContainer}>
                <Button type="primary" size="medium" disabled={user.name === name && user.email === email && !password}>
                    Сохранить
                </Button>
                <Button type="secondary" size="medium" disabled={user.name === name && user.email === email}
                        onClick={onCancel}>
                    Отменить
                </Button>
            </div>
        </form>
    )
}

export default UserProfile;