import React from 'react'
import imgFooter from '../../assets/img/logo-footer.png'
type Props = {}

const Footer = (props: Props) => {
  return (
    <div className='container row m-auto' style={{paddingBottom:'100px'}}>
        <hr />
        <div className='col-3'>
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
        <div className='col-3'>
        <h3>About</h3>
          <p>Careers</p>
          <p>Press & News</p>
          <p>Partnerships</p>
          <p>Pravicy Policy</p>
          <p>Term of service</p>
          <p>Intellectual Property Clalms</p>
          <p>Investor Relations</p>
        </div>
        <div className='col-3'>
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
        <div className='col-3'>
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
        <div className='row '>
      <div className='col-4 align-items-center d-flex'>
      <img src={imgFooter} alt='...' style={{ width: '100px' }}></img>
      <span className='mx-3'><i className="fa fa-copyright"></i> Fiverr InterNational Ltd.2021</span>
      </div>
      <div className='col-4 text-center'>
      <i className="fab fa-facebook mx-3"></i>
      <i className="fab fa-instagram mx-3"></i>
      <i className="fab fa-twitter mx-3"></i>
      <i className="fab fa-linkedin mx-3"></i>
      <i className="fab fa-youtube mx-3"></i>
      </div>
      <div className='col-4 text-center'>
      <i className="fa fa-globe-americas mx-2">English</i>
      <span className='mx-2'>$USD</span>
      <i className="fa fa-people-carry mx-2"></i>
      </div>
        </div>

       
    </div>
  )
}

export default Footer