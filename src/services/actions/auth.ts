import {createAsyncThunk} from '@reduxjs/toolkit'
import {
    LOGIN_AUTH_ENDPOINT, LOGOUT_AUTH_ENDPOINT,
    PASSWORD_RESET_ENDPOINT,
    REGISTER_AUTH_ENDPOINT,
    RESET_ENDPOINT, TOKEN_AUTH_ENDPOINT, USER_AUTH_ENDPOINT
} from "../../utils/api-сonstants";
import axios from "axios";
import {deleteCookie, setCookie} from "../../utils/cookie-helper";
import {axiosWithAuth} from "../axiosInterceptors";
import {IResponse} from "../types/types";
import {IAuthResponse, IUser} from "../types/auth";

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

export const fetchPasswordReset = createAsyncThunk('password/reset', async (request: {email: string, successCallback: () => void}) => {
    const {email, successCallback} = request;

    const response = await axios.post(PASSWORD_RESET_ENDPOINT,
        {
            "email": email
        });
    let data = response.data;
    if (data.success) {
        successCallback();
    } else {
        throw new Error(data.message);
    }
});

export const fetchReset = createAsyncThunk('password/resetWithCode', async (request: {password: string, token: string, successCallback: () => void}) => {
    const {password, token, successCallback} = request;

    const response = await axios.post(RESET_ENDPOINT,
        {
            "password": password,
            "token": token,
        })
    let data = response.data;
    if (data.success) {
        successCallback();
    } else {
        throw new Error(data.message);
    }
});

export const fetchRegister = createAsyncThunk('user/register', async (request: {email: string, password: string, name: string}) => {
    const {email, password, name} = request;

    const response = await axios.post<IResponse & { user: IUser } & IAuthResponse>(REGISTER_AUTH_ENDPOINT,
        {
            "email": email,
            "password": password,
            "name": name,
        })
    let data = response.data;
    if (data.success) {
        storeTokens(data.accessToken, data.refreshToken);
        return data.user;
    } else {
        throw new Error(data.message);
    }
});

export const fetchLogin = createAsyncThunk('user/login', async (request: {email: string, password: string, successCallback: () => void}) => {
    const {email, password, successCallback} = request;

    const response =  await axios.post<IResponse & { user: IUser } & IAuthResponse>(LOGIN_AUTH_ENDPOINT,
        {
            "email": email,
            "password": password
        })
    let data = response.data;
    if (data.success) {
        storeTokens(data.accessToken, data.refreshToken);
        successCallback();
        return data.user;
    } else {
        throw new Error(data.message);
    }
});

export const fetchLogout = createAsyncThunk('user/logout', async (request: {successCallback: () => void}) => {
    const {successCallback} = request;

    const refreshToken = localStorage.getItem("Authorization_RefreshToken");
    if (!refreshToken) {
        return;
    }

    const response =   await axios.post(LOGOUT_AUTH_ENDPOINT,
        {
            "token": refreshToken
        })
    let data = response.data;
    if (data.success) {
        storeTokens(null, null);
        successCallback();
    } else {
        throw new Error(data.message);
    }
});

export const fetchToken = createAsyncThunk('user/updateToken', async (request: {refreshToken: string}) => {
    const {refreshToken} = request;

    const response = await axios.post(TOKEN_AUTH_ENDPOINT,
        {
            "token": refreshToken
        })
    let data = response.data;
    if (data.success) {
        storeTokens(data.accessToken, data.refreshToken);
    } else {
        throw new Error(data.message);
    }
});

export const fetchGetUser = createAsyncThunk('user/get', async () => {
    const response =  await axiosWithAuth((refreshToken: string) => fetchToken({refreshToken})).get(USER_AUTH_ENDPOINT)
    let data = response.data;
    if (data.success) {
        return data.user;
    } else {
        throw new Error(data.message);
    }
});

export const fetchUpdateUser = createAsyncThunk('user/update', async (request: {name: string, email: string, password: string}) => {
    const {name, email, password} = request;

    const response = await axiosWithAuth((refreshToken: string) => fetchToken({refreshToken}))
        .patch(USER_AUTH_ENDPOINT,
            {
                "email": email,
                "password": password,
                "name": name
            })
    let data = response.data;
    if (data.success) {
        return data.user;
    } else {
        throw new Error(data.message);
    }
});