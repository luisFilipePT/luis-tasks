import { REHYDRATE } from 'redux-persist';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/types';

const INITIAL_STATE = {
    isFetching: false,
    isAuthenticated: false,
    token: null,
    formErrors: null,
};

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case REHYDRATE:
            if (payload && payload.auth) {
                return {
                    ...payload.auth,
                    isAuthenticated: false,
                    isFetching: false,
                    formErrors: null,
                };
            }
            return state;
        case LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                formErrors: null,
                token: payload,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                formErrors: payload,
            };
        case LOGOUT:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

