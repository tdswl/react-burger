import {createReducer} from '@reduxjs/toolkit'
import {
    errorPasswordReset,
    passwordReset,
    successPasswordReset,
    errorReset,
    reset,
    successReset,
    register,
    successRegister,
    errorRegister,
    logout,
    login,
    successLogin,
    errorLogin,
    successLogout,
    errorLogout,
    token,
    successToken,
    errorToken,
    getUser,
    successGetUser,
    errorGetUser,
    patchUser,
    errorPatchUser,
    successPatchUser
} from "../actions/auth";

const initialState = {
    passwordResetRequest: false,
    passwordResetFailed: false,

    resetRequest: false,
    resetFailed: false,

    registerRequest: false,
    registerFailed: false,

    loginRequest: false,
    loginFailed: false,

    logoutRequest: false,
    logoutFailed: false,

    tokenRequest: false,
    tokenFailed: false,

    getUserRequest: false,
    getUserFailed: false,

    patchUserRequest: false,
    patchUserFailed: false,

    user: null,
    // TODO: сохранять в куку или localstorage
    accessToken: '',
    refreshToken: '',
}

export const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(passwordReset, (state) => {
            return {
                ...state,
                passwordResetRequest: true,
            };
        })
        .addCase(successPasswordReset, (state) => {
            return {
                ...state,
                passwordResetRequest: false,
                passwordResetFailed: false,
            };
        })
        .addCase(errorPasswordReset, (state) => {
            return {
                ...state,
                passwordResetRequest: false,
                passwordResetFailed: true,
            };
        })
        .addCase(reset, (state) => {
            return {
                ...state,
                resetRequest: true,
            };
        })
        .addCase(successReset, (state) => {
            return {
                ...state,
                resetRequest: false,
                resetFailed: false,
            };
        })
        .addCase(errorReset, (state) => {
            return {
                ...state,
                resetRequest: false,
                resetFailed: true,
            };
        })

        .addCase(register, (state) => {
            return {
                ...state,
                registerRequest: true,
            };
        })
        .addCase(successRegister, (state, action) => {
            return {
                ...state,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                registerRequest: false,
                registerFailed: false,
            };
        })
        .addCase(errorRegister, (state) => {
            return {
                ...state,
                user: initialState.user,
                accessToken: initialState.accessToken,
                refreshToken: initialState.refreshToken,
                registerRequest: false,
                registerFailed: true,
            };
        })
        .addCase(login, (state) => {
            return {
                ...state,
                loginRequest: true,
            };
        })
        .addCase(successLogin, (state, action) => {
            return {
                ...state,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                loginRequest: false,
                loginFailed: false,
            };
        })
        .addCase(errorLogin, (state) => {
            return {
                ...state,
                user: initialState.user,
                accessToken: initialState.accessToken,
                refreshToken: initialState.refreshToken,
                loginRequest: false,
                loginFailed: true,
            };
        })
        .addCase(logout, (state) => {
            return {
                ...state,
                logoutRequest: true,
            };
        })
        .addCase(successLogout, (state) => {
            return {
                ...state,
                user: initialState.user,
                accessToken: initialState.accessToken,
                refreshToken: initialState.refreshToken,
                loginRequest: false,
                loginFailed: false,
            };
        })
        .addCase(errorLogout, (state) => {
            return {
                ...state,
                loginRequest: false,
                loginFailed: true,
            };
        })
        .addCase(token, (state) => {
            return {
                ...state,
                tokenRequest: true,
            };
        })
        .addCase(successToken, (state, action) => {
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                tokenRequest: false,
                tokenFailed: false,
            };
        })
        .addCase(errorToken, (state) => {
            return {
                ...state,
                tokenRequest: false,
                tokenFailed: true,
            };
        })
        .addCase(getUser, (state) => {
            return {
                ...state,
                getUserRequest: true,
            };
        })
        .addCase(successGetUser, (state, action) => {
            return {
                ...state,
                user: action.payload.user,
                getUserRequest: false,
                getUserFailed: false,
            };
        })
        .addCase(errorGetUser, (state) => {
            return {
                ...state,
                getUserRequest: false,
                getUserFailed: true,
            };
        })
        .addCase(patchUser, (state) => {
            return {
                ...state,
                patchUserRequest: true,
            };
        })
        .addCase(successPatchUser, (state, action) => {
            return {
                ...state,
                user: action.payload.user,
                patchUserRequest: false,
                patchUserFailed: false,
            };
        })
        .addCase(errorPatchUser, (state) => {
            return {
                ...state,
                patchUserRequest: false,
                patchUserFailed: true,
            };
        })
})