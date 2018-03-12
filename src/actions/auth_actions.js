import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SESSION_UPDATE } from './types';

import { handleServerErrors } from '../utils';
// Actions related to the authentication (login) flow

export const requestLogin = () => ({ type: LOGIN_REQUEST });

export const receiveLogin = token => ({
    type: LOGIN_SUCCESS,
    payload: token,
});

export const loginError = formErrors => ({
    type: LOGIN_FAILURE,
    payload: formErrors,
});

const updateSession = user => ({
    type: SESSION_UPDATE,
    payload: {
        user,
    },
});

// UI ACTIONS

export const loginUser = ({ profileObj, tokenObj }, navigate) => {
    return async (dispatch) => {
        dispatch(requestLogin());
        try {
            const token = `Bearer ${tokenObj.access_token}`;

            // save token (saved in the auth state)
            dispatch(receiveLogin(token));
            // save the google data and the user data for future use (saved in the session state)
            dispatch(updateSession(profileObj));
            // log in the user, now already authenticated
            navigate('/');
        } catch (error) {
            handleServerErrors(error, dispatch, loginError);
        }
    };
};

