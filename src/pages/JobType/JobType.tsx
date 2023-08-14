import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getDetailJobByJobIdApi } from '../../redux/reducers/detailJob';
import { DsChiTietLoai, DsNhomChiTietLoai, arrGroupJobType, getGroupJobApi } from '../../redux/reducers/getGroupJob';
import { DispatchType, RootState } from '../../redux/configStore';
import styles from '../../styles/pages/JobType/jobtype.module.scss'
import '../../styles/pages/JobType/animation.scss'
import Reponsive from '../../templates/Reponsive/Reponsive';
import { useSpring, animated } from '@react-spring/web'
type Props = {}
const JobType = (props: Props) => {
    const props1 = useSpring({
        from: { x: 0 },
        to: async (next) => {
            while (true) {
                await next({ x: 120 });
                await next({ x: 0 });
                await next({ x: -120 });
                await next({ x: 0 });
            }
        },
        config: { duration: 2000 },
    });
    const param = useParams();
    const dispatch: DispatchType = useDispatch();
    const { arrGroupJob } = useSelector((state: RootState) => state.getGroupJob);
    const { contents } = useSelector((state: RootState) => state.menuJob);
    const x: any = contents.find((item: any) => item.id == param.id);
    useEffect(() => {
        const actionAsyns = getGroupJobApi(param.id);
        dispatch(actionAsyns);
    }, [param.id])
    return (
        <div className='container-fluid'>
            <Reponsive component={<div className='carousel text-center'>
                <div style={{ height: '280px', backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/background.jpg)` }} className='d-flex justify-content-center align-items-center'>
                    <div className='text-center text-white'>
                        <h2>{x?.tenLoaiCongViec}</h2>
                        <p>Make you better everyday</p>
                        <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" className=' btn p-3 border border-white border-2 text-white' style={{ background: 'inherit', backgroundPosition: 'top', borderRadius: '5px' }} onClick={() => {
                            const videostart: any = document.getElementById('myVideo3');
                            videostart.play();
                        }}>
                            <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/desktop-play-button.c1196d6.png" alt="" style={{ width: '25px' }} className='mx-1' />
                            How Fiverr Works</button>
                    </div>
                    <div>
                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-hidden="true">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content" >
                                    <video id='myVideo3' controls preload="auto" width="100%" height="100%" >
                                        <source src={process.env.PUBLIC_URL + '/assets/video/video3.mp4'} type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                            <button type="button" className="btn btn-secondary text-center" data-bs-dismiss="modal" onClick={() => {
                                const videopause: any = document.getElementById('myVideo3');
                                videopause.pause();
                            }}>Close</button>
                        </div>
                    </div>
                </div>
                <h3 className='my-4 text-start'>
                    Most popular
                </h3>
                <div className='d-flex justify-content-center w-75 mx-auto'>
                    <animated.div
                        className='card mx-2 border border-success border-2'
                        style={{
                            width: '100%',
                            minHeight: '50px',
                            transform: props1.x.interpolate((x) => `translateX(${x}px)`),
                        }}
                    >
                        <div className='row align-items-center p-2'>
                            <div className='col-4'>
                                <img className='img' src={process.env.PUBLIC_URL + '/assets/img/typegrowth.png'} style={{ width: '100%', border: 'solid 1px' }} />
                            </div>
                            <div className='col-8'>
                                <p className='my-0' >Graphics & Design</p>
                            </div>
                        </div>
                    </animated.div>
                    <animated.div
                        className='card mx-2 border border-success border-2'
                        style={{
                            width: '100%',
                            minHeight: '50px',
                            transform: props1.x.interpolate((x) => `translateX(${x}px)`),
                        }}
                    >
                        <div className='row align-items-center p-2'>
                            <div className='col-4'>
                                <img className='img' src={process.env.PUBLIC_URL + '/assets/img/typeadvertising.png'} style={{ width: '100%', border: 'solid 1px' }} />
                            </div>
                            <div className='col-8'>
                                <p className='my-0' >Digital Marketing</p>
                            </div>
                        </div>
                    </animated.div>
                    <animated.div
                        className='card mx-2 border border-success border-2'
                        style={{
                            width: '100%',
                            minHeight: '50px',
                            transform: props1.x.interpolate((x) => `translateX(${x}px)`),
                        }}
                    >
                        <div className='row align-items-center p-2'>
                            <div className='col-4'>
                                <img className='img' src={process.env.PUBLIC_URL + '/assets/img/writing.png'} style={{ width: '100%', border: 'solid 1px' }} />
                            </div>
                            <div className='col-8'>
                                <p className='my-0' >Writing & Translation</p>
                            </div>
                        </div>
                    </animated.div>
                    <animated.div
                        className='card mx-2 border border-success border-2'
                        style={{
                            width: '100%',
                            minHeight: '50px',
                            transform: props1.x.interpolate((x) => `translateX(${x}px)`),
                        }}
                    >
                        <div className='row align-items-center p-2'>
                            <div className='col-4'>
                                <img className='img' src={process.env.PUBLIC_URL + '/assets/img/typevideo.png'} style={{ width: '100%', border: 'solid 1px' }} />
                            </div>
                            <div className='col-8'>
                                <p className='my-0' >Video & Animation</p>
                            </div>
                        </div>
                    </animated.div>
                    <animated.div
                        className='card mx-2 border border-success border-2'
                        style={{
                            width: '100%',
                            minHeight: '50px',
                            transform: props1.x.interpolate((x) => `translateX(${x}px)`),
                        }}
                    >
                        <div className='row align-items-center p-2'>
                            <div className='col-4'>
                                <img className='img' src={process.env.PUBLIC_URL + '/assets/img/typedatabase.png'} style={{ width: '100%', border: 'solid 1px' }} />
                            </div>
                            <div className='col-8'>
                                <p className='my-0' >Data</p>
                            </div>
                        </div>
                    </animated.div>
                    <animated.div
                        className='card mx-2 border border-success border-2'
                        style={{
                            width: '100%',
                            minHeight: '50px',
                            transform: props1.x.interpolate((x) => `translateX(${x}px)`),
                        }}
                    >
                        <div className='row align-items-center p-2'>
                            <div className='col-4'>
                                <img className='img' src={process.env.PUBLIC_URL + '/assets/img/typemusical.png'} style={{ width: '100%', border: 'solid 1px' }} />
                            </div>
                            <div className='col-8'>
                                <p className='my-0' >Music & Audio</p>
                            </div>
                        </div>
                    </animated.div>
                </div>
            </div>} mobileComponent={<div></div>} />
            <div>
                <div className='my-4'>
                    {arrGroupJob?.map((item: arrGroupJobType, index: number) => {
                        return <div className='row justify-content-center' key={index}>
                            <h3>Explore {item.tenLoaiCongViec}</h3>
                            {item.dsNhomChiTietLoai.map((item: DsNhomChiTietLoai, index: number) => {
                                return <div className={`card m-5 col-3 p-0 ${styles.cardCustom}`} style={{ minHeight: '500px' }} key={index} >
                                    <img src={item.hinhAnh} alt="..." />
                                    <div className='card-body text-center'>
                                        <h3>{item.tenNhom}</h3>
                                        {item.dsChiTietLoai.map((ite: DsChiTietLoai, index: number) => {
                                            return <div key={index}>
                                                <NavLink to={`/joblist/${ite.id}`} onClick={() => {
                                                    const getdetailJobByJobIdApiFunction = async () => {
                                                        const actionAsyns = getDetailJobByJobIdApi(ite.id);
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