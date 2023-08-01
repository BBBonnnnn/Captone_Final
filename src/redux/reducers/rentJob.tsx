import { createSlice } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore';
import { http } from '../../util/22-06-2023-08-41-20-config';

const initialState = {
    rentJob:{
        id: 0,
        maCongViec: 0,
        maNguoiThue: 0,
        ngayThue: "",
        hoanThanh: true
    }
}

const rentJob = createSlice({
  name: 'rentJob',
  initialState,
  reducers: {
    rentJobAction:(state,action)=>{
        state.rentJob=action.payload
    }
  }
});

export const {rentJobAction} = rentJob.actions

export default rentJob.reducer

export const rentJobApi = (data:any) => {
    // console.log('here1');
    return async (dispatch: DispatchType) => {
        let res = await http.post('/api/thue-cong-viec',data);
        if (res) {
           
            const action = rentJobAction(res.data.content);
            dispatch(action);
            alert('Rent Job success!!')
        }else{
            alert('Rent Job fail!!!')
        }


    }
}