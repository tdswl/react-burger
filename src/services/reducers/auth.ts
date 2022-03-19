import {createReducer} from '@reduxjs/toolkit'
import {IAuthState} from "../types/auth";
import {
    fetchGetUser,
    fetchLogin,
    fetchLogout,
    fetchPasswordReset,
    fetchRegister,
    fetchReset,
    fetchToken, fetchUpdateUser
} from "../actions/auth";

const initialState: IAuthState = {
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
        .addCase(fetchPasswordReset.pending, (state) => {
            return {
                ...state,
                passwordResetRequest: true,
            };
        })
        .addCase(fetchPasswordReset.fulfilled, (state) => {
            return {
                ...state,
                passwordResetRequest: false,
                passwordResetFailed: false,
            };
        })
        .addCase(fetchPasswordReset.rejected, (state) => {
            return {
                ...state,
                passwordResetRequest: false,
                passwordResetFailed: true,
            };
        })
        .addCase(fetchReset.pending, (state) => {
            return {
                ...state,
                resetRequest: true,
            };
        })
        .addCase(fetchReset.fulfilled, (state) => {
            return {
                ...state,
                resetRequest: false,
                resetFailed: false,
            };
        })
        .addCase(fetchReset.rejected, (state) => {
            return {
                ...state,
                resetRequest: false,
                resetFailed: true,
            };
        })

        .addCase(fetchRegister.pending, (state) => {
            return {
                ...state,
                registerRequest: true,
            };
        })
        .addCase(fetchRegister.fulfilled, (state, action) => {
            return {
                ...state,
                user: action.payload,
                registerRequest: false,
                registerFailed: false,
            };
        })
        .addCase(fetchRegister.rejected, (state) => {
            return {
                ...state,
                user: initialState.user,
                registerRequest: false,
                registerFailed: true,
            };
        })
        .addCase(fetchLogin.pending, (state) => {
            return {
                ...state,
                loginRequest: true,
            };
        })
        .addCase(fetchLogin.fulfilled, (state, action) => {
            return {
                ...state,
                user: action.payload,
                loginRequest: false,
                loginFailed: false,
            };
        })
        .addCase(fetchLogin.rejected, (state) => {
            return {
                ...state,
                user: initialState.user,
                loginRequest: false,
                loginFailed: true,
            };
        })
        .addCase(fetchLogout.pending, (state) => {
            return {
                ...state,
                logoutRequest: true,
            };
        })
        .addCase(fetchLogout.fulfilled, (state) => {
            return {
                ...state,
                user: initialState.user,
                loginRequest: false,
                loginFailed: false,
            };
        })
        .addCase(fetchLogout.rejected, (state) => {
            return {
                ...state,
                loginRequest: false,
                loginFailed: true,
            };
        })
        .addCase(fetchToken.pending, (state) => {
            return {
                ...state,
                tokenRequest: true,
            };
        })
        .addCase(fetchToken.fulfilled, (state) => {
            return {
                ...state,
                tokenRequest: false,
                tokenFailed: false,
            };
        })
        .addCase(fetchToken.rejected, (state) => {
            return {
                ...state,
                tokenRequest: false,
                tokenFailed: true,
            };
        })
        .addCase(fetchGetUser.pending, (state) => {
            return {
                ...state,
                getUserRequest: true,
            };
        })
        .addCase(fetchGetUser.fulfilled, (state, action) => {
            return {
                ...state,
                user: action.payload,
                getUserRequest: false,
                getUserFailed: false,
            };
        })
        .addCase(fetchGetUser.rejected, (state) => {
            return {
                ...state,
                getUserRequest: false,
                getUserFailed: true,
            };
        })
        .addCase(fetchUpdateUser.pending, (state) => {
            return {
                ...state,
                patchUserRequest: true,
            };
        })
        .addCase(fetchUpdateUser.fulfilled, (state, action) => {
            return {
                ...state,
                user: action.payload,
                patchUserRequest: false,
                patchUserFailed: false,
            };
        })
        .addCase(fetchUpdateUser.rejected, (state) => {
            return {
                ...state,
                patchUserRequest: false,
                patchUserFailed: true,
            };
        })
})