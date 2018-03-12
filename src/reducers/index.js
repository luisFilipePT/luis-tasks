import { combineReducers } from 'redux';

import authReducer from './auth_reducer';
import sessionReducer from './session_reducer';
import taskReducer from './task_reducer';

export default combineReducers({
    auth: authReducer,
    session: sessionReducer,
    task: taskReducer,
});
