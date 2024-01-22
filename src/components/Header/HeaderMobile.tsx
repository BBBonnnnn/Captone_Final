import React, { useRef, ChangeEvent, MouseEvent } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { DispatchType } from '../../redux/configStore';
import { useDispatch } from 'react-redux';
import { getKeyWordAction } from '../../redux/reducers/searchString';
import { getjobListByNameApi } from '../../redux/reducers/jobListByName';
import { history } from '../..'
type Props = {}

const HeaderMobile = (props: Props) => {
    const navigate = useNavigate();
    const keyword: any = useRef();
    const dispatch: DispatchType = useDispatch();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        keyword.current = value;
    };
    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const action = getKeyWordAction(keyword.current);
        dispatch(action);
        const getjobListByNameApiFunction = async () => {
            const actionAsyns = getjobListByNameApi(keyword.current);
            dispatch(actionAsyns)
        };
        const frm = document.getElementById('frm') as HTMLFormElement;
        getjobListByNameApiFunction();
        frm.reset();
        navigate(`/search/${keyword.current}`)
    };
    return (
        <div style={{ overflow: 'hidden' }}>
            <div className='row align-items-center' style={{ backgroundColor: 'white' }}>
                <div className='col-4'>
                    <button className="btn btn-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="19" viewBox="0 0 23 19"><rect y="16" width="23" height="3" rx="1.5" fill="#555"></rect><rect width="23" height="3" rx="1.5" fill="#555"></rect><rect y="8" width="23" height="3" rx="1.5" fill="#555"></rect></svg>
                    </button>
                    <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex={-1} id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Fiverr</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
                        </div>
                        <div className="offcanvas-body">
                            {/* <p>Try scrolling the rest of the page to see this option in action.</p> */}
                            <ul className="navbar-nav mt-2 mt-lg-0 align-items-center">
                                <li className="nav-item mx-4">
                                    <NavLink className="nav-link btn btn-success border border-success p-2" to="/register">Join Fiverr</NavLink>
                                </li>
                                <li className="nav-item mx-3">
                                    <NavLink className='' to="/login">Sign In</NavLink>
                                </li>
                                <li className="nav-item mx-4">
                                    <NavLink className='' to="/profile">Explore</NavLink>
                                </li>
                                <li className="nav-item mx-4">
                                    <NavLink className='' to="/register">Become a seller</NavLink>
                                    <hr />
                                </li>
                                <li className="nav-item mx-4">
                                    <NavLink className='' to="/register">English</NavLink>
                                </li>
                                <li className="nav-item mx-4">
                                    <NavLink className='' to="/register">USD</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div className='col-8 row justify-content-center align-items-center'>
                    <NavLink className="navbar-brand col-6 text-center" to="/">
                        <img src={process.env.PUBLIC_URL + '/assets/img/logo.png'} alt='...' style={{ width: '85px' }}></img>
                    </NavLink>
                    <div className='col-6 text-end fs-3' style={{cursor:'pointer'}} onClick={()=>{
                         history.push('/register')
                    }}>join</div>
                </div>
            </div>
        </div>

    )
}

export default HeaderMobile