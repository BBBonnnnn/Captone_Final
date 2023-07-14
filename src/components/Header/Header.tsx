import React from 'react'
import img from '../../assets/img/logo.png'
import { NavLink } from 'react-router-dom'

type Props = {

}


const Header = (props: Props) => {
    return (

 <nav className="navbar navbar-expand-sm  text-danger bg-tertiary  border border-tertiary">
            <NavLink className="navbar-brand" to="/">
                <img src={img} alt='...' style={{ width: '130px' }}></img>
            </NavLink>
            <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                    <form className="d-flex my-2 my-lg-0 navbar-form navbar-left" id='frm'>
                        <input className="form-control me-sm-2 p-2" type="text" placeholder="Search" id='keyword' style={{width:'500px'}} />
                        <button className="btn btn-outline-success my-2 my-sm-0 bg-success text-white px-3" type="submit" >Search</button>
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
                    <li className="nav-item mx-4">
                        <NavLink className="nav-link" to="/register">Sign In</NavLink>
                    </li>
                    <li className="nav-item mx-4">
                    <button className="btn btn-outline-success my-2 mx-3 my-sm-0  px-4" type="submit" >Join</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header