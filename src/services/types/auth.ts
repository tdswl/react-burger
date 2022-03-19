export interface IUser {
    name: string;
    email: string;
    password?: string;
}

export interface IAuthResponse {
    accessToken?: string;
    refreshToken?: string;
}

export interface IAuthState {
    passwordResetRequest: boolean,
    passwordResetFailed: boolean,

    resetRequest: boolean,
    resetFailed: boolean,

    registerRequest: boolean,
    registerFailed: boolean,

    loginRequest: boolean,
    loginFailed: boolean,

    logoutRequest: boolean,
    logoutFailed: boolean,

    tokenRequest: boolean,
    tokenFailed: boolean,

    getUserRequest: boolean,
    getUserFailed: boolean,

    patchUserRequest: boolean,
    patchUserFailed: boolean,

    user: IUser | null,
}