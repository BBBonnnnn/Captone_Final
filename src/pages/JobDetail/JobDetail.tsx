import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Rate, Select, Space } from 'antd';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { HeartOutlined, } from '@ant-design/icons';
import { getDetailJobByJobIdApi } from '../../redux/reducers/detailJob';
import { DispatchType, RootState } from '../../redux/configStore';

type Props = {}
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];


const JobList = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
  
  const detailID = useRef();
  const { keyword } = useSelector((state: RootState) => state.searchStringReducer);
  const { arrDetailJob } = useSelector((state: RootState) => state.detailJob);
  const [value, setValue] = useState(3);
  const [menuJobList, setMenuJobList] = useState({
    content: [],
  });
  const [mainArrJob, setMainArrJob] = useState([]);
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const getdetailJobByJobIdApiFunction = async () => {
    const actionAsyns: any = getDetailJobByJobIdApi(detailID.current);
    dispatch(actionAsyns)
  };
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

  useEffect(() => {
    setMainArrJob(arrDetailJob);
  }, [arrDetailJob]);
  useEffect(() => {
    getMenuJobListApi();
  }, []);
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
      <div>
        <h3 className='my-4'>Resutl for "{keyword}"</h3>
        <div className='row'>
          <div className='col-8'>
            <span className="dropdown">
              <button className="btn btn-secondary dropdown-toggle mx-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Catagory
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </span>
            <span className="dropdown">
              <button className="btn btn-secondary dropdown-toggle mx-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Service Option
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </span>
            <span className="dropdown">
              <button className="btn btn-secondary dropdown-toggle mx-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Seller Detail
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </span>
            <span className="dropdown">
              <button className="btn btn-secondary dropdown-toggle mx-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Budget
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </span>
            <span className="dropdown">
              <button className="btn btn-secondary dropdown-toggle mx-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Delivery time
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </span>
          </div>
          <div className='col-4 d-flex justify-content-between align-items-center'>
            <div className="form-check form-switch mx-2">
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked />
              <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Pro Service</label>
            </div>
            <span className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked />
              <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Local Sellers</label>
            </span>
            <span className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked />
              <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Online Sellers</label>
            </span>
          </div>
        </div>
      </div>
      <div className='my-4 text-end '>
        <span>Sort by</span>
        <Select className='text-center mx-2'
          defaultValue="lucy"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
            { value: 'disabled', label: 'Disabled', disabled: true },
          ]}
        />
      </div>
      <div className='row my-4'>
        {mainArrJob?.map((item: any) => {
          return <div className='col-3'>
            <div className='card my-2' style={{ minHeight: '450px' }} >
              <img src={item.congViec.hinhAnh} alt="..." />
              <div className='card-body'>
                <div className='d-flex align-items-center justify-content-start flex-wrap'>
                  <img className='rounded-circle' src={item.avatar} alt="..." style={{ width: '40px', height: '40px' }} />
                  <div className='mx-4'>
                    <p style={{ height: '15px' }} className='fw-bold'>Admin</p>
                    <p style={{ height: '15px' }}>Level 4 for seller</p>
                  </div>

                </div>
                <p>{item.congViec.tenCongViec}</p>
                <div className='d-flex align-items-center justify-content-between'>
                  <p>
                    <Rate tooltips={desc} onChange={setValue} value={value} />
                    {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
                  </p>
                  <p className='d-flex align-items-center'>
                    <HeartOutlined style={{ fontSize: '20px', color: 'red' }} />
                    <span className='mx-1'>{item.congViec.danhGia}</span>
                  </p>
                </div>

              </div>
              <div className='card-footer '>
                <div className='row align-items-center'>
                  <div className='col-6' >
                    <NavLink to={`/infojob/${item.id}`}>View Detail</NavLink>
                  </div>
                  <div className='col-6'>
                    STARTING AT ${item.congViec.giaTien}
                  </div>
                </div>

              </div>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}
export default JobList

