import {AnyAction} from "redux";
import {IAuthState, IUser} from "../types/auth";
import {authReducer} from "./auth";
import {
    fetchGetUser,
    fetchLogin,
    fetchLogout,
    fetchPasswordReset,
    fetchRegister,
    fetchReset,
    fetchToken, fetchUpdateUser
} from "../actions/auth";

const original: IAuthState = {
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
};

describe('auth reducer tests', () => {
    it('should return the initial state', () => {
        const expected: IAuthState = {
            ...original,
        };

        expect(authReducer(undefined, {} as AnyAction)).toEqual(expected)
    })

    it('should fetchPasswordReset pending', () => {
        const previousState: IAuthState = {
            ...original,
            passwordResetRequest: false,
            passwordResetFailed: false,
        };

        const expected: IAuthState = {
            ...original,
            passwordResetRequest: true,
            passwordResetFailed: false,
        };

        expect(authReducer(previousState, fetchPasswordReset.pending('', {
            email: 'test.es@re.ryt', successCallback: () => {
            }
        }))).toEqual(expected)
    })


    it('should fetchPasswordReset fulfilled', () => {
        const previousState: IAuthState = {
            ...original,
            passwordResetRequest: true,
            passwordResetFailed: true,
        };

        const expected: IAuthState = {
            ...original,
            passwordResetRequest: false,
            passwordResetFailed: false,
        };

        expect(authReducer(previousState, fetchPasswordReset.fulfilled(undefined, '', {
            email: 'test.es@re.ryt',
            successCallback: () => {
            }
        }))).toEqual(expected)
    })

    it('should fetchPasswordReset rejected', () => {
        const previousState: IAuthState = {
            ...original,
            passwordResetRequest: true,
            passwordResetFailed: false,
        };

        const expected: IAuthState = {
            ...original,
            passwordResetRequest: false,
            passwordResetFailed: true,
        };

        expect(authReducer(previousState, fetchPasswordReset.rejected(new Error(), '', {
            email: 'test.es@re.ryt',
            successCallback: () => {
            }
        }))).toEqual(expected)
    })

    it('should fetchReset pending', () => {
        const previousState: IAuthState = {
            ...original,
            resetRequest: false,
            resetFailed: false,
        };

        const expected: IAuthState = {
            ...original,
            resetRequest: true,
            resetFailed: false,
        };

        expect(authReducer(previousState, fetchReset.pending('', {
            password: 'test', token: 'terst', successCallback: () => {
            }
        }))).toEqual(expected)
    })


    it('should fetchReset fulfilled', () => {
        const previousState: IAuthState = {
            ...original,
            resetRequest: true,
            resetFailed: true,
        };

        const expected: IAuthState = {
            ...original,
            resetRequest: false,
            resetFailed: false,
        };

        expect(authReducer(previousState, fetchReset.fulfilled(undefined, '', {
            password: 'test', token: 'terst', successCallback: () => {
            }
        }))).toEqual(expected)
    })

    it('should fetchReset rejected', () => {
        const previousState: IAuthState = {
            ...original,
            resetRequest: true,
            resetFailed: false,
        };

        const expected: IAuthState = {
            ...original,
            resetRequest: false,
            resetFailed: true,
        };

        expect(authReducer(previousState, fetchReset.rejected(new Error(), '', {
            password: 'test', token: 'terst', successCallback: () => {
            }
        }))).toEqual(expected)
    })

    it('should fetchRegister pending', () => {
        const previousState: IAuthState = {
            ...original,
            registerRequest: false,
            registerFailed: false,
            user: null,
        };

        const expected: IAuthState = {
            ...original,
            registerRequest: true,
            registerFailed: false,
            user: null,
        };

        expect(authReducer(previousState, fetchRegister.pending('', {
            password: 'test', name: 'terst', email: "dfsf@asd.re"
        }))).toEqual(expected)
    })


    it('should fetchRegister fulfilled', () => {
        const previousState: IAuthState = {
            ...original,
            registerRequest: true,
            registerFailed: true,
            user: null,
        };

        const expected: IAuthState = {
            ...original,
            registerRequest: false,
            registerFailed: false,
            user: {
                email: "sdsd",
                name: "asdasd",
                password: undefined,
            },
        };

        const user: IUser = {
            email: "sdsd",
            name: "asdasd",
            password: undefined,
        }

        expect(authReducer(previousState, fetchRegister.fulfilled(user, '', {
            password: 'test', name: 'terst', email: "dfsf@asd.re"
        }))).toEqual(expected)
    })

    it('should fetchRegister rejected', () => {
        const previousState: IAuthState = {
            ...original,
            registerRequest: true,
            registerFailed: false,
            user: {
                email: "sdsd",
                name: "asdasd",
                password: undefined,
            },
        };

        const expected: IAuthState = {
            ...original,
            registerRequest: false,
            registerFailed: true,
            user: null,
        };

        expect(authReducer(previousState, fetchRegister.rejected(new Error(), '', {
            password: 'test', name: 'terst', email: "dfsf@asd.re"
        }))).toEqual(expected)
    })

    it('should fetchLogin pending', () => {
        const previousState: IAuthState = {
            ...original,
            loginRequest: false,
            loginFailed: false,
            user: null,
        };

        const expected: IAuthState = {
            ...original,
            loginRequest: true,
            loginFailed: false,
            user: null,
        };

        expect(authReducer(previousState, fetchLogin.pending('', {
            password: 'test', email: "dfsf@asd.re", successCallback: () => {
            }
        }))).toEqual(expected)
    })


    it('should fetchLogin fulfilled', () => {
        const previousState: IAuthState = {
            ...original,
            loginRequest: true,
            loginFailed: true,
            user: null,
        };

        const expected: IAuthState = {
            ...original,
            loginRequest: false,
            loginFailed: false,
            user: {
                email: "sdsd",
                name: "asdasd",
                password: undefined,
            },
        };

        const user: IUser = {
            email: "sdsd",
            name: "asdasd",
            password: undefined,
        }

        expect(authReducer(previousState, fetchLogin.fulfilled(user, '', {
            password: 'test', email: "dfsf@asd.re", successCallback: () => {
            }
        }))).toEqual(expected)
    })

    it('should fetchLogin rejected', () => {
        const previousState: IAuthState = {
            ...original,
            loginRequest: true,
            loginFailed: false,
            user: {
                email: "sdsd",
                name: "asdasd",
                password: undefined,
            },
        };

        const expected: IAuthState = {
            ...original,
            loginRequest: false,
            loginFailed: true,
            user: null,
        };

        expect(authReducer(previousState, fetchLogin.rejected(new Error(), '', {
            password: 'test', email: "dfsf@asd.re", successCallback: () => {
            }
        }))).toEqual(expected)
    })

    it('should fetchLogout pending', () => {
        const previousState: IAuthState = {
            ...original,
            logoutRequest: false,
            logoutFailed: false,
            user: {
                email: "sdsd",
                name: "asdasd",
                password: undefined,
            },
        };

        const expected: IAuthState = {
            ...original,
            logoutRequest: true,
            logoutFailed: false,
            user: {
                email: "sdsd",
                name: "asdasd",
                password: undefined,
            },
        };

        expect(authReducer(previousState, fetchLogout.pending('', {
            successCallback: () => {
            }
        }))).toEqual(expected)
    })


    it('should fetchLogout fulfilled', () => {
        const previousState: IAuthState = {
            ...original,
            logoutRequest: true,
            logoutFailed: true,
            user: {
                email: "sdsd",
                name: "asdasd",
                password: undefined,
            },
        };

        const expected: IAuthState = {
            ...original,
            logoutRequest: false,
            logoutFailed: false,
            user: null,
        };

        expect(authReducer(previousState, fetchLogout.fulfilled(undefined, '', {
            successCallback: () => {
            }
        }))).toEqual(expected)
    })

    it('should fetchLogout rejected', () => {
        const previousState: IAuthState = {
            ...original,
            logoutRequest: true,
            logoutFailed: false,
            user: {
                email: "sdsd",
                name: "asdasd",
                password: undefined,
            },
        };

        const expected: IAuthState = {
            ...original,
            logoutRequest: false,
            logoutFailed: true,
            user: {
                email: "sdsd",
                name: "asdasd",
                password: undefined,
            },
        };

        expect(authReducer(previousState, fetchLogout.rejected(new Error(), '', {
            successCallback: () => {
            }
        }))).toEqual(expected)
    })

    it('should fetchToken pending', () => {
        const previousState: IAuthState = {
            ...original,
            resetRequest: false,
            resetFailed: false,
        };

        const expected: IAuthState = {
            ...original,
            tokenRequest: true,
            tokenFailed: false,
        };

        expect(authReducer(previousState, fetchToken.pending('', {
            refreshToken: 'test'
        }))).toEqual(expected)
    })


    it('should fetchToken fulfilled', () => {
        const previousState: IAuthState = {
            ...original,
            tokenRequest: true,
            tokenFailed: true,
        };

        const expected: IAuthState = {
            ...original,
            tokenRequest: false,
            tokenFailed: false,
        };

        expect(authReducer(previousState, fetchToken.fulfilled(undefined, '', {
            refreshToken: 'test'
        }))).toEqual(expected)
    })

    it('should fetchToken rejected', () => {
        const previousState: IAuthState = {
            ...original,
            tokenRequest: true,
            tokenFailed: false,
        };

        const expected: IAuthState = {
            ...original,
            tokenRequest: false,
            tokenFailed: true,
        };

        expect(authReducer(previousState, fetchToken.rejected(new Error(), '', {
            refreshToken: 'test'
        }))).toEqual(expected)
    })

    it('should fetchGetUser pending', () => {
        const previousState: IAuthState = {
            ...original,
            getUserRequest: false,
            getUserFailed: false,
            user: null,
        };

        const expected: IAuthState = {
            ...original,
            getUserRequest: true,
            getUserFailed: false,
            user: null,
        };

        expect(authReducer(previousState, fetchGetUser.pending(''))).toEqual(expected)
    })


    it('should fetchGetUser fulfilled', () => {
        const previousState: IAuthState = {
            ...original,
            getUserRequest: true,
            getUserFailed: true,
            user: null,
        };

        const expected: IAuthState = {
            ...original,
            getUserRequest: false,
            getUserFailed: false,
            user: {
                email: "sdsd",
                name: "asdasd",
                password: undefined,
            },
        };

        const user: IUser = {
            email: "sdsd",
            name: "asdasd",
            password: undefined,
        }

        expect(authReducer(previousState, fetchGetUser.fulfilled(user, ''))).toEqual(expected)
    })

    it('should fetchGetUser rejected', () => {
        const previousState: IAuthState = {
            ...original,
            getUserRequest: true,
            getUserFailed: false,
            user: {
                email: "sdsd",
                name: "asdasd",
                password: undefined,
            },
        };

        const expected: IAuthState = {
            ...original,
            getUserRequest: false,
            getUserFailed: true,
            user: {
                email: "sdsd",
                name: "asdasd",
                password: undefined,
            },
        };

        expect(authReducer(previousState, fetchGetUser.rejected(new Error(), ''))).toEqual(expected)
    })

    it('should fetchUpdateUser pending', () => {
        const previousState: IAuthState = {
            ...original,
            patchUserRequest: false,
            patchUserFailed: false,
            user: null,
        };

        const expected: IAuthState = {
            ...original,
            patchUserRequest: true,
            patchUserFailed: false,
            user: null,
        };

        expect(authReducer(previousState, fetchUpdateUser.pending('', {
            password: 'test', name: 'terst', email: "dfsf@asd.re"
        }))).toEqual(expected)
    })


    it('should fetchUpdateUser fulfilled', () => {
        const previousState: IAuthState = {
            ...original,
            patchUserRequest: true,
            patchUserFailed: true,
            user: null,
        };

        const expected: IAuthState = {
            ...original,
            patchUserRequest: false,
            patchUserFailed: false,
            user: {
                email: "sdsd",
                name: "asdasd",
                password: undefined,
            },
        };

        const user: IUser = {
            email: "sdsd",
            name: "asdasd",
            password: undefined,
        }

        expect(authReducer(previousState, fetchUpdateUser.fulfilled(user, '', {
            password: 'test', name: 'terst', email: "dfsf@asd.re"
        }))).toEqual(expected)
    })

    it('should fetchUpdateUser rejected', () => {
        const previousState: IAuthState = {
            ...original,
            patchUserRequest: true,
            patchUserFailed: false,
            user: {
                email: "sdsd",
                name: "asdasd",
                password: undefined,
            },
        };

        const expected: IAuthState = {
            ...original,
            patchUserRequest: false,
            patchUserFailed: true,
            user: {
                email: "sdsd",
                name: "asdasd",
                password: undefined,
            },
        };

        expect(authReducer(previousState, fetchUpdateUser.rejected(new Error(), '', {
            password: 'test', name: 'terst', email: "dfsf@asd.re"
        }))).toEqual(expected)
    })
})