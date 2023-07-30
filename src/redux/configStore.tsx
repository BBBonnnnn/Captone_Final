import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import renderListReducer from './reducers/renderListReducer';

export const store = configureStore({
    reducer:{
        userReducer:userReducer,
        renderListReducer: renderListReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type DispatchType = typeof store.dispatch