
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, unstable_HistoryRouter as HistoryRouter, Navigate } from 'react-router-dom';
import { createBrowserHistory, BrowserHistory } from 'history';
import Home from './pages/Home/Home';
import HeaderAndFooter from './templates/HeaderAndFooter';
import JobDetail from './pages/JobDetail/JobDetail';
import JobType from './pages/JobType/JobType';
import InFoJob from './pages/InFoJob/InFoJob';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { Provider } from 'react-redux'
import { store } from './redux/configStore';
import './styles/style.scss'
import Search from './pages/Search/Search';
import UserInfo from './pages/InFoUser/UserInfo';
import AdminTemplates from './templates/AdminTemplates';
import UserAdmin from './pages/Admin/UserAdmin';
import JobAdmin from './pages/Admin/JobAdmin';
import CategoryAdmin from './pages/Admin/CategoryAdmin';
import ServiceAdmin from './pages/Admin/ServiceAdmin';



export const history: BrowserHistory | any = createBrowserHistory();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route index element={<Home />}></Route>
        <Route element={<HeaderAndFooter />}>
          <Route path='/search'>
            <Route path=':name' element={<Search />} ></Route>
          </Route>
          <Route path='/joblist'>
            <Route path=':detailid' element={<JobDetail />} ></Route>
          </Route>
          <Route path='/jobtype'>
            <Route path=':id' element={<JobType />} ></Route>
          </Route>
          <Route path='/infojob'>
            <Route path=':id' element={<InFoJob />} ></Route>
          </Route>
          <Route path='/infouser' element={<UserInfo />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Route>
        <Route element={<AdminTemplates />}>
        <Route path='/useradmin' element={<UserAdmin/>}></Route>
        <Route path='/jobadmin' element={<JobAdmin/>}></Route>
        <Route path='/categoryadmin' element={<CategoryAdmin/>}></Route>
        <Route path='/serviceadmin' element={<ServiceAdmin/>}></Route>
        </Route>
        <Route path='*' element={<Navigate to="" />}></Route>
      </Routes>


    </HistoryRouter>
  </Provider>

);
