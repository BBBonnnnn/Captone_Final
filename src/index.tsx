
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, unstable_HistoryRouter as HistoryRouter, Navigate } from 'react-router-dom';
import { createBrowserHistory, BrowserHistory } from 'history';
import Home from './pages/Home/Home';
import HeaderAndFooter from './templates/HeaderAndFooter';
import JobList from './pages/JobList/JobList';
import JobType from './pages/JobType/JobType';
import DetailJob from './pages/DetailJob/DetailJob';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { Provider } from 'react-redux'
import { store } from './redux/configStore';
import './assets/scss/style.scss'




export const history: BrowserHistory | any = createBrowserHistory();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>

        <Route path='' element={<HeaderAndFooter />}>
          <Route index element={<Home />}></Route>
          <Route path='/joblist' element={<JobList />}></Route>
          <Route path='/jobtype' element={<JobType />}></Route>
          <Route path='/detailjob' element={<DetailJob />}></Route>


          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='*' element={<Navigate to="" />}></Route>

          
        </Route>
        

      </Routes>


    </HistoryRouter>
  </Provider>

);
