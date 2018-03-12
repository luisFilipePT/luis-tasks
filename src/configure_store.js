import { createStore, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

import auth from './reducers/auth_reducer';
import session from './reducers/session_reducer';
import task from './reducers/task_reducer';

const isDevVersion = process.env.NODE_ENV === 'development';

const middlewares = [ReduxThunk];

const config = {
    key: 'root',
    storage,
    debug: isDevVersion,
    blacklist: ['notification'],
};

const reducers = persistCombineReducers(config, {
    session,
    auth,
    task,
});

export const configureStore = () => {
    const store = createStore(
        reducers,
        isDevVersion && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        compose(applyMiddleware(...middlewares)),
    );
    const persistor = persistStore(store);

    // persistor.purge();
    return { persistor, store };
};
