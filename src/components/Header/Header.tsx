import React from 'react'
import img from '../../assets/img/logo.png'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/configStore'
import { USER_LOGIN } from '../../util/22-06-2023-08-41-20-config (1)'
import { UserLogin, loginAction } from '../../redux/reducers/userReducer'
import { history } from '../..'
import { FormValue } from '../../pages/Login/Login'

type Props = {

}


const Header = (props: Props) => {
    const { userLogin } = useSelector((state: RootState) => state.userReducer)

    const dispatch: DispatchType = useDispatch();
    const renderLogin = () => {
        if (userLogin.token) {
            return <>

                 <li className="nav-item">
                    <span style={{ cursor: 'pointer' }} className="nav-link" onClick={() => {
                        //clear localstore,cookie => dispatch userLogin = {}
                        localStorage.removeItem(USER_LOGIN);
                        //dispatch
                         let valueNull = {  } as UserLogin;
                         const action = loginAction(valueNull);
                         dispatch(action);
                        history.push("/");
                    }}>Logout</span>
                </li> 
            </>
        }
        return <>
            <li className="nav-item mx-4">
                <NavLink className="nav-link" to="/register">Register</NavLink>
            </li>
            <li className="nav-item mx-4">
                <NavLink className="nav-link border border-success btn btn-outline-success my-2 mx-3 my-sm-0  px-4" to="/login">Join</NavLink>

            </li>
        </>
    }








    return (

        <nav className="navbar navbar-expand-sm  text-danger bg-tertiary  border border-tertiary">
            <NavLink className="navbar-brand" to="/">
                <img src={img} alt='...' style={{ width: '130px' }}></img>
            </NavLink>
            <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                    <form className="d-flex my-2 my-lg-0 navbar-form navbar-left" id='frm'>
                        <input className="form-control me-sm-2 p-2" type="text" placeholder="Search" id='keyword' style={{ width: '500px' }} />
                        <button className="btn btn-outline-success my-2 my-sm-0 bg-success text-white px-3" type="submit" >Search</button>
                    </form>
                </ul>
                <ul className="navbar-nav mt-2 mt-lg-0">
                    {renderLogin()}

                </ul>
            </div>
        </nav>
    )
}

export default Header