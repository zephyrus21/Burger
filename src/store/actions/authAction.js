import * as actionTypes from './actionsTypes';
import Axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const checkAuthTimeout = (expTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expTime * 1000);
    };
};

export const auth = (email, password, isSignup) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        let url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCbxoKszC23EU1P23GaBZFC6LR7F44aAQg';
        if (!isSignup) {
            url =
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCbxoKszC23EU1P23GaBZFC6LR7F44aAQg';
        }
        Axios.post(url, authData)
            .then((response) => {
                console.log(response);
                const expDate = new Date(
                    new Date().getTime() + response.data.expiresIn * 1000
                );
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expDate', expDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(
                    authSuccess(response.data.idToken, response.data.localId)
                );
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch((err) => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const setAuthRedirect = (path) => {
    return {
        type: actionTypes.AUTH_REDIRECT,
        path: path,
    };
};

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expDate = new Date(localStorage.getItem('expDate'));
            if (expDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(
                    checkAuthTimeout(
                        (expDate.getTime() - new Date().getTime()) / 1000
                    )
                );
            }
        }
    };
};
