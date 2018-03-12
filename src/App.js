import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import { configureStore } from './configure_store';
import Router from './components/router';

const { persistor, store } = configureStore();

const App = () => {
    return (
        <PersistGate persistor={persistor}>
            <Provider store={store}>
                <Router/>
            </Provider>
        </PersistGate>
    );
};

export default App;
