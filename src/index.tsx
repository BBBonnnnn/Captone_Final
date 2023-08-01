
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, unstable_HistoryRouter as HistoryRouter, Navigate } from 'react-router-dom';
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
import './assets/scss/style.scss'
import Search from './pages/Search.tsx/Search';
import UserInfo from './pages/InFoUser/UserInfo';





export const history: BrowserHistory | any = createBrowserHistory();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
       
        <Route  element={<HeaderAndFooter />}>
        <Route index element={<Home />}></Route>
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
        </Route>

        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='*' element={<Navigate to="" />}></Route>
      </Routes>


    </HistoryRouter>
  </Provider>

);
