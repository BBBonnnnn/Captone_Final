import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { DispatchType, RootState } from '../../redux/configStore';
import { rentJobApi } from '../../redux/reducers/rentJob';
import { addCommentApi } from '../../redux/reducers/addComent';
import { useFormik } from 'formik';
import { commentType, getCommentApi } from '../../redux/reducers/getComent';
import { getInfoJobtApi, job } from '../../redux/reducers/getInfoJob';
import { history } from '../..'
import styles from '../../styles/pages/InFoJob/infojob.module.scss'
type Props = {}
const DetailJob = (props: Props) => {
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const { commentData } = useSelector((state: RootState) => state.addComent);
  const { arrComment } = useSelector((state: RootState) => state.getComent);
  const { infoJob } = useSelector((state: RootState) => state.getInfoJob);
  const dispatch: DispatchType = useDispatch();
  const param = useParams();
  const [pricePackage, setPricePackeage] = useState({
    namepackage: 'BASIC',
    price: 1000,
    time: 15,
    page: 1
  });
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${hours}:${minutes}:${seconds} , ${day}/${month}/${year}`;
  const frm = useFormik({
    initialValues: {
      comment: '',
    },
    onSubmit: (value) => {
      if (userLogin.token) {
        const commentDataa = {
          id: 0,
          maCongViec: param.id,
          maNguoiBinhLuan: userLogin.user.id,
          ngayBinhLuan: formattedDate,
          noiDung: value.comment,
          saoBinhLuan: 5
        }
        const actionAsyns = addCommentApi(commentDataa);
        dispatch(actionAsyns);
      }
    }
  })
  const getComment = () => {
    const actionAsyns = getCommentApi(param.id)
    dispatch(actionAsyns)
  }
  const getInfoJob = () => {
    const actionAsyns = getInfoJobtApi(param.id)
    dispatch(actionAsyns)
  }
  useEffect(() => {
    getComment();
  }, [commentData])
  useEffect(() => {
    getInfoJob();
    getComment();
  }, [])
  return (
    <div className='container'>
      {infoJob.map((item: job, index: number) => {
        return <div key={index}>
          <div className='text-primary'>{item.tenLoaiCongViec} <i className="fa fa-angle-right mx-2"></i>{item.tenNhomChiTietLoai}<i className="fa fa-angle-right mx-2"></i>{item.tenChiTietLoai} </div>
          <div className='row'>
            <div className='col-md-6 col-sm-12'>
              <h4>{item.congViec.tenCongViec}</h4>
              <div className='d-flex'>
                <img className='mx-2 rounded-circle' src={item.avatar} alt="..." style={{ width: '30px', height: '30px' }} />
                <p>{item.tenNguoiTao}</p>
                <div className='mx-2' style={{ color: '#f8f64d ' }}>
                  Top Rated Seller |
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star me-2"></i>
                  <span style={{ color: '#11a94e' }}>({item.congViec.danhGia})</span>
                </div>
                <p className='mx-2'>4 Order in QueQue</p>
                <p className='mx-2 border border-success'>FIVER'S CHOICE</p>
              </div>
              <hr />
              <p>
                <img src={process.env.PUBLIC_URL + '/assets/img/best-seller.png'} alt="..." style={{ width: '45px' }} className='me-3' />
                <b>Buyers keep returning!</b> {item.tenNguoiTao} has an exceptional number of repeat buyers.
              </p>
              <div>
                <img src={item.congViec.hinhAnh} alt="..." style={{ width: '500px', height: '500px' }} />
                <div className='d-flex'>
                  <img src={item.congViec.hinhAnh} alt="..." style={{ width: '80px', height: '60px' }} className=' m-2' />
                  <img src={item.congViec.hinhAnh} alt="..." style={{ width: '80px', height: '60px' }} className=' m-2' />
                  <img src={item.congViec.hinhAnh} alt="..." style={{ width: '80px', height: '60px' }} className='m-2' />
                </div>
              </div>
              <div className='mt-5'>
                <h3> About this gif</h3>
                <p>Top Rated Seller with all positive reviews</p>
                <p> {item.congViec.moTa}</p>
                <p className='my-5'>Things i offer</p>
                <ul className='mx-3'>
                  <li>CRM Development</li>
                  <li>E-commerce Development</li>
                  <li>Custom website Development (both front-end and back-end) with Laravel, PHP and MySQL</li>
                  <li>Vue.js,HTML, CSS,Bootstrap,Javascript/Jquery,PHP single/multl web page</li>
                  <li>Complete website creatIon from scratch using Laravel Rest API and vue.js</li>
                  <li>Web applycation with proper exception handling </li>
                  <li>Can work with APIs, Integrate API's in your applycation</li>
                  <li>Reponsive - Mobile friendly sites</li>
                  <li>Great UI/UX for your site</li>
                  <li>PSD to HTML, XD to HTML or any other design to HTML with best quality and perfect design </li>
                  <li>Fix issues in front-end or add some changes to it</li>
                  <li>Bug investigation and Bug fixing</li>
                  <li>MySQL database design and integration in website</li>
                  <li>MySQL database bugs fixing and integration issues fixing</li>
                </ul>
                <p>I will do the work until you satisfied with fast and responsive communication</p>
              </div>
              <hr />
              <div className='d-flex'>
                <div>
                  <p>Programming language</p>
                  <p>Javascript</p>
                </div>
                <div className='mx-5'>
                  <p>Expertise</p>
                  <p>Cross Browser</p>
                  <p>Compathbility</p>
                  <p>PSD to HTML, Performantce</p>
                </div>
              </div>
              <div className='my-3'>
                <h3>About the Seller</h3>
                <div className='d-flex'>
                  <img src={item.avatar} alt="..." style={{ width: '150px' }} className='rounded-circle' />
                  <div className='mx-3'>
                    <p>Name :{item.tenNguoiTao} </p>
                    <p>Job:{item.tenLoaiCongViec}</p>
                    <p>
                      star:
                      <span className='mx-2' style={{ color: '#f8f64d ' }}>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star me-2"></i>
                      </span>
                    </p>
                    <button>Contact Me</button>
                  </div>
                </div>
              </div>
              <div className='my-5 group '>
                <h3 className='my-4'>FAQ</h3>
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Do you provide regular update on order?
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Do you give post-development support?
                      </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        How do you gurantee product qaulity and rellablity?
                      </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseThree">
                        Do you convert PSD to HTML?
                      </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='rate row'>
                <div className='col-6'>
                  <h3 className='d-inline mx-2'>{infoJob?.map((item: job) => {
                    return <span key={item.id}>
                      {item.congViec.danhGia}
                    </span>
                  })} Reviews</h3>
                  <span style={{ color: '#f8f64d ' }}>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </span>
                  <div className='row align-items-center'>
                    <div className='col-3 d-flex flex-column justify-content-end' >
                      <p>5 Stars</p>
                      <p>4 Stars</p>
                      <p>3 Stars</p>
                      <p>2 Stars</p>
                      <p>1 Stars</p>
                    </div>
                    <div className='col-7'>
                      <div>
                        <div className="progress my-4" role="progressbar" aria-label="Basic example" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
                          <div className="progress-bar bg-warning" style={{ width: '97%' }} />
                        </div>
                        <div className="progress my-4" role="progressbar" aria-label="Basic example" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                          <div className="progress-bar bg-warning" style={{ width: '3%' }} />
                        </div>
                        <div className="progress my-4" role="progressbar" aria-label="Basic example" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}>
                          <div className="progress-bar bg-warning" style={{ width: '0%' }} />
                        </div>
                        <div className="progress my-4" role="progressbar" aria-label="Basic example" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                          <div className="progress-bar bg-warning" style={{ width: '0%' }} />
                        </div>
                        <div className="progress my-4" role="progressbar" aria-label="Basic example" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}>
                          <div className="progress-bar bg-warning" style={{ width: '0%' }} />
                        </div>
                      </div>
                    </div>
                    <div className='col-2'>
                      <p>{infoJob?.map((item: job) => {
                        return <span key={item.id}>
                          ({item.congViec.danhGia})
                        </span>
                      })}</p>
                      <p>(2)</p>
                      <p>(0)</p>
                      <p>(0)</p>
                      <p>(0)</p>
                    </div>
                  </div>
                </div>
                <div className='col-6 text-end'>
                  <div className="dropdown">
                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Dropdown link
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Action</a></li>
                      <li><a className="dropdown-item" href="#">Another action</a></li>
                      <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                  </div>

                  <div className='row mt-4'>
                    <p className='text-start'>Rating breakdown</p>
                    <div className='col-8 text-start'>
                      <p>Seller communication level</p>
                      <p>Recommend to a friend</p>
                      <p>Service as described</p>
                    </div>
                    <div className='col-4' style={{ color: '#f8f64d ' }}>
                      <p>
                        5<i className="fa fa-star"></i>
                      </p>
                      <p>
                        5<i className="fa fa-star"></i>
                      </p>
                      <p>
                        5<i className="fa fa-star"></i>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='filter'>
                <h3 className='my-3'>Filter</h3>
                <span className='mx-2'>Sort by</span>
                <div className="dropdown d-inline">
                  <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Industry
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </div>
              </div>
              <hr />
              <div className='comment'>
                {arrComment?.map((comment: commentType, index: number) => {
                  return <div key={index} className='my-4'>
                    <div className='row justify-content-between'>
                      <div className='justify-content-between col-8' >
                        <img src={comment.avatar} alt="" style={{ width: '50px', height: '50px' }} className='' />
                        <span className=''>
                          {comment.tenNguoiBinhLuan}
                        </span>
                      </div>
                      <div className='col-4 text-end'>
                        {comment.ngayBinhLuan}
                      </div>
                    </div>
                    <p className='my-2'>{comment.noiDung}</p>
                    <p>
                      <span ><i className="fa fa-thumbs-up"></i>Like</span>
                      <span className='mx-3'><i className="fa fa-thumbs-down"></i>Dislike</span>
                      <i className="fa fa-splotch ms-2" style={{ color: '#f8f64d ' }}></i>
                      {comment.saoBinhLuan}
                    </p>
                    <hr />
                  </div>
                })}
                <img className='mt-5' src={process.env.PUBLIC_URL + '/assets/img/listen.png'} alt="" style={{ width: '40px',border:'solid 1px' }} />
                <form className="form-floating my-1" onSubmit={frm.handleSubmit} id='frm'>
                  <textarea className="form-control" placeholder="Leave a comment here" id="comment" style={{ height: 100 }} defaultValue={""} name='comment' onChange={frm.handleChange} onBlur={frm.handleBlur} />
                  <label htmlFor="comment">Comments</label>
                  <button type='submit' className='btn btn-primary mt-5' style={{ borderRadius: '0' }} onClick={() => {
                  }}>Add comment</button>
                </form>
              </div>
            </div>
            <div className='col-md-6 col-sm-12'>
              <div className="card" style={{ width: '75%' }}>
                <div className='card-header  text-white d-flex justify-content-between  m-0 align-items-center p-3' style={{ backgroundColor: '#14c55b' }}>
                  <p className={`text-center m-0 border-end ${styles.cardbuton}`} style={{ width: '30%', cursor: 'pointer' }} onClick={() => {
                    setPricePackeage({
                      namepackage: 'BASIC',
                      price: 1000,
                      time: 15,
                      page: 1
                    })
                  }}>BASIC</p>
                  <p className={`text-center m-0 border-end ${styles.cardbuton}`} style={{ width: '40%', cursor: 'pointer' }} onClick={() => {
                    setPricePackeage({
                      namepackage: 'STANDARD',
                      price: 2000,
                      time: 25,
                      page: 3
                    })
                  }}>STANDARD</p>
                  <p className={`text-center m-0 ${styles.cardbuton}`} style={{ width: '30%', cursor: 'pointer' }} onClick={() => {
                    setPricePackeage({
                      namepackage: 'PREMIUM',
                      price: 4000,
                      time: 35,
                      page: 5
                    })
                  }}>PREMIUM</p>
                </div>
                <div className="card-body mt-5">
                  <h5 className="card-title d-flex justify-content-between">
                    <p style={{ color: '#14c55b' }}>{pricePackage.namepackage}</p>
                    <p style={{ color: '#14c55b' }}>{pricePackage.price}$</p>
                  </h5>
                  <p className="card-text my-5">Some quick example text to build on the card title and make.</p>
                  <div>
                    <p>{pricePackage.time} Day delivery</p>
                    <p><i className="fa fa-check me-3" style={{ color: '#14c55b' }}></i>Design Customization</p>
                    <p><i className="fa fa-check me-3" style={{ color: '#14c55b' }}></i>Content Upload</p>
                    <p><i className="fa fa-check me-3" style={{ color: '#14c55b' }}></i>Reponsive Design</p>
                    <p><i className="fa fa-check me-3" style={{ color: '#14c55b' }}></i>Include Source Code</p>
                    <p><i className="fa fa-check me-3" style={{ color: '#14c55b' }}></i>{pricePackage.page} Page</p>
                  </div>
                  <div className='form-group'>
                    <button style={{ backgroundColor: '#14c55b',color:'white' }} className={`btn  form-control ${styles.cardbuton}`} onClick={() => {
                      if (userLogin == null) {
                        alert('You need Sign-In !!')
                        history.push('/login')
                      } else if (userLogin.token) {
                        const rentJobData = {
                          id: 0,
                          maCongViec: param.id,
                          maNguoiThue: userLogin.user.id,
                          ngayThue: '',
                          hoanThanh: true
                        }
                        const actionAsyns = rentJobApi(rentJobData);
                        dispatch(actionAsyns);
                      }
                    }}>Continue ({pricePackage.price}$)</button>
                    <h5 className='mt-4 text-center' style={{ color: '#14c55b' }}>Compare packages</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      })}
    </div>
  )
}

export default DetailJob