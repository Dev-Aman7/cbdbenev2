import { AuthUrl } from '../../utils/Axios';
import * as actionTypes from './types';

const updateLocalStorage = (token) => {
    console.log('update token');
    localStorage.setItem('token', token);
};

export const signUp = (payload) => {
    console.log('in signUp action');
    return (dispatch) => {
        return AuthUrl.post('/auth/save', payload)
            .then((result) => {
                console.log(result);
                dispatch({
                    type: actionTypes.SIGN_UP,
                });
                return result.data;
            })
            .catch((err) => {
                Promise.reject(err.response);
            });
    };
};

export const signIn = (payload) => {
    console.log('in signIn action', payload);
    return (dispatch) => {
        return AuthUrl.post('/auth/verifyUser', payload)
            .then((result) => {
                console.log(result);
                if (result.data.code === 0) {
                    updateLocalStorage(result.data.cookies.CP);
                    dispatch({
                        type: actionTypes.SIGN_IN,
                    });
                }

                return result.data;
            })
            .catch((err) => {
                Promise.reject(err.response);
            });
    };
};

export const forgot = (payload) => {
    console.log('in reset action', payload);
    return (dispatch) => {
        return AuthUrl.post('/forgotPassword', payload)
            .then((result) => {
                console.log(result);
                dispatch({
                    type: actionTypes.FORGOT_PASSWORD,
                });
                return result.data;
            })
            .catch((err) => {
                Promise.reject(err.response);
            });
    };
};

export const reset = (payload, token) => {
    console.log('in reset action', payload, token);
    return (dispatch) => {
        return AuthUrl.post(`/resetPassword/:${token}`, payload)
            .then((result) => {
                console.log(result);
                dispatch({
                    type: actionTypes.FORGOT_PASSWORD,
                });
                return result.data;
            })
            .catch((err) => {
                Promise.reject(err.response);
            });
    };
};

export const google = (response) => {
    console.log('in google action');
    return (dispatch) =>
        AuthUrl.post('/auth/google', response)
            .then((result) => {
                if (result.data.code === 0) {
                    updateLocalStorage(result.data.cookies.CP);
                }
                console.log(result);
                console.log(result.data.code, 'code');
                return result.data.message;
            })
            .catch((err) => {
                console.log(err);
            });
};
