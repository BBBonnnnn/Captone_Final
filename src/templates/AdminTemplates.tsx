import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../redux/configStore'
import { UserLogin, UserProfile, getProfileAction, loginAction } from '../redux/reducers/userReducer'
import { USER_LOGIN } from '../util/22-06-2023-08-41-20-config'
import _ from 'lodash';
type Props = {}

const AdminTemplates = (props: Props) => {
    const dispatch: DispatchType = useDispatch();
    const { userLogin } = useSelector((state: RootState) => state.userReducer);
    const emptyObject = {};
    const isObjectEmpty = _.isEqual(userLogin, emptyObject);
    const renderLogin = () => {
        if (userLogin == null || isObjectEmpty) {
            return <>
                <NavLink className="nav-link text-white" to="/login">Sign In</NavLink>
            </>
        }
        return <>
            <span className="nav-item">
            <span className="dropdown">
                    <span className=" dropdown-toggle"  data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa fa-user" aria-hidden="true" style={{ color: 'blue' }}></i>
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
            </span>
            <span className="nav-item">
                <span style={{ cursor: 'pointer', color: 'white' }} className="nav-link" onClick={() => {
                    localStorage.removeItem(USER_LOGIN);
                    localStorage.removeItem("userProfile");
                    let valueNull = {} as UserLogin;
                    const action = loginAction(valueNull);
                    dispatch(action);
                    let valueNull2 = {} as UserProfile;
                    const action2 = getProfileAction(valueNull2);
                    dispatch(action2);
                }}>Logout</span>
            </span>
        </>
    }
    return (<div >
        <nav className="navbar navbar-expand-sm  text-danger bg-tertiary container-fluid" style={{ width: '100%', zIndex: 100, backgroundColor: '#00421a' }}>
            <NavLink className="navbar-brand" to="/">
                <img src={process.env.PUBLIC_URL + '/assets/img/logo.png'} alt='...' style={{ width: '130px' }}></img>
            </NavLink>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                </ul>
                <ul className="navbar-nav mt-2 mt-lg-0 align-items-center">
                    <li className="nav-item mx-3 ">
                        <NavLink className="nav-link  text-white" to="/">Fiverr Business</NavLink>
                    </li>
                    <li className="nav-item mx-4">
                        <NavLink className="nav-link  text-white" to="/">Explore</NavLink>
                    </li>
                    <li className="nav-item mx-4">
                        <NavLink className="nav-link  text-white" to="/">English</NavLink>
                    </li>
                    <li className="nav-item mx-4">
                        <NavLink className="nav-link  text-white" to="/">USD</NavLink>
                    </li>
                    <li className="nav-item mx-4">
                        <NavLink className="nav-link  text-white" to="/">Become a seller</NavLink>
                    </li>
                    {renderLogin()}
                    <li className="nav-item mx-4">
                        <NavLink className="nav-link btn btn-success border border-success  text-white" to="/register">Join</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
        <div className='row container-fluid'>
            <div className='col-2 text-center pt-5' style={{ borderRight: "3px solid #28a745", backgroundColor: "#f8f9fa" }}>
                <NavLink className="nav-link mb-3" to="/useradmin"><i className="fas fa-user me-2"></i> User Management</NavLink>
                <NavLink className="nav-link mb-3" to="/jobadmin"><i className="fas fa-briefcase me-2"></i>Job Management</NavLink>
                <NavLink className="nav-link mb-3" to="/categoryadmin"> <i className="fas fa-list-alt me-2"></i>Job Category Management</NavLink>
                <NavLink className="nav-link" to="/serviceadmin"><i className="fas fa-cog me-2"></i>Service Management</NavLink>
            </div>
            <div className='col-10'>
                <div className='content container-fluid' style={{ minHeight: '700px' }}>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
        <Footer />
    </div>
    )
}

export default AdminTemplates