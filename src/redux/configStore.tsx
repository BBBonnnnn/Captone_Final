import { configureStore } from '@reduxjs/toolkit';
import searchStringReducer from './reducers/searchString';
import jobListByName from './reducers/jobListByName';
import detailJob from './reducers/detailJob';
import userReducer from './reducers/userReducer';
import addComent from './reducers/addComent';
import renderListReducer from './reducers/renderListReducer';
import menuJob from './reducers/menuJob';
import deleteRentJob from './reducers/deleteRentJob';
import getComent from './reducers/getComent';
import getInfoJob from './reducers/getInfoJob';
import getGroupJob from './reducers/getGroupJob';
import categoryAdminReducer from './reducers/admin/categoryAdminReducer';
import serviceAdminReducer from './reducers/admin/serviceAdminReducer';
import userAdminReducer from './reducers/admin/userAdminReducer';
import UserJobReducer from './reducers/admin/UserJobReducer';


export const store = configureStore({
    reducer:{
        searchStringReducer:searchStringReducer,
        jobListByName:jobListByName,
        detailJob:detailJob,
        userReducer:userReducer,
        addComent:addComent,
        renderListReducer:renderListReducer,
        menuJob:menuJob,
        deleteRentJob:deleteRentJob,
        getComent:getComent,
        getInfoJob:getInfoJob,
        getGroupJob:getGroupJob,
        categoryAdminReducer:categoryAdminReducer,
        serviceAdminReducer:serviceAdminReducer,
        userAdminReducer:userAdminReducer,
        UserJobReducer:UserJobReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type DispatchType= typeof store.dispatch