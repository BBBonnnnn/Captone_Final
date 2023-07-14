import React from 'react'
import Header from '../components/Header/Header'
import {Outlet} from 'react-router-dom'
import Footer from '../components/Footer/Footer'
type Props = {}

const HeaderAndFooter = (props: Props) => {
  return (
    <>
        <Header></Header>


        <div className='content' style={{minHeight:'700px'}}>
            <Outlet></Outlet>
        </div>


        <Footer></Footer>
    </>
  )
}

export default HeaderAndFooter