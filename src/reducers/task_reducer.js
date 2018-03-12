import { REHYDRATE } from 'redux-persist';

// Notice: this file does not look very DRY and appears to have very repeated code. True, but in a real use case there would be
// actions and data to change in each case, and this structure allows for a much easier growth of the application in complexity and features

// Actions handled that change the app state, in this case the state related to the tasks flow
import {
    TASK_LISTS_REQUEST, TASK_LISTS_RECEIVED, TASK_LISTS_REQUEST_ERROR,
    TASKS_REQUEST, TASKS_RECEIVED, TASKS_REQUEST_ERROR,
    TASK_LISTS_DELETE_LIST, TASK_LISTS_DELETE_LIST_ERROR,
    TASK_LISTS_UPDATE_LIST, TASK_LISTS_UPDATE_LIST_ERROR,
    TASK_LISTS_CREATE_LIST, TASK_LISTS_CREATE_LIST_ERROR,
    TASK_LISTS_CHANGE_LIST, TASK_LISTS_CHANGE_LIST_ERROR,
    TASKS_CREATE_TASK, TASKS_CREATE_TASK_ERROR,
    TASKS_DELETE_TASK, TASKS_DELETE_TASK_ERROR,
    TASKS_EDIT_TASK, TASKS_EDIT_TASK_ERROR,
} from '../actions/types';

// Initial state for the tasks flow (some properties are not used due to the short time to implement)
const INITIAL_STATE = {
    lists: [], // the lists persisted in the app in case of refresh or no internet connection
    tasks: [], // the list of tasks current displayed to the user
    activeList: null, // the list in scope at the moment
    isFetching: false, // is making some request to the API ( controls the loaders)
    paginationObj: null, // for lazy load or pagination (not implemented)
    formErrors: null, // to receive the errors in the forms (not implemented). Only useful in case client side validations fail
};

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case REHYDRATE: // state after refresh or upon new login (persisted)
            if (payload && payload.task) {
                return {
                    ...payload.task,
                    isFetching: false,
                    formErrors: null,
                };
            }
            return state;
        case TASK_LISTS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case TASK_LISTS_RECEIVED:
            return {
                ...state,
                ...payload,
                activeList: state.activeList === null ? payload.lists[0] : state.activeList, // set the initial tasks displayed in case there is nothing persisted
                isFetching: false,
            };
        case TASK_LISTS_REQUEST_ERROR:
            return {
                ...state,
                isFetching: false,
            };
        case TASKS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case TASKS_RECEIVED:
            return {
                ...state,
                ...payload,
                isFetching: false,
            };
        case TASK_LISTS_CHANGE_LIST:
            return {
                ...state,
                ...payload,
                isFetching: false,
            };
        case TASK_LISTS_CHANGE_LIST_ERROR:
            return {
                ...state,
                isFetching: false,
            };
        case TASKS_REQUEST_ERROR:
            return {
                ...state,
                isFetching: false,
            };
        case TASK_LISTS_DELETE_LIST:
            return {
                ...state,
                isFetching: true,
            };
        case TASK_LISTS_DELETE_LIST_ERROR:
            return {
                ...state,
                isFetching: false,
            };
        case TASK_LISTS_UPDATE_LIST:
            return {
                ...state,
                isFetching: true,
            };
        case TASK_LISTS_UPDATE_LIST_ERROR:
            return {
                ...state,
                isFetching: false,
            };
        case TASK_LISTS_CREATE_LIST:
            return {
                ...state,
                isFetching: true,
            };
        case TASK_LISTS_CREATE_LIST_ERROR:
            return {
                ...state,
                isFetching: false,
            };
        case TASKS_CREATE_TASK:
            return {
                ...state,
                isFetching: true,
            };
        case TASKS_CREATE_TASK_ERROR:
            return {
                ...state,
                isFetching: false,
            };
        case TASKS_DELETE_TASK:
            return {
                ...state,
                isFetching: true,
            };
        case TASKS_DELETE_TASK_ERROR:
            return {
                ...state,
                isFetching: false,
            };
        case TASKS_EDIT_TASK:
            return {
                ...state,
                isFetching: true,
            };
        case TASKS_EDIT_TASK_ERROR:
            return {
                ...state,
                isFetching: false,
            };
        default:
            return state;
    }
};

