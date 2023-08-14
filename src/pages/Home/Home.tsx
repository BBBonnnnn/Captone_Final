import React, { useRef, ChangeEvent, MouseEvent } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import { SearchOutlined } from '@ant-design/icons'
import { getKeyWordAction } from '../../redux/reducers/searchString'
import { useDispatch, useSelector } from 'react-redux'
import { getjobListByNameApi } from '../../redux/reducers/jobListByName'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { DispatchType, RootState } from '../../redux/configStore'
import { USER_LOGIN } from '../../util/22-06-2023-08-41-20-config'
import { UserLogin, UserProfile, getProfileAction, loginAction } from '../../redux/reducers/userReducer'
import _ from 'lodash';
import '../../styles/pages/Home/home.scss';
import { history } from '../..'
import Reponsive from '../../templates/Reponsive/Reponsive'
import HeaderMobile from '../../components/Header/HeaderMobile'
import UnderHeaderHomeMobile from './UnderHeaderHomeMobile'
import FooterMobile from '../../components/Footer/FooterMobile'
type AnyProps = any;
type Props = {};

const Home = (props: AnyProps) => {
  const dispatch: DispatchType = useDispatch();
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const keyword: any = useRef();
  const navigate = useNavigate();
  const getjobListByNameApiFunction = async () => {
    const actionAsyns = getjobListByNameApi(keyword.current);
    dispatch(actionAsyns)
  };
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
          <span className=" dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
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
  return (<div className='' style={{ overflow: 'hidden' }} >
    <Reponsive component={<nav className="navbar navbar-expand-sm  text-danger bg-tertiary" style={{ position: 'absolute', top: '0', left: '0', width: '100%', zIndex: 100 }}>
      <NavLink className="navbar-brand" to="/">
        <img src={process.env.PUBLIC_URL + '/assets/img/logo.png'} alt='...' style={{ width: '130px' }}></img>
      </NavLink>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
        </ul>
        <ul className="navbar-nav mt-2 mt-lg-0 align-items-center">

          <li className="nav-item mx-4">
            <NavLink className="nav-link  text-white" to="/">Explore</NavLink>
          </li>
          <li className="nav-item mx-4">
            <NavLink className="nav-link  text-white" to="/">English</NavLink>
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
    </nav>} mobileComponent={<HeaderMobile />} />
    <Reponsive component={<div className='row align-items-center' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/1.png)`, height: '800px', backgroundSize: 'cover', backgroundPosition: 'top' }}>
      <div className='col-6'>
        <div className='form-group text-center'>
          <h1 className='text-white' style={{ fontSize: '70px' }}>Find the perfect frelance services for your business</h1>
          <div className='my-4 text-center'>
            <form className="d-flex my-5 my-lg-0 navbar-form navbar-left" id='frm'>
              <input className="form-control  p-2" type="text" placeholder="Search" id='keyword' onChange={handleChange} />
              <button style={{ backgroundColor: '#1dbf73' }} className="btn btn-outline-success my-2 my-sm-0  text-white px-3" type="submit" onClick={handleSubmit}><SearchOutlined /></button>
            </form>
          </div>
          <ul className='row align-items-center'>
            <div className='col-2'>
              <div className='col-3 text-white me-2 ' style={{ listStyleType: 'none' }}>Popular:</div>
            </div>
            <div className='col-10 d-flex w-75 justify-content-start ' style={{ boxSizing: 'border-box' }}>
              <div className='me-3 text-white border p-1 rounded-pill' style={{ listStyleType: 'none' }}>Website Design</div>
              <div className='me-3 text-white border p-1 rounded-pill' style={{ listStyleType: 'none' }}>WordPress</div>
              <div className='me-3 text-white border p-1 rounded-pill' style={{ listStyleType: 'none' }}>Logo Design</div>
              <div className='me-3 text-white border p-1 rounded-pill' style={{ listStyleType: 'none' }}>Dropshipping</div>
            </div>
          </ul>
        </div>
      </div>
      <div className='col-6'>
      </div>
    </div>} mobileComponent={<UnderHeaderHomeMobile />} />
    <div className='mb-5'>
      <div className='text-center py-5' style={{ backgroundColor: '#f5f5f5' }}>
        <span className='mx-4'><img src={process.env.PUBLIC_URL + '/assets/img/fb.png'} alt="..." /></span>
        <span className='mx-4'><img src={process.env.PUBLIC_URL + '/assets/img/google.png'} alt="..." /></span>
        <span className='mx-4'><img src={process.env.PUBLIC_URL + '/assets/img/netflix.png'} alt="..." /></span>
        <span className='mx-4'><img src={process.env.PUBLIC_URL + '/assets/img/paypal.png'} alt="..." /></span>
        <span className='mx-4'><img src={process.env.PUBLIC_URL + '/assets/img/pg.png'} alt="..." /></span>
      </div>
      <h3 className='my-5'>Popular professional services</h3>
      <div className='container-fluid'>
        <Swiper {...props}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide >
            <img className='img' src={process.env.PUBLIC_URL + '/assets/img/crs1.png'} />
          </SwiperSlide>
          <SwiperSlide>
            <img className='img' src={process.env.PUBLIC_URL + '/assets/img/crs2.png'} />
          </SwiperSlide>
          <SwiperSlide>
            <img className='img' src={process.env.PUBLIC_URL + '/assets/img/crs3.png'} />
          </SwiperSlide>
          <SwiperSlide>
            <img className='img' src={process.env.PUBLIC_URL + '/assets/img/crs4.png'} />
          </SwiperSlide>
          <SwiperSlide>
            <img className='img' src={process.env.PUBLIC_URL + '/assets/img/crs5.png'} />
          </SwiperSlide>
          <SwiperSlide>
            <img className='img' src={process.env.PUBLIC_URL + '/assets/img/crs6.png'} />
          </SwiperSlide>
          <SwiperSlide>
            <img className='img' src={process.env.PUBLIC_URL + '/assets/img/crs7.png'} />
          </SwiperSlide>
          <SwiperSlide>
            <img className='img' src={process.env.PUBLIC_URL + '/assets/img/crs8.png'} />
          </SwiperSlide>
          <SwiperSlide>
            <img className='img' src={process.env.PUBLIC_URL + '/assets/img/crs10.png'} />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
    <div className=''>
      <div className='row  align-items-center' style={{ backgroundColor: '#bbf6fb' }}>
        <div className='col-sm-12 col-md-4  p-5'>
          <h1 >A Whole world of freelance talent at your fingertips</h1>
          <div>
            <h5><i className="fa fa-check mx-2" style={{ color: 'green' }}></i>The best for every budget</h5>
            <p>Find high-quality services at every price point. No hourly rates, just project-based pricing.</p>
          </div>
          <div>
            <h5><i className="fa fa-check mx-2" style={{ color: 'green' }}></i> Quality work done quickly</h5>
            <p>Find the right freelancer to begin working on your project within minutes</p>
          </div>
          <div>
            <h5><i className="fa fa-check mx-2" style={{ color: 'green' }}></i>Protected payments, every time</h5>
            <p>Always know what you'll pay upfront. Your payment is n't released until you approve the work</p>
          </div>
          <div>
            <h5><i className="fa fa-check mx-2" style={{ color: 'green' }}></i>24 / 7 support</h5>
            <p>Questions? Our round-the-clock support team is available to help anytime, anywhere.</p>
          </div>
        </div>
        <div className='col-sm-12 col-md-8 text-center'>
          <div>
            <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => {
              const videostart: any = document.getElementById('myVideo');
              videostart.play();
            }}>
              <div className='modalImg'>
                <img className="modal-img" src={process.env.PUBLIC_URL + '/assets/img/selling.png'} alt="..." />
              </div>
            </button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-hidden="true">
              <div className="modal-dialog modal-lg">
                <div className="modal-content" >
                  <video id='myVideo' controls preload="auto" width="100%" height="100%" >
                    <source src={process.env.PUBLIC_URL + '/assets/video/video1.mp4'} type="video/mp4" />
                  </video>
                </div>
              </div>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {
                const videopause: any = document.getElementById('myVideo');
                videopause.pause();
              }}>Close</button>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
      <div className='row align-items-center p-5' style={{ backgroundColor: '#eac4d4' }}>
        <div className=' col-sm-12 col-md-6 text-center'>
          <div>
            {/* Button trigger modal */}
            <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onClick={() => {
              const videostart2: any = document.getElementById('myVideo2');
              videostart2.play();
            }}>
              <div className='modalImg'>
                <img className="modal-img" src={process.env.PUBLIC_URL + '/assets/img/video2.png'} alt="..." />
              </div>
            </button>
            {/* Modal */}
            <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-hidden="true">
              <div className="modal-dialog modal-xl">
                <div className="modal-content" >
                  <video id='myVideo2' controls preload="auto" width="100%" height="100%" >
                    <source src={process.env.PUBLIC_URL + '/assets/video/video2.mp4'} type="video/mp4" />
                  </video>
                </div>
              </div>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {
                const videopause: any = document.getElementById('myVideo2');
                videopause.pause();
              }}>Close</button>
            </div>
          </div>
        </div>
        <div className=' col-sm-12 col-md-6 p-5'>
          <h3>Kay Kim, Co-Founder | rooted</h3>
          <h1 className='text-white'>"It's extremely exiciting that Fiverr has freelancers from all over the world- it broadens the talent pool.One of the best things about Fiverr is that while we're sleeping,someone's working". </h1>
        </div>
      </div>
      <div className='py-5'>
        <h3>Explore the marketplace</h3>
        <div className='row w-75 m-auto my-5'>
          <div className='col-sm-6 col-md-3' style={{ cursor: 'pointer' }} onClick={() => {
            {
              history.push('/jobtype/372')
            }
          }}>
            <img src={process.env.PUBLIC_URL + '/assets/img/coding.png'} alt='...' style={{ width: '100px' }}></img>
            <p>Programing & Tech</p>
          </div>
          <div className='col-sm-6 col-md-3' style={{ cursor: 'pointer' }} onClick={() => {
            history.push('/jobtype/5')
          }}>
            <img src={process.env.PUBLIC_URL + '/assets/img/listen.png'} alt='...' style={{ width: '100px' }}></img>
            <p>Music & Audio</p>
          </div>
          <div className='col-sm-6 col-md-3' style={{ cursor: 'pointer' }} onClick={() => {
            {
              history.push('/jobtype/371')
            }
          }}>
            <img src={process.env.PUBLIC_URL + '/assets/img/daily-tasks.png'} alt='...' style={{ width: '100px' }}></img>
            <p>Lifestyle</p>
          </div>
          <div className='col-sm-6 col-md-3' style={{ cursor: 'pointer' }} onClick={() => {
            {
              history.push('/jobtype/370')
            }
          }}>
            <img src={process.env.PUBLIC_URL + '/assets/img/database.png'} alt='...' style={{ width: '100px' }}></img>
            <p>Data</p>
          </div>
        </div>
        <div className='row w-75 m-auto my-5'>
          <div className='col-sm-6 col-md-3' style={{ cursor: 'pointer' }} onClick={() => {
            {
              history.push('/jobtype/1')
            }
          }}>
            <img src={process.env.PUBLIC_URL + '/assets/img/designer.png'} alt='...' style={{ width: '100px' }}></img>
            <p>Graphics & Design</p>
          </div>
          <div className='col-sm-6 col-md-3' style={{ cursor: 'pointer' }} onClick={() => {
            {
              history.push('/jobtype/4')
            }
          }}>
            <img src={process.env.PUBLIC_URL + '/assets/img/video-camera.png'} alt='...' style={{ width: '100px' }}></img>
            <p>Video & Animation</p>
          </div>
          <div className='col-sm-6 col-md-3' style={{ cursor: 'pointer' }} onClick={() => {
            {
              history.push('/jobtype/3')
            }
          }}>
            <img src={process.env.PUBLIC_URL + '/assets/img/writing.png'} alt='...' style={{ width: '100px' }}></img>
            <p>Writing & Translation</p>
          </div>
          <div className='col-sm-6 col-md-3' style={{ cursor: 'pointer' }} onClick={() => {
            {
              history.push('/jobtype/2')
            }
          }}>
            <img src={process.env.PUBLIC_URL + '/assets/img/team.png'} alt='...' style={{ width: '100px' }}></img>
            <p>Business</p>
          </div>
        </div>
      </div>
      <Reponsive component={<Footer />} mobileComponent={<FooterMobile />} />
    </div>
  </div>


  )
}

export default Home