import React, { ChangeEvent, MouseEvent, useRef } from 'react'
import Header from '../components/Header/Header'
import {Outlet, useNavigate} from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import HeaderMobile from '../components/Header/HeaderMobile'
import Reponsive from '../templates/Reponsive/Reponsive'
import FooterMobile from '../components/Footer/FooterMobile'

type Props = {}

const HeaderAndFooter = (props: Props) => {
  return (
    <>
        <Reponsive component={<Header/>} mobileComponent={<HeaderMobile/>}/>
        <div className='content' style={{minHeight:'700px'}}>
            <Outlet></Outlet>
        </div>
        <Reponsive component={<Footer/>} mobileComponent={<FooterMobile/>}/>
    </>
  )
}

export default HeaderAndFooter