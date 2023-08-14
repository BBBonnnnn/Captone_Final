import React, { useEffect, useState } from 'react'
import { Rate, Select } from 'antd';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HeartOutlined, } from '@ant-design/icons';
import { RootState } from '../../redux/configStore';
import { itemJob } from '../../redux/reducers/detailJob';
import styles from '../../styles/pages/JobDetail/jobdetail.module.scss'
import _ from 'lodash'
import Reponsive from '../../templates/Reponsive/Reponsive';
type Props = {}
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
const JobList = (props: Props) => {
  const [arrMain, setArrMain] = useState<itemJob[]>();
  const { arrDetailJob } = useSelector((state: RootState) => state.detailJob);
  const [value, setValue] = useState(5);
  const handleChange = (value: string) => {
    if (value === 'lowtohigh') {
      let arrPriceItem = _.sortBy(arrDetailJob, _.property('congViec.giaTien'));
      setArrMain(arrPriceItem)
    } else if (value === 'hightolow') {
      let arrPriceItem = _.sortBy(arrDetailJob, _.property('congViec.giaTien')).reverse();
      setArrMain(arrPriceItem);
    }
  };
  useEffect(() => {
    setArrMain(arrDetailJob)
  }, [arrDetailJob])
  return (
    <div className='container'>
      <div>
        <h3 className='my-4'>Resutl for "{arrDetailJob[1]?.tenChiTietLoai}"</h3>
        <Reponsive component={<div className='row'>
          <div className='col-8'>
            <Select
              className='px-2'
              defaultValue="Category"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: 'disabled', label: ' All Category', disabled: true },
                { value: 'jack', label: 'Web Programing (20,566)' },
                { value: 'lucy', label: 'Data Entry (12,566)' },
              ]}
            />
            <Select
              className='px-2'
              defaultValue="Service Options"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: 'disabled', label: ' All Category', disabled: true },
                { value: 'jack', label: 'Web Programing (20,566)' },
                { value: 'lucy', label: 'Data Entry (12,566)' },
              ]}
            />
            <Select
              className='px-2'
              defaultValue="Seller Details"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: 'disabled', label: ' All Category', disabled: true },
                { value: 'jack', label: 'Web Programing (20,566)' },
                { value: 'lucy', label: 'Data Entry (12,566)' },
              ]}
            />
            <Select
              className='px-2'
              defaultValue="Delivery Time"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: 'disabled', label: ' All Category', disabled: true },
                { value: 'jack', label: 'Web Programing (20,566)' },
                { value: 'lucy', label: 'Data Entry (12,566)' },
              ]}
            />
            <Select
              className='px-2'
              defaultValue="Service Options"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: 'disabled', label: ' All Category', disabled: true },
                { value: 'jack', label: 'Web Programing (20,566)' },
                { value: 'lucy', label: 'Data Entry (12,566)' },
              ]}
            />
          </div>
          <div className='col-4 row justify-content-between align-items-center'>
            <div className="form-check form-switch col-4">
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked />
              <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Pro Service</label>
            </div>
            <div className="form-check form-switch col-4">
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked />
              <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Local Sellers</label>
            </div>
            <div className="form-check form-switch col-4">
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked />
              <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Online Sellers</label>
            </div>
          </div>
        </div>} mobileComponent={<div></div>} />
      </div>
      <div className='row mt-4 align-items-center'>
        <p className='col-6 fs-4 text-primary'>
          {arrDetailJob.length} services available
        </p>
        <p className='col-6 text-end'>
          <span>Sort Price</span>
          <Select
            className='mx-2'
            defaultValue="Delivery Time"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: 'disabled', label: ' All Category', disabled: true },
              { value: 'lowtohigh', label: 'Low-to-high' },
              { value: 'hightolow', label: 'high-to-low' },
            ]}
          />
        </p>
      </div>
      <div className='row my-4'>
        {arrMain?.map((item: itemJob, index: number) => {
          return <div className='col-md-3 col-sm-12' key={index}>
            <div className={`card my-2 ${styles.cardCustom}`} style={{ minHeight: '450px', borderRadius: '10px' }} >
              <img src={item.congViec.hinhAnh} alt="..." style={{ borderRadius: '10px' }} />
              <div className='card-body'>
                <div className='d-flex align-items-center justify-content-start flex-wrap'>
                  <img className='rounded-circle border border-3 border-success' src={item.avatar} alt="..." style={{ width: '55px', height: '55px' }} />
                  <div className='mx-4'>
                    <p style={{ height: '15px' }} className='fw-bold'>Admin</p>
                    <p style={{ height: '15px' }}>Level 4 for seller</p>
                  </div>

                </div>
                <p>{item.congViec.tenCongViec}</p>
                <div className='d-flex align-items-center justify-content-between'>
                  <p>
                    <Rate tooltips={desc}  value={value} />
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
                    <NavLink to={`/infojob/${item.id}`} style={{ textDecoration: 'none' }}><i className={`fa fa-arrow-right me-3 ${styles.viewdetail}`} ></i>VIEW DETAIL</NavLink>
                  </div>
                  <div className='col-6 text-end'>
                    PRICE
                    <span className={`ms-2 ${styles.price}`}>${item.congViec.giaTien}</span>
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

