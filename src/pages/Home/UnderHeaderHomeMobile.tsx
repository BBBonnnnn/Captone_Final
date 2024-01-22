import React, { ChangeEvent, MouseEvent, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { DispatchType } from '../../redux/configStore';
import { getKeyWordAction } from '../../redux/reducers/searchString';
import { useNavigate } from 'react-router-dom';
import { getjobListByNameApi } from '../../redux/reducers/jobListByName';
import { SearchOutlined } from '@ant-design/icons';

type Props = {}

const UnderHeaderHomeMobile = (props: Props) => {
  const keyword: any = useRef();
  const navigate = useNavigate();
  const dispatch: DispatchType = useDispatch();
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

  return (
    <div className='form-group ' style={{backgroundColor:'#0a4226',height:'400px',padding:'120px 40px'}} >
        <h1 className='text-white text-center' style={{fontSize:'40px'}}>Find the perfect frelance services for your business</h1>
        <div className='my-4 text-center'>
            <form className="d-flex my-5 my-lg-0 navbar-form navbar-left" id='frm'>
              <input className="form-control  p-2" type="text" placeholder="Search" id='keyword' onChange={handleChange} />
              <button style={{ backgroundColor: '#1dbf73' }} className="btn btn-outline-success  my-sm-0  text-white px-3" type="submit" onClick={handleSubmit}><SearchOutlined /></button>
            </form>
          </div>
    </div>
  )
}

export default UnderHeaderHomeMobile