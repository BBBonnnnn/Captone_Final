import React, { useRef } from 'react'
import img from '../../assets/img/logo.png'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getKeyWordAction } from '../../redux/reducers/searchString'
import { SearchOutlined } from '@ant-design/icons';
import { getjobListByNameApi } from '../../redux/reducers/jobListByName'
import { RootState } from '../../redux/configStore'
import { USER_LOGIN } from '../../util/22-06-2023-08-41-20-config'
import { UserLogin, loginAction } from '../../redux/reducers/userReducer'
import { history } from '../..'
type Props = {

}

const Header = (props: Props) => {
    const navigate = useNavigate();
    const { userLogin } = useSelector((state: RootState) => state.userReducer)
    const keyword = useRef();
    const dispatch = useDispatch();
    const getjobListByNameApiFunction = async () => {
        const actionAsyns: any = getjobListByNameApi(keyword.current);
        dispatch(actionAsyns)
    };
    const renderLogin = () => {
        if (userLogin == null) {
            return <>
                <li className="nav-item mx-4">
                    <NavLink className="nav-link" to="/login">Sign In</NavLink>
                </li>
            </>
        }
        return <>
            <li className="nav-item">
                <NavLink className="nav-link" to="/infouser">
                    <i className="fa fa-user" aria-hidden="true" style={{color:'blue'}}></i>
                </NavLink>
            </li>
            <li className="nav-item">
                <span style={{ cursor: 'pointer' }} className="nav-link" onClick={() => {
                    //clear localstore,cookie => dispatch userLogin = {}
                    localStorage.removeItem(USER_LOGIN);
                    localStorage.removeItem("userProfile");
                    //dispatch
                    let valueNull = {} as UserLogin;
                    const action = loginAction(valueNull);
                    dispatch(action);
                    history.push('/login')
                }}>Logout</span>
            </li>
        </>
    }
    const handleChange = (e: any) => {
        const { value } = e.target;
        keyword.current = value;
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const action = getKeyWordAction(keyword.current);
        dispatch(action);
        const frm = document.getElementById('frm') as HTMLFormElement;
        getjobListByNameApiFunction();
        frm.reset();
        navigate(`/search/${keyword.current}`)
    };
    return (
        <nav className="navbar navbar-expand-sm  text-danger bg-tertiary  border border-tertiary container-fluid">
            <NavLink className="navbar-brand" to="/">
                <img src={img} alt='...' style={{ width: '130px' }}></img>
            </NavLink>
            <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                    <form className="d-flex my-2 my-lg-0 navbar-form navbar-left" id='frm'>
                        <input className="form-control me-sm-2 p-2" type="text" placeholder="Search" id='keyword' style={{ width: '400px' }} onChange={handleChange} />
                        <button className="btn btn-outline-success my-2 my-sm-0 bg-success text-white px-3" type="submit" onClick={handleSubmit} ><SearchOutlined /></button>
                    </form>
                </ul>
                <ul className="navbar-nav mt-2 mt-lg-0">
                    <li className="nav-item mx-3">
                        <NavLink className="nav-link" to="/profile">Fiverr Business</NavLink>
                    </li>
                    <li className="nav-item mx-4">
                        <NavLink className="nav-link" to="/profile">Explore</NavLink>
                    </li>
                    <li className="nav-item mx-4">
                        <NavLink className="nav-link" to="/register">English</NavLink>
                    </li>
                    <li className="nav-item mx-4">
                        <NavLink className="nav-link" to="/register">USD</NavLink>
                    </li>
                    <li className="nav-item mx-4">
                        <NavLink className="nav-link" to="/register">Become a seller</NavLink>
                    </li>
                    {/* <li className="nav-item mx-4">
                        <NavLink className="nav-link" to="/login">{renderLogin()}</NavLink>
                    </li> */}
                    {renderLogin()}
                    <li className="nav-item mx-4">
                        <NavLink className="nav-link btn btn-success border border-success" to="/register">Join</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header