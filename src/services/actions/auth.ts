import {createAction} from '@reduxjs/toolkit'
import {
    LOGIN_AUTH_ENDPOINT, LOGOUT_AUTH_ENDPOINT,
    PASSWORD_RESET_ENDPOINT,
    REGISTER_AUTH_ENDPOINT,
    RESET_ENDPOINT, TOKEN_AUTH_ENDPOINT, USER_AUTH_ENDPOINT
} from "../../utils/api-сonstants";
import axios from "axios";
import {deleteCookie, setCookie} from "../../utils/cookie-helper";
import {axiosWithAuth} from "../axiosInterceptors";
import {AppDispatch} from "../../index";
import {IResponse} from "../types/types";
import {AuthAction} from "../constants/auth";
import {IAuthResponse, IUser} from "../types/auth";

export const passwordReset = createAction(AuthAction.PASSWORD_RESET_REQUEST);
export const successPasswordReset = createAction(AuthAction.PASSWORD_RESET_SUCCESS);
export const errorPasswordReset = createAction(AuthAction.PASSWORD_RESET_ERROR);

export const reset = createAction(AuthAction.RESET_REQUEST);
export const successReset = createAction(AuthAction.RESET_SUCCESS);
export const errorReset = createAction(AuthAction.RESET_ERROR);

export const register = createAction(AuthAction.REGISTER_REQUEST);
export const successRegister = createAction<IUser>(AuthAction.REGISTER_SUCCESS);
export const errorRegister = createAction(AuthAction.REGISTER_ERROR);

export const login = createAction(AuthAction.LOGIN_REQUEST);
export const successLogin = createAction<IUser>(AuthAction.LOGIN_SUCCESS);
export const errorLogin = createAction(AuthAction.LOGIN_ERROR);

export const logout = createAction(AuthAction.LOGOUT_REQUEST);
export const successLogout = createAction(AuthAction.LOGOUT_SUCCESS);
export const errorLogout = createAction(AuthAction.LOGOUT_ERROR);

export const token = createAction(AuthAction.TOKEN_REQUEST);
export const successToken = createAction(AuthAction.TOKEN_SUCCESS);
export const errorToken = createAction(AuthAction.TOKEN_ERROR);

export const getUser = createAction(AuthAction.GET_USER_REQUEST);
export const successGetUser = createAction<IUser>(AuthAction.GET_USER_SUCCESS);
export const errorGetUser = createAction(AuthAction.GET_USER_ERROR);

export const patchUser = createAction(AuthAction.PATCH_USER_REQUEST);
export const successPatchUser = createAction<IUser>(AuthAction.PATCH_USER_SUCCESS);
export const errorPatchUser = createAction(AuthAction.PATCH_USER_ERROR);

// 20 минут в секундах
const ACCESS_TOKEN_EXPIRES = 20 * 60;

function storeTokens(accessToken: string | undefined | null, refreshToken: string | undefined | null) {
    accessToken ?
        setCookie('token', accessToken.split('Bearer ')[1], {expires: ACCESS_TOKEN_EXPIRES}) :
        deleteCookie('token');
    refreshToken ?
        localStorage.setItem("Authorization_RefreshToken", refreshToken) :
        localStorage.removeItem("Authorization_RefreshToken");
}

export function fetchPasswordReset(email: string, successCallback: () => void) {
    return async (dispatch: AppDispatch) => {
        dispatch(passwordReset())

        await axios.post(PASSWORD_RESET_ENDPOINT,
            {
                "email": email
            })
            .then(response => {
                let data = response.data;
                if (data.success) {
                    dispatch(successPasswordReset());
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

export function fetchReset(password: string, token: string, successCallback: () => void) {
    return async (dispatch: AppDispatch) => {
        dispatch(reset())

        await axios.post(RESET_ENDPOINT,
            {
                "password": password,
                "token": token,
            })
            .then(response => {
                let data = response.data;
                if (data.success) {
                    dispatch(successReset());
                    successCallback();
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

export function fetchRegister(email: string, password: string, name: string) {
    return async (dispatch: AppDispatch) => {
        dispatch(register())

        await axios.post<IResponse & { user: IUser } & IAuthResponse>(REGISTER_AUTH_ENDPOINT,
            {
                "email": email,
                "password": password,
                "name": name,
            })
            .then(response => {
                let data = response.data;
                if (data.success) {
                    dispatch(successRegister(data.user));

                    storeTokens(data.accessToken, data.refreshToken);
                } else {
                    throw new Error(data.message);
                }
            })
            .catch(e => {
                console.log(`Во время регистрации произошла ошибка: ${e.message}`);
                dispatch(errorRegister());
            });
    }
}

export function fetchLogin(email: string, password: string, successCallback: () => void) {
    return async (dispatch: AppDispatch) => {
        dispatch(login())

        await axios.post<IResponse & { user: IUser } & IAuthResponse>(LOGIN_AUTH_ENDPOINT,
            {
                "email": email,
                "password": password
            })
            .then(response => {
                let data = response.data;
                if (data.success) {
                    dispatch(successLogin(data.user));

                    storeTokens(data.accessToken, data.refreshToken);

                    successCallback();
                } else {
                    throw new Error(data.message);
                }
            })
            .catch(e => {
                console.log(`Во время входа произошла ошибка: ${e.message}`);
                dispatch(errorLogin());
            });
    }
}

export function fetchLogout(successCallback: () => void) {
    return async (dispatch: AppDispatch) => {
        dispatch(logout())

        const refreshToken = localStorage.getItem("Authorization_RefreshToken");
        if (!refreshToken) {
            dispatch(successLogout());
            return;
        }

        await axios.post(LOGOUT_AUTH_ENDPOINT,
            {
                "token": refreshToken
            })
            .then(response => {
                let data = response.data;
                if (data.success) {
                    dispatch(successLogout());
                    storeTokens(null, null);
                    successCallback();
                } else {
                    throw new Error(data.message);
                }
            })
            .catch(e => {
                console.log(`Во время выхода из системы произошла ошибка: ${e.message}`);
                dispatch(errorLogout());
            });
    }
}

export function fetchToken(refreshToken: string) {
    return async (dispatch: AppDispatch) => {
        dispatch(token())

        await axios.post(TOKEN_AUTH_ENDPOINT,
            {
                "token": refreshToken
            })
            .then(response => {
                let data = response.data;
                if (data.success) {
                    dispatch(successToken());
                    storeTokens(data.accessToken, data.refreshToken);
                } else {
                    throw new Error(data.message);
                }
            })
            .catch(e => {
                console.log(`Во время обновления токена произошла ошибка: ${e.message}`);
                dispatch(errorToken());
            });
    }
}

export function fetchGetUser() {
    return async (dispatch: AppDispatch) => {
        dispatch(getUser())

        await axiosWithAuth((refreshToken: string) => fetchToken(refreshToken))
            .get(USER_AUTH_ENDPOINT)
            .then(response => {
                let data = response.data;
                if (data.success) {
                    dispatch(successGetUser(data.user));
                } else {
                    throw new Error(data.message);
                }
            })
            .catch(e => {
                console.log(`Во время получения юзера произошла ошибка: ${e.message}`);
                dispatch(errorGetUser());
            });
    }
}

export function fetchUpdateUser(name: string, email: string, password: string) {
    return async (dispatch: AppDispatch) => {
        dispatch(patchUser())

        await axiosWithAuth((refreshToken: string) => fetchToken(refreshToken))
            .patch(USER_AUTH_ENDPOINT,
                {
                    "email": email,
                    "password": password,
                    "name": name
                })
            .then(response => {
                let data = response.data;
                if (data.success) {
                    dispatch(successPatchUser(data.user));
                } else {
                    throw new Error(data.message);
                }
            })
            .catch(e => {
                console.log(`Во время обновления юзера произошла ошибка: ${e.message}`);
                dispatch(errorPatchUser());
            });
    }
}