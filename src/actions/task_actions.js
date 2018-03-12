import axios, { get, post, put } from 'axios';
import moment from 'moment';

// Notice: this file does not look very DRY and appears to have very repeated code. True, but in a real use case there would be
// actions and data to change in each case, and this structure allows for a much easier growth of the application in complexity and features


// Actions handled that change the app state, in this case the state related to the tasks flow (match the reducer)
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
} from './types';

import { API_KEY, LISTS_API_URL, TASKS_API_URL } from '../constants';

// handleServerErrors is always used to treat any error from the API no matter the request
import { handleServerErrors } from '../utils';
// ----------------------- Actions triggered to the task reducer -----------------------------------

// LIST TASKS LISTS
const requestTaskLists = () => ({ type: TASK_LISTS_REQUEST });

const receiveTaskLists = lists => ({
    type: TASK_LISTS_RECEIVED,
    payload: {
        lists,
    },
});

const requestTaskListsError = () => ({ type: TASK_LISTS_REQUEST_ERROR });

// LIST TASKS
const requestTasks = () => ({ type: TASKS_REQUEST });

const receiveTasks = tasks => ({
    type: TASKS_RECEIVED,
    payload: {
        tasks,
    },
});

const requestTasksError = () => ({ type: TASKS_REQUEST_ERROR });

// DELETE LIST
const requestListDelete = () => ({ type: TASK_LISTS_DELETE_LIST });

const requestListDeleteError = () => ({ type: TASK_LISTS_DELETE_LIST_ERROR });

// DELETE LIST
const requestListUpdate = () => ({ type: TASK_LISTS_UPDATE_LIST });

const requestListUpdateError = () => ({ type: TASK_LISTS_UPDATE_LIST_ERROR });

// CREATE LIST
const requestListCreate = () => ({ type: TASK_LISTS_CREATE_LIST });

const requestListCreateError = () => ({ type: TASK_LISTS_CREATE_LIST_ERROR });

// CHANGE LIST
const requestListChange = activeList => ({
    type: TASK_LISTS_CHANGE_LIST,
    payload: {
        activeList,
    },
});

// const requestListChangeError = () => ({ type: TASK_LISTS_CHANGE_LIST_ERROR }); // no need does not involve a direct call to the API

// CREATE TASK
const requestTasksCreateTask = () => ({ type: TASKS_CREATE_TASK });
const requestTasksCreateTaskError = () => ({ type: TASKS_CREATE_TASK_ERROR });

// DELETE TASK
const requestTasksDeleteTask = () => ({ type: TASKS_DELETE_TASK });
const requestTasksDeleteTaskError = () => ({ type: TASKS_DELETE_TASK_ERROR });

// EDIT TASK
const requestTasksEditTask = () => ({ type: TASKS_EDIT_TASK });
const requestTasksEditTaskError = () => ({ type: TASKS_EDIT_TASK_ERROR });


// helper function to set the authorization header in the api requests
const getRequestConfig = token => ({ headers: { authorization: token } });

// UI ACTIONS (actions called from the user interface) functions names self explanatory
export const fetchTaskLists = (token) => {
    return async (dispatch) => {
        dispatch(requestTaskLists());
        try {
            const { data } = await get(`${LISTS_API_URL}/lists?key=${API_KEY}`, getRequestConfig(token));
            dispatch(receiveTaskLists(data.items));
        } catch (error) {
            handleServerErrors(error, dispatch, requestTaskListsError);
        }
    };
};

export const fetchTasks = (token, listId) => {
    return async (dispatch) => {
        dispatch(requestTasks());
        try {
            const { data } = await get(`${TASKS_API_URL}/${listId}/tasks?key=${API_KEY}`, getRequestConfig(token));
            dispatch(receiveTasks(data.items));
        } catch (error) {
            handleServerErrors(error, dispatch, requestTasksError);
        }
    };
};

export const deleteList = (listId, token, handleClose) => {
    return async (dispatch) => {
        try {
            dispatch(requestListDelete());
            await axios.delete(`${LISTS_API_URL}/lists/${listId}?key=${API_KEY}`, getRequestConfig(token));

            handleClose();
            fetchTaskLists(token)(dispatch);
        } catch (error) {
            handleServerErrors(error, dispatch, requestListDeleteError);
        }
    };
};

export const updateList = (list, token, handleClose) => {
    return async (dispatch) => {
        try {
            dispatch(requestListUpdate());
            await put(`${LISTS_API_URL}/lists/${list.id}?key=${API_KEY}`, list, getRequestConfig(token));

            handleClose();
            fetchTaskLists(token)(dispatch);
        } catch (error) {
            handleServerErrors(error, dispatch, requestListUpdateError);
        }
    };
};

export const createList = (title, token, handleClose) => {
    return async (dispatch) => {
        try {
            dispatch(requestListCreate());
            await post(`${LISTS_API_URL}/lists?key=${API_KEY}`, { title }, getRequestConfig(token));

            fetchTaskLists(token)(dispatch);
            handleClose();
        } catch (error) {
            handleServerErrors(error, dispatch, requestListCreateError);
        }
    };
};

export const changeList = (list) => {
    return async (dispatch) => {
        dispatch(requestListChange(list));
    };
};

export const createTask = (task, activeListId, token, handleClose) => {
    return async (dispatch) => {
        try {
            const { list, title, notes, status, due } = task;
            const parsedTask = {
                title,
                notes,
                status,
            };

            if (due || due !== null) parsedTask.due = due.format();

            dispatch(requestTasksCreateTask());
            await post(`${TASKS_API_URL}/${list}/tasks?key=${API_KEY}`, parsedTask, getRequestConfig(token));

            handleClose();
            // if the task created not in the list the user is currently seeing no need to update nothing in the UI
            if (activeListId === list) fetchTasks(token, list)(dispatch);
        } catch (error) {
            handleServerErrors(error, dispatch, requestTasksCreateTaskError);
        }
    };
};

export const deleteTask = (taskId, token, handleClose, activeListId) => {
    return async (dispatch) => {
        try {
            dispatch(requestTasksDeleteTask());
            await axios.delete(`${TASKS_API_URL}/${activeListId}/tasks/${taskId}?key=${API_KEY}`, getRequestConfig(token));

            handleClose();
            fetchTasks(token, activeListId)(dispatch);
        } catch (error) {
            handleServerErrors(error, dispatch, requestTasksDeleteTaskError);
        }
    };
};

export const editTask = (task, activeListId, token, handleClose) => {
    return async (dispatch) => {
        try {
            dispatch(requestTasksEditTask());
            const { list, due, selfLink, id, status } = task;
            const parsedTask = { ...task };
            delete parsedTask.list;

            if (due || due !== null) parsedTask.due = moment(due).format();
            if (status === 'needsAction') delete parsedTask.completed;
            if (status !== 'needsAction') parsedTask.completed = moment().format();

            // tricky part since could not figure out the API move action (keeps returning 400)
            // so the workaround is:
            // if the task being updated is to move to other list
            // delete the task from the current list
            // create the task fresh in the target list
            // the best I could do in short notice (realize its not the best solution)
            if (activeListId !== list) {
                const cleanTask = { ...parsedTask };
                delete cleanTask.id;
                axios.delete(`${TASKS_API_URL}/${activeListId}/tasks/${id}?key=${API_KEY}`, getRequestConfig(token));
                await post(`${TASKS_API_URL}/${list}/tasks?key=${API_KEY}`, cleanTask, getRequestConfig(token));
                // this is the request that should work and replace the 2 above
                // await post(`${TASKS_API_URL}/${activeListId}/tasks/${id}/move?parent=${list}&key=${API_KEY}`, parsedTask, getRequestConfig(token));
            } else {
                // if the task being updated does not change list then it is the normal flow
                await put(selfLink, parsedTask, getRequestConfig(token));
            }
            fetchTasks(token, activeListId)(dispatch);
            if (handleClose) handleClose();
        } catch (error) {
            handleServerErrors(error, dispatch, requestTasksEditTaskError);
        }
    };
};
