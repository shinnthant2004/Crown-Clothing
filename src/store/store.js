import { createStore } from "redux";
import { compose,applyMiddleware } from "redux";

import logger from "redux-logger";

import { persistStore,persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

import createSagaMiddleware from 'redux-saga';
import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";

const sagaMiddleware = createSagaMiddleware();

const middleWares = [process.env.NODE_ENV === 'development' && logger , sagaMiddleware].filter(Boolean);

const composeEnhancer =  (process.env.NODE_ENV !== 'production' &&
window &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

const persistConfig = {
    key: 'root',
    storage,
    whitelist:['cart']
};

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = createStore(persistedReducer,undefined,composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);