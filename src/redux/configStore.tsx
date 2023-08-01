import { configureStore } from '@reduxjs/toolkit';
import searchStringReducer from './reducers/searchString';
import jobListByName from './reducers/jobListByName';
import detailJob from './reducers/detailJob';
import userReducer from './reducers/userReducer';
import addComent from './reducers/addComent';
import renderListReducer from './reducers/renderListReducer';


export const store = configureStore({
    reducer:{
        searchStringReducer:searchStringReducer,
        jobListByName:jobListByName,
        detailJob:detailJob,
        userReducer:userReducer,
        addComent:addComent,
        renderListReducer:renderListReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type DispatchType= typeof store.dispatch