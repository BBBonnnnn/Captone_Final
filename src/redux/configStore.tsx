import { configureStore } from '@reduxjs/toolkit';
import searchStringReducer from './reducers/searchString';
import jobListByName from './reducers/jobListByName';
import detailJob from './reducers/detailJob';
import userReducer from './reducers/userReducer';
import addComent from './reducers/addComent';
import renderListReducer from './reducers/renderListReducer';
import userAdminReducer from './reducers/admin/userAdminReducer'
import UserJobReducer from './reducers/admin/UserJobReducer'
import categoryAdminReducer from './reducers/admin/categoryAdminReducer';
import serviceAdminReducer from './reducers/admin/serviceAdminReducer';
export const store = configureStore({
    reducer:{
        searchStringReducer:searchStringReducer,
        jobListByName:jobListByName,
        detailJob:detailJob,
        userReducer:userReducer,
        addComent:addComent,
        renderListReducer:renderListReducer,
        UserJobReducer:UserJobReducer,
        userAdminReducer:userAdminReducer,
        categoryAdminReducer:categoryAdminReducer,
        serviceAdminReducer:serviceAdminReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type DispatchType= typeof store.dispatch