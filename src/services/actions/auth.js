import {createAction} from '@reduxjs/toolkit'
import {PASSWORD_RESET_ENDPOINT, RESET_ENDPOINT} from "../../utils/api-сonstants";

const PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST';
const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
const PASSWORD_RESET_ERROR = 'PASSWORD_RESET_ERROR';

const RESET_REQUEST = 'RESET_REQUEST';
const RESET_SUCCESS = 'RESET_SUCCESS';
const RESET_ERROR = 'RESET_ERROR';

const REGISTER_REQUEST = 'REGISTER_REQUEST';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_ERROR = 'REGISTER_ERROR';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';

const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_ERROR = 'LOGOUT_ERROR';

const TOKEN_REQUEST = 'TOKEN_REQUEST';
const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
const TOKEN_ERROR = 'TOKEN_ERROR';

const GET_USER_REQUEST = 'GET_USER_REQUEST';
const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
const GET_USER_ERROR = 'GET_USER_ERROR';

const PATCH_USER_REQUEST = 'PATCH_USER_REQUEST';
const PATCH_USER_SUCCESS = 'PATCH_USER_SUCCESS';
const PATCH_USER_ERROR = 'PATCH_USER_ERROR';

export const passwordReset = createAction(PASSWORD_RESET_REQUEST);
export const successPasswordReset = createAction(PASSWORD_RESET_SUCCESS);
export const errorPasswordReset = createAction(PASSWORD_RESET_ERROR);

export const reset = createAction(RESET_REQUEST);
export const successReset = createAction(RESET_SUCCESS);
export const errorReset = createAction(RESET_ERROR);

export const register = createAction(REGISTER_REQUEST);
export const successRegister = createAction(REGISTER_SUCCESS);
export const errorRegister = createAction(REGISTER_ERROR);

export const login = createAction(LOGIN_REQUEST);
export const successLogin = createAction(LOGIN_SUCCESS);
export const errorLogin = createAction(LOGIN_ERROR);

export const logout = createAction(LOGOUT_REQUEST);
export const successLogout = createAction(LOGOUT_SUCCESS);
export const errorLogout = createAction(LOGOUT_ERROR);

export const token = createAction(TOKEN_REQUEST);
export const successToken = createAction(TOKEN_SUCCESS);
export const errorToken = createAction(TOKEN_ERROR);

export const getUser = createAction(GET_USER_REQUEST);
export const successGetUser = createAction(GET_USER_SUCCESS);
export const errorGetUser = createAction(GET_USER_ERROR);

export const patchUser = createAction(PATCH_USER_REQUEST);
export const successPatchUser = createAction(PATCH_USER_SUCCESS);
export const errorPatchUser = createAction(PATCH_USER_ERROR);

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error(`Во время запроса к Api произошла ошибка. Запрос вернул код: ${res.status}`);
    }
}

export function fetchPasswordReset(email, successCallback) {
    return async dispatch => {
        dispatch(passwordReset())

        const request = {
            method: 'POST',
            body: JSON.stringify({
                "email": email
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        };

        await fetch(PASSWORD_RESET_ENDPOINT, request)
            .then(checkResponse)
            .then(data => {
                if (data.success) {
                    dispatch(successPasswordReset({message: data.message}));
                    successCallback();
                } else {
                    throw new Error(data.message);
                }
            })
            .catch(e => {
                console.log(`Во время сброса пароля произошла ошибка: ${e.message}`);
                dispatch(errorPasswordReset());
            });
    }
}

export function fetchReset(password, token) {
    return async dispatch => {
        dispatch(reset())

        const request = {
            method: 'POST',
            body: JSON.stringify({
                "password": password,
                "token": token,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        };

        await fetch(RESET_ENDPOINT, request)
            .then(checkResponse)
            .then(data => {
                if (data.success) {
                    dispatch(successReset({message: data.message}));
                } else {
                    throw new Error(data.message);
                }
            })
            .catch(e => {
                console.log(`Во время ввода токена произошла ошибка: ${e.message}`);
                dispatch(errorReset());
            });
    }
}