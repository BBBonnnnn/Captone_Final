import { createSlice } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore';
import { http } from '../../util/22-06-2023-08-41-20-config';

const initialState = {
    getJobById:{
        id: 0,
        maCongViec: 0,
        maNguoiThue: 0,
        ngayThue: "",
        hoanThanh: true
    }
}

const getJobById = createSlice({
  name: 'getJobById',
  initialState,
  reducers: {
    getJobByIdAction:(state,action)=>{
        state.getJobById=action.payload
    }
  }
});

export const {getJobByIdAction} = getJobById.actions

export default getJobById.reducer

export const getJobByIdApi = (id:any) => {
    // console.log('here1');
    return async (dispatch: DispatchType) => {
        let res = await http.post(`/api/thue-cong-viec/${id}`);
        if (res) {
           
            const action = getJobByIdAction(res.data.content);
            dispatch(action);
            alert('Rent Job success!!')
        }else{
            alert('Rent Job fail!!!')
        }


    }
}