import { LOGOUT } from '../actions/types';

// LOGOUT
const requestLogout = () => ({ type: LOGOUT });

export const handleServerErrors = (error, dispatch, actionHandler) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('Response data', error.response.data);
        console.log('Response status', error.response.status);
        console.log('Response headers', error.response.headers);
        switch (error.response.status) {
            case 400: // Bad Request (dispatch error to be set in form errors)
                return dispatch(actionHandler(error.response.data));
            case 401: // Unauthorized request logout the user
                dispatch(requestLogout());
                break;
            default: // Warn us about errors not treated yet (status codes)
                console.log(`Something went wrong evaluating status ${error.response.status}.`);
        }
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.warn('No response received. Request ', error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.warn('Something happened in setting up the request that triggered an Error ', error.message);
    }
    console.warn('Not even an error response exists. Config ', error.config);
    return null;
};