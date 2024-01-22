import React from 'react'
import { NavLink } from 'react-router-dom'

type Props = {}

const FooterMobile = (props: Props) => {
    return (
        <div className='container row m-auto' style={{ paddingBottom: '100px' }}>
            <hr />
            <div className='col-md-3 col-sm-6 col-6 '>
                <h3>Catagoles</h3>
                <p>Graphics & Design</p>
                <p>Digital Marketing</p>
                <p>Writring & Translation</p>
                <p>Video & Animation</p>
                <p>Music & Audio</p>
                <p>Programing & Tech</p>
                <p>Data</p>
                <p>Business</p>
                <p>Lifestyle</p>
                <p>Sittemap</p>
            </div>
            <div className='col-md-3 col-sm-6 col-6'>
                <h3>About</h3>
                <p>Careers</p>
                <p>Press & News</p>
                <p>Partnerships</p>
                <p>Pravicy Policy</p>
                <p>Term of service</p>
                <p>Intellectual Property Clalms</p>
                <p>Investor Relations</p>
            </div>
            <div className='col-md-3 col-sm-6 col-6'>
                <h3>Community</h3>
                <p>Events</p>
                <p>Blog</p>
                <p>Forum</p>
                <p>Community Standards</p>
                <p>Podcast</p>
                <p>Invite a Friend</p>
                <p>Become a seller</p>
                <p>Fiverr Elevate</p>
            </div>
            <div className='col-md-3 col-sm-6 col-6'>
                <h3>More From Fiverr</h3>
                <p>Fiverr Pro</p>
                <p>Fiverr Studio</p>
                <p>Fiverr Logo Maker</p>
                <p>Fiverr Guides</p>
                <p>Get Insplred</p>
                <p>ClearVoice</p>
                <p>AND CO</p>
                <p>Learn</p>
            </div>
            <hr />
            <div className='row'>
                <div className='col-md-4 col-sm-12 align-items-center d-flex justify-content-center my-2'>
                    <img src={process.env.PUBLIC_URL + '/assets/img/logo-footer.png'} alt='...' style={{ width: '100px' }}></img>
                    <span className='mx-3'><i className="fa fa-copyright" style={{ color: '#01f33c' }}></i> Fiverr InterNational Ltd.2021</span>
                </div>
                <hr />
                <div className='col-md-4 col-sm-12 text-center my-2'>
                    <NavLink to="https://www.facebook.com/Fiverr/?locale=vi_VN" >
                        <img className='mx-3' src={process.env.PUBLIC_URL + '/assets/img/facebook.png'} style={{ width: '15px' }} />
                    </NavLink>
                    <NavLink to="https://www.instagram.com/fiverr/" >
                        <img className='mx-3' src={process.env.PUBLIC_URL + '/assets/img/instagram.png'} style={{ width: '15px' }} />
                    </NavLink>
                    <NavLink to="https://twitter.com/fiverr?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" >
                        <img className='mx-3' src={process.env.PUBLIC_URL + '/assets/img/twitter.png'} style={{ width: '15px' }} />
                    </NavLink>
                    <NavLink to="https://www.linkedin.com/company/fiverr-com" >
                        <img className='mx-3' src={process.env.PUBLIC_URL + '/assets/img/linkedin.png'} style={{ width: '15px' }} />
                    </NavLink>
                    <NavLink to="https://www.youtube.com/@fiverr" >
                        <img className='mx-3' src={process.env.PUBLIC_URL + '/assets/img/youtube.png'} style={{ width: '15px' }} />
                    </NavLink>
                </div>
                <hr />
                <div className='col-md-4 col-sm-12 text-center' >
                    <i className="fa fa-globe-americas mx-2">English</i>
                    <span className='mx-2'>$USD</span>
                    <i className="fa fa-people-carry mx-2" style={{ color: '#01f33c' }}></i>
                </div>
                <hr />
            </div>
        </div>
    )
}

export default FooterMobile