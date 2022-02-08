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
        .addCase(successRegister, (state) => {
            return {
                ...state,
               registerRequest: false,
               registerFailed: false,
            };
        })
        .addCase(errorRegister, (state) => {
            return {
                ...state,
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
        .addCase(successLogin, (state) => {
            return {
                ...state,
                loginRequest: false,
                loginFailed: false,
            };
        })
        .addCase(errorLogin, (state) => {
            return {
                ...state,
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
        .addCase(successToken, (state) => {
            return {
                ...state,
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
        .addCase(successGetUser, (state) => {
            return {
                ...state,
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
        .addCase(successPatchUser, (state) => {
            return {
                ...state,
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