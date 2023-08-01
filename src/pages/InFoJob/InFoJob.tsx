import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { getDetailJobByJobIdApi } from '../../redux/reducers/detailJob';
import axios from 'axios';
import { SketchOutlined, DownOutlined } from '@ant-design/icons';
import { RootState } from '../../redux/configStore';
import  {rentJobApi}  from '../../redux/reducers/rentJob';
import { addCommentApi } from '../../redux/reducers/addComent';
import { useFormik } from 'formik';
type Props = {}

const DetailJob = (props: Props) => {
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const { commentData } = useSelector((state: RootState) => state.addComent);
  const navigate =useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const [mainArrJob, setMainArrJob] = useState([]);
  const detailID = useRef();
  const [comment,setComment ]= useState([]);
  const [menuJobList, setMenuJobList] = useState({
    content: [],
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
      comment:'',
    },
    onSubmit:(value)=>{
      if(userLogin.token){
        const commentData = {
          id: 0,
          maCongViec: param.id,
          maNguoiBinhLuan: userLogin.user.id,
          ngayBinhLuan: formattedDate,
          noiDung: value.comment,
          saoBinhLuan: 5
        }
        const actionAsyns:any = addCommentApi(commentData);
        dispatch(actionAsyns);
      }
    }
  })
  // API lấy menu loại công việc
  const getMenuJobListApi = async () => {
    try {
      const res = await axios({
        url: 'https://fiverrnew.cybersoft.edu.vn/api/cong-viec/lay-menu-loai-cong-viec',
        method: 'GET',
        headers: {
          TokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`
        }
      })
      setMenuJobList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  // API comment
  const getCommentAPI = async () => {
    try {
      const res = await axios({
        url: `https://fiverrnew.cybersoft.edu.vn/api/binh-luan/lay-binh-luan-theo-cong-viec/${param.id}`,
        method: 'GET',
        headers: {
          TokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`
        }
      })
      setComment(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  const getdetailJobByJobIdApiFunction = async () => {
    const actionAsyns: any = getDetailJobByJobIdApi(detailID.current);
    dispatch(actionAsyns)
  };
  const getInFoJobApi = async () => {
    try {
      const res = await axios({
        url: `https://fiverrnew.cybersoft.edu.vn/api/cong-viec/lay-cong-viec-chi-tiet/${param.id}`,
        method: 'GET',
        headers: {
          TokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`
        }
      })
      setMainArrJob(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    getCommentAPI();
  },[commentData])
  useEffect(() => {
    getInFoJobApi();
    getCommentAPI();
    getMenuJobListApi();
  }, [])
  return (
    <div className='container'>
      <ul className='border-bottom p-3 text-center d-flex justify-content-center'>
        {menuJobList.content?.map((item: any) => {
          return <div className="dropdown mx-4" key={item.id}>
            <NavLink className='my-0 d-block ' style={{ textDecoration: 'none', color: 'black' }} onClick={() => {
            }} to={`/jobtype/${item.id}`}>{item.tenLoaiCongViec}</NavLink>
            <button className="btn btn-light dropdown-toggle p-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ width: '300px' }}>
              {item.dsNhomChiTietLoai.map((item: any, index: any) => {
                return <div className='text-center' key={index}>
                  <div className='fw-bold'>{item.tenNhom}</div>
                  {item.dsChiTietLoai.map((ite: any, index: any) => {
                    return <div key={index}>
                      <NavLink to={`/joblist/${ite.id}`} style={{ cursor: 'pointer' }} onClick={() => {
                        detailID.current = ite.id;
                        console.log('abccccc', detailID.current)
                        getdetailJobByJobIdApiFunction()
                      }}>
                        {ite.tenChiTiet}
                      </NavLink>
                    </div>
                  })}
                </div>
              })}
            </ul>
          </div>

        })}
      </ul>
      {mainArrJob.map((item: any) => {
        return <div>
          <div className='text-primary'>{item.tenLoaiCongViec} <i className="fa fa-angle-right mx-2"></i>{item.tenNhomChiTietLoai}<i className="fa fa-angle-right mx-2"></i>{item.tenChiTietLoai} </div>
          <div className='row'>
            <div className='col-6'>
              <h5>{item.congViec.tenCongViec}</h5>
              <div className='d-flex'>
                <img className='mx-2' src={item.avatar} alt="..." style={{ width: '30px', height: '30px' }} />
                <p>{item.tenNguoiTao}</p>
                <div className='mx-2'>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star me-2"></i>
                  ({item.congViec.danhGia})
                </div>
                <p className='mx-2'>4 Order in QueQue</p>
                <p className='mx-2'>FIVER'S CHOICE</p>
              </div>
              <hr />
              <p>
                <SketchOutlined />
                Buyers keep returning! Lorem ipsum dolor, sit amet consectetur adipisicing.
              </p>
              <p>
                <img src={item.congViec.hinhAnh} alt="..." style={{ width: '500px', height: '500px' }} />
                <div className='d-flex'>
                  <img src={item.congViec.hinhAnh} alt="..." style={{ width: '80px', height: '60px' }} className=' m-2' />
                  <img src={item.congViec.hinhAnh} alt="..." style={{ width: '80px', height: '60px' }} className=' m-2' />
                  <img src={item.congViec.hinhAnh} alt="..." style={{ width: '80px', height: '60px' }} className='m-2' />
                </div>
              </p>
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
                  <img src={item.avatar} alt="..." style={{ width: '150px' }} />
                  <div className='mx-3'>
                    <p>Name</p>
                    <p>Job</p>
                    <p>star</p>
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
                  <h3 className='d-inline mx-2'>335 Reviews</h3>
                  <span>
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
                      <p>(333)</p>
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
                    <div className='col-4'>
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
                {comment?.map((comment: any, index: number) => {
                  return <div key={index} className='my-4'>
                    <div className='d-flex justify-content-between'>
                      <div className='d-flex justify-content-between' style={{ width: '20%' }}>
                        <img src={comment.avatar} alt="" style={{ width: '50px' }} />
                        <p className=''>
                          {comment.tenNguoiBinhLuan}
                          <i className="fa fa-splotch ms-2"></i>
                          {comment.saoBinhLuan}
                          <p ><i className="fa fa-flag-usa"></i></p>
                        </p>
                      </div>
                      <div>
                        {comment.ngayBinhLuan}
                      </div>
                    </div>
                    <p className='my-2'>{comment.noiDung}</p>
                    <p>
                      <span ><i className="fa fa-thumbs-up"></i>Like</span>
                      <span className='mx-3'><i className="fa fa-thumbs-down"></i>Dislike</span>
                    </p>
                    <hr />  
                  </div>
                })}
                <img  className='mt-5' src="http://i.pravatar.cc?u=500" alt="" style={{width:'40px'}}/>
                <form className="form-floating my-1" onSubmit={frm.handleSubmit} id='frm'>
                  <textarea className="form-control" placeholder="Leave a comment here" id="comment" style={{ height: 100 }} defaultValue={""} name='comment' onChange={frm.handleChange} onBlur={frm.handleBlur} />
                  <label htmlFor="comment">Comments</label>
                  <button type='submit' className='btn btn-primary mt-5' style={{borderRadius:'0'}} onClick={()=>{
                  }}>Add comment</button>
                </form>
              </div>
            </div>
            <div className='col-6'>

              <div className="card" style={{ width: '30rem' }}>
                <div className='card-header d-flex justify-content-between  m-0 align-items-center'>
                  <p className='text-center m-0 border-end' style={{ width: '30%' }}>VIP</p>
                  <p className='text-center m-0 border-end' style={{ width: '40%' }}>CUSTOM</p>
                  <p className='text-center m-0' style={{ width: '30%' }}>NORMAL</p>
                </div>
                <div className="card-body">
                  <h5 className="card-title d-flex justify-content-between">
                    <p>Standard</p>
                    <p>1000$</p>
                  </h5>
                  <p className="card-text">Some quick example text to build on the card title and make.</p>
                  <div>
                    <p>Standard</p>
                    <p><i className="fab fa-viacoin"></i>Standard</p>
                    <p><i className="fab fa-viacoin"></i>Standard</p>
                    <p><i className="fab fa-viacoin"></i>Standard</p>
                    <p><i className="fab fa-viacoin"></i>Standard</p>
                    <p><i className="fab fa-viacoin"></i>Standard</p>
                  </div>
                  <div className='form-group'>
                    <button  className="btn btn-primary form-control" onClick={()=>{
                        if(userLogin == null){
                          navigate('/login')
                        }else if(userLogin.token){
                          const rentJobData = {
                            id: 0 ,
                            maCongViec: param.id,
                            maNguoiThue: userLogin.user.id,
                            ngayThue: '',
                            hoanThanh: true
                          }
                          const actionAsyns:any = rentJobApi(rentJobData);
                          dispatch(actionAsyns);
                        }
                    }}>Continue (1000$)</button>
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