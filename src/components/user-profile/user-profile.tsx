import React, {ChangeEvent, SyntheticEvent} from "react";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import styles from './user-profile.module.css'
import {fetchUpdateUser} from "../../services/actions/auth";
import {IRootState} from "../../services/types/types";

const UserProfile = () => {
    const dispatch = useDispatch();

    const {user} = useSelector((store: IRootState) => store.auth);

    const [name, setName] = React.useState(user?.name)
    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const [email, setEmail] = React.useState(user?.email)
    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const [password, setPassword] = React.useState('')
    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && email) {
            dispatch(fetchUpdateUser(name, email, password))
        }
    };

    const onCancel = (e: SyntheticEvent) => {
        e.preventDefault();
        setName(user?.name);
        setEmail(user?.email);
    };

    return (
        <div  className={styles.container}>
        <form className="formContainer" onSubmit={onSubmit}>
            <Input type={'text'}
                   placeholder={'Имя'}
                   onChange={onNameChange}
                   name={'name'}
                   value={name ?? ''}
                   error={false}
                   size={'default'}/>
            <EmailInput onChange={onEmailChange} value={email ?? ''} name={'email'}/>
            <PasswordInput onChange={onPasswordChange} value={password} name={'password'}/>

            <div className={styles.buttonsContainer}
                 style={{display: user?.name === name && user?.email === email ? "none" : "block"}}>
                <Button type="secondary" size="medium" disabled={user?.name === name && user?.email === email}
                        onClick={onCancel}>
                    Отменить
                </Button>
                <Button type="primary" size="medium"
                        disabled={user?.name === name && user?.email === email && !password}>
                    Сохранить
                </Button>
            </div>
        </form>
        </div>
    )
}

export default UserProfile;