// store.js
import { configureStore, } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from './auth/slice';

import productReducer from './product/slice';

import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
