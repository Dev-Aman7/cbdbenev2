import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { authReducer, firstLogin } from './reducers';

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['auth', 'first'],
};

const rootReducer = persistReducer(
    persistConfig,
    combineReducers({ auth: authReducer, first: firstLogin })
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, logger))
);

const persistor = persistStore(store);

export { store, persistor };
