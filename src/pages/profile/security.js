import React from "react";
import {EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";

const SecurityPage = () => {
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

    return (
        <>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={e => onNameChange(e.target.value)}
                value={name}
                name={'name'}
                error={false}
                size={'default'}
            />
            <EmailInput onChange={onEmailChange} value={email} name={'email'}/>
            <PasswordInput onChange={onPasswordChange} value={password} name={'password'}/>
        </>
    )
}

export default SecurityPage;