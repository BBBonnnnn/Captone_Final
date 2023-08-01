import React, { useEffect, useState } from 'react'
import { Carousel } from 'antd';
import { AlertOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import { getDetailJobByJobIdApi } from '../../redux/reducers/detailJob';
type Props = {}

const contentStyle: React.CSSProperties = {
    height: '250px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const JobType = (props: Props) => {
    const param = useParams();
    const dispatch = useDispatch();
    const { keyword } = useSelector((state: any) => state.searchStringReducer);
    const [value, setValue] = useState(3);

    const [menuJobList, setMenuJobList] = useState({
        content: [],
    });
    const [mainArrJob, setMainArrJob] = useState([]);
    // API lấy menu loại công việc
    const getmenuJobListApi = async () => {
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
    // API chi tiết loại công việc theo mã loại công việc
    const getGroupJobByJobId = async () => {
        try {
            const res = await axios({
                url: `https://fiverrnew.cybersoft.edu.vn/api/cong-viec/lay-chi-tiet-loai-cong-viec/${param.id}`,
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
    
    useEffect(() => {
        getmenuJobListApi();
    }, []);
    useEffect(() => {
        getGroupJobByJobId();
    }, [param.id])
    return (
        <div className='container-fluid'>
            <div className='border-bottom p-3 text-center d-flex justify-content-center'>
                {menuJobList.content?.map((item: any) => {
                    return <div className='mx-3'>
                        <NavLink to={`/jobtype/${item.id}`} className='d-block' style={{textDecoration:'none',color:'black' }}>{item.tenLoaiCongViec}</NavLink>  
                    </div>
                })}
            </div>
            <div className='carousel'>
                <Carousel autoplay>
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
                <h3 className='my-4'>
                    Most popular in Graphics & Design
                </h3>
                <div className='d-flex justify-content-center'>
                    <div>
                        <div className='d-flex align-items-center p-4'>
                            <AlertOutlined />
                            <p className='mx-2 my-0'>Minimalist Logo design</p>
                        </div>
                    </div>
                    <div>
                        <div className='d-flex align-items-center p-4'>
                            <AlertOutlined />
                            <p className='mx-2 my-0'>Minimalist Logo design</p>
                        </div>

                    </div>
                    <div>
                        <div className='d-flex align-items-center p-4'>
                            <AlertOutlined />
                            <p className='mx-2 my-0'>Minimalist Logo design</p>
                        </div>

                    </div>
                    <div>
                        <div className='d-flex align-items-center p-4'>
                            <AlertOutlined />
                            <p className='mx-2 my-0'>Minimalist Logo design</p>
                        </div>

                    </div>
                    <div>
                        <div className='d-flex align-items-center p-4'>
                            <AlertOutlined />
                            <p className='mx-2 my-0'>Minimalist Logo design</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='my-4'>
                    {mainArrJob?.map((item: any) => {
                        return <div className='row justify-content-center'>
                            <h3>Explore {item.tenLoaiCongViec}</h3>
                            {item.dsNhomChiTietLoai.map((item: any) => {
                                return <div className='card m-5 col-3 p-0' style={{ minHeight: '500px' }}>
                                    <img src={item.hinhAnh} alt="..." />
                                    <div className='card-body text-center'>
                                        <h3>{item.tenNhom}</h3>
                                            {item.dsChiTietLoai.map((ite:any)=>{
                                                return <div>
                                                    <NavLink to={`/joblist/${ite.id}`} onClick={()=>{
                                                        const getdetailJobByJobIdApiFunction = async () => {
                                                            const actionAsyns: any = getDetailJobByJobIdApi(ite.id);
                                                            dispatch(actionAsyns)
                                                          };
                                                          getdetailJobByJobIdApiFunction()
                                                    }}> <p>{ite.tenChiTiet}</p></NavLink>
                                                    
                                                </div>
                                            })}
                                    </div>
                                </div>
                            })}
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default JobType