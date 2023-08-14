import { createSlice } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore';
import { http } from '../../util/22-06-2023-08-41-20-config';

export interface job {
    id:                 number;
    congViec:           CongViec;
    tenLoaiCongViec:    string;
    tenNhomChiTietLoai: string;
    tenChiTietLoai:     string;
    tenNguoiTao:        string;
    avatar:             string;
}
export interface CongViec {
    id:                    number;
    tenCongViec:           string;
    danhGia:               number;
    giaTien:               number;
    nguoiTao:              number;
    hinhAnh:               string;
    moTa:                  string;
    maChiTietLoaiCongViec: number;
    moTaNgan:              string;
    saoCongViec:           number;
}
export interface StateType{
    infoJob: job[]
}

const initialState:StateType = {
   infoJob:[]
}

const getInfoJob = createSlice({
  name: 'getInfoJob',
  initialState,
  reducers: {
    getInfoJobAction: (state:StateType,action) => {
        state.infoJob = action.payload;
      
    },
  }
});

export const {getInfoJobAction} = getInfoJob.actions

export default getInfoJob.reducer

export const getInfoJobtApi = (id:any) => {
    return async (dispatch: DispatchType) => {
        let res = await http.get(`api/cong-viec/lay-cong-viec-chi-tiet/${id}`);
        if (res) {
           
            const action = getInfoJobAction(res.data.content);
            dispatch(action);
        }else{
            alert('Login failed please check again')
        }


    }
}
