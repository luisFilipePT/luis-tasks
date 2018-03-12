import { REHYDRATE } from 'redux-persist';
import { LOGOUT, SESSION_UPDATE } from '../actions/types';

const INITIAL_STATE = {
    user: null,
};

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case REHYDRATE:
            if (payload && payload.session) {
                return {
                    ...payload.session,
                };
            }
            return state;
        case SESSION_UPDATE:
            return {
                ...state,
                ...payload,
            };
        case LOGOUT:
            return {
                ...INITIAL_STATE,
            };
        default:
            return state;
    }
};

