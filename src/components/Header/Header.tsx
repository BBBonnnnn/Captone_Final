import React, { useEffect, useRef, ChangeEvent, MouseEvent, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getKeyWordAction } from '../../redux/reducers/searchString'
import { SearchOutlined } from '@ant-design/icons';
import { getjobListByNameApi } from '../../redux/reducers/jobListByName'
import { DispatchType, RootState } from '../../redux/configStore'
import { USER_LOGIN } from '../../util/22-06-2023-08-41-20-config'
import { UserLogin, UserProfile, getProfileAction, loginAction } from '../../redux/reducers/userReducer'
import { history } from '../..'
import { getDetailJobByJobIdApi } from '../../redux/reducers/detailJob'
import { DsChiTietLoai, DsNhomChiTietLoai, Item, getMenuJobtApi } from '../../redux/reducers/menuJob'
import styles from '../../styles/components/Header/header.module.scss'
type Props = {
}
const Header = (props: Props) => {
    const navigate = useNavigate();
    const { userLogin } = useSelector((state: RootState) => state.userReducer);
    const { contents } = useSelector((state: RootState) => state.menuJob);
    const keyword: any = useRef();
    const dispatch: DispatchType = useDispatch();
    const getjobListByNameApiFunction = async () => {
        const actionAsyns = getjobListByNameApi(keyword.current);
        dispatch(actionAsyns)
    };
    const renderLogin = () => {
        if (userLogin == null || userLogin.token == undefined) {
            return <>
                <li className="nav-item mx-4">
                    <NavLink className={`${styles.test} nav-link`} to="/login">Sign In</NavLink>
                </li>
            </>
        }
        return <>
            <li className="nav-item ">
                <span className="dropdown">
                    <span className=" dropdown-toggle"  data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa fa-user" aria-hidden="true" style={{ color: 'blue',cursor:'pointer' }}></i>
                    </span>
                    <ul className="dropdown-menu">
                        <NavLink className="nav-link" to="/infouser">
                            <li><a className="dropdown-item" href="#">Profile</a></li>
                        </NavLink>
                        <NavLink className="nav-link" to="/useradmin">
                            <li><a className="dropdown-item" href="#">Just for Admin</a></li>
                        </NavLink>  
                    </ul>
                </span>
            </li>
            <li className="nav-item">
                <span style={{ cursor: 'pointer' }} className={`${styles.test} nav-link`} onClick={() => {
                    localStorage.removeItem(USER_LOGIN);
                    localStorage.removeItem("userProfile");
                    let valueNull = {} as UserLogin;
                    const action = loginAction(valueNull);
                    dispatch(action);
                    let valueNull2 = {} as UserProfile;
                    const action2 = getProfileAction(valueNull2);
                    dispatch(action2);
                    history.push('/')
                }}>Logout</span>
            </li>
        </>
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        keyword.current = value;
    };
    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const action = getKeyWordAction(keyword.current);
        dispatch(action);
        const frm = document.getElementById('frm') as HTMLFormElement;
        getjobListByNameApiFunction();
        frm.reset();
        navigate(`/search/${keyword.current}`)
    };
    useEffect(() => {
        const actionAsync = getMenuJobtApi();
        dispatch(actionAsync);
    }, []);
    return (<div>
        <nav className="navbar navbar-expand-sm  text-danger bg-tertiary  border border-tertiary container-fluid w-100" style={{maxWidth:'100%'}}>
            <NavLink className="navbar-brand" to="/">
                <img src={process.env.PUBLIC_URL + '/assets/img/logo.png'} alt='...' style={{ width: '130px' }}></img>
            </NavLink>
            <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                    <form className="d-flex my-2 my-lg-0 navbar-form navbar-left " id='frm'>
                        <input className="form-control me-sm-2 p-2" type="text" placeholder="Search" id='keyword' style={{ width: '' }} onChange={handleChange} />
                        <button className="btn btn-outline-success my-2 my-sm-0 bg-success text-white px-3" type="submit" onClick={handleSubmit} ><SearchOutlined /></button>
                    </form>
                </ul>
                <ul className="navbar-nav mt-2 mt-lg-0 align-items-center">
                    <li className="nav-item mx-3">
                        <NavLink className={`${styles.test} nav-link`} to="/profile">Fiverr Business</NavLink>
                    </li>
                    <li className="nav-item mx-4">
                        <NavLink className={`${styles.test} nav-link`} to="/register">English</NavLink>
                    </li>
                    <li className="nav-item mx-4">
                        <NavLink className={`${styles.test} nav-link`} to="/register">Become a seller</NavLink>
                    </li>
                    {renderLogin()}
                    <li className="nav-item mx-4">
                        <NavLink className="nav-link btn btn-success border border-success" to="/register">Join</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
        <div>
            <ul className='border-bottom p-3 text-center d-flex justify-content-center'>
                {contents?.map((item: Item) => {
                    return <div className={`${styles.dropdown}`} key={item.id}>
                        <NavLink className={`${styles.dropbtn} mx-4 `} style={{ textDecoration: 'none', color: 'black' }} onClick={() => {
                        }} to={`/jobtype/${item.id}`}>{item.tenLoaiCongViec}</NavLink>
                        <div className={`${styles.dropdowncontent} text-center`} style={{ width: '280px' }}>
                            {item.dsNhomChiTietLoai.map((item: DsNhomChiTietLoai, index: number) => {
                                return <div className='text-center' key={index}>
                                    <div className='fw-bold'>{item.tenNhom}</div>
                                    {item.dsChiTietLoai.map((ite: DsChiTietLoai, index: number) => {
                                        return <div key={index}>
                                            <NavLink className='text-success' to={`/joblist/${ite.id}`} style={{ cursor: 'pointer', textDecoration: 'none' }} onClick={() => {
                                                const getdetailJobByJobIdApiFunction = async () => {
                                                    const actionAsyns: any = getDetailJobByJobIdApi(ite.id);
                                                    dispatch(actionAsyns)
                                                };
                                                getdetailJobByJobIdApiFunction()
                                            }}>
                                                {ite.tenChiTiet}
                                            </NavLink>
                                        </div>
                                    })}
                                </div>
                            })}
                        </div>
                    </div>
                })}
            </ul>
        </div>
    </div>
    )
}

export default Header