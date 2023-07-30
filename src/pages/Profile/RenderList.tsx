import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { RenderListInterface, getRenderListApi } from '../../redux/reducers/renderListReducer';

type Props = {}

const RenderList = (props: Props) => {
    const { renderList } = useSelector((state: RootState) => state.renderListReducer);
    const dispatch: DispatchType = useDispatch();
    const getRenderList = async () => {
        const actionAsync = getRenderListApi();
        dispatch(actionAsync);
    }
    useEffect(() => {
        getRenderList()

    }, [])

    return (
        <div className='container'>

            <h3> Home</h3>


            {/* <CardProduct prod={product} /> */}
            {renderList.map((prod:RenderListInterface, index: number) => {
                return <div className='d-flex justify-content-between align-items-center my-3 border' key={index}>
                <div className='w-25'>
                    <img src={prod.congViec.hinhAnh} alt="...." className='w-100' />
                </div>
    
                <div className='w-75 ms-5'>
                    <h3>{prod.congViec.tenCongViec}</h3>
                    <p>{prod.congViec.moTaNgan}</p>
                    <div className='d-flex justify-content-between align-items-center mx-3'>
                        <span><i className="fa-solid fa-star" style={{ color: '#ffdd00' }} />{prod.congViec.saoCongViec}</span>
                        <span>{prod.congViec.giaTien}$</span>
                    </div>
                </div>
            </div>
            })}



        </div>



    )
}

export default RenderList