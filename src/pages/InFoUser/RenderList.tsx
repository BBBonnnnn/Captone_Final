import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { RenderListInterface, getRenderListApi } from '../../redux/reducers/renderListReducer';
import { deleteJobApi, } from '../../redux/reducers/deleteRentJob';
import { Button, message, Popconfirm } from 'antd';
import { NavLink } from 'react-router-dom';
type Props = {}
const RenderList: React.FC = (props: Props) => {
    const dispatch: DispatchType = useDispatch();
    const getRenderList = async () => {
        const actionAsync = getRenderListApi();
        dispatch(actionAsync);
    }
    const { renderList } = useSelector((state: RootState) => state.renderListReducer);
    const { newArrJob } = useSelector((state: RootState) => state.deleteRentJob);

    useEffect(() => {
        getRenderList()
    }, [])
    return (
        <div className='container'>
            {renderList.map((prod: RenderListInterface, index: number) => {
                const confirm = (e: React.MouseEvent<HTMLElement> | void) => {
                    console.log(e);
                    message.success('Click on Yes');
                    const deleteJob = async () => {
                        const actionAsync = deleteJobApi(prod.id);
                        dispatch(actionAsync);
                    }
                    deleteJob();
                };
                const cancel = (e: React.MouseEvent<HTMLElement> | void) => {
                    console.log(e);
                    message.error('Click on No');
                };
                return <div key={index}>
                    <div className='d-flex justify-content-between align-items-center my-3'>
                        <div className='w-25'>
                            <img src={prod.congViec.hinhAnh} alt="...." className='w-100' />
                        </div>
                        <div className='w-75 ms-5'>
                            <h5>{prod.congViec.tenCongViec}</h5>
                            <p>{prod.congViec.moTaNgan}</p>
                            <div className='d-flex justify-content-between align-items-center mx-3'>
                                <span><i className="fa-solid fa-star fs-5" style={{ color: '#ffdd00' }} />{prod.congViec.saoCongViec}</span>
                                <span className='fs-5' style={{ color: 'red' }}>{prod.congViec.giaTien}$</span>
                            </div>
                        </div>
                    </div>
                    <div className='my-3 text-end'>
                        <NavLink to={`/infojob/${prod.congViec.id}`} ><button className='mx-2 btn btn-success'>View detail</button></NavLink>
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this job?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger onClick={() => {
                            }}>Delete</Button>
                        </Popconfirm>
                        <hr />
                    </div>
                </div>
            })}


        </div>



    )
}

export default RenderList