import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../util/22-06-2023-08-41-20-config';
import { DispatchType } from '../configStore';

export interface itemJob {
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
    arrDetailJob: itemJob[]
}


const initialState:StateType = {
    arrDetailJob:[]
}

const detailJob = createSlice({
  name: 'detailJob',
  initialState,
  reducers: {
    getDetailJobAction:(state:StateType,action)=>{
        state.arrDetailJob=action.payload
    }
  }
});
export const {getDetailJobAction} = detailJob.actions
export default detailJob.reducer
export const getDetailJobByJobIdApi=(id:number)=>{
    return async (dispatch:DispatchType) =>{
        try {
            const res = await http.get(`api/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${id}`)
            const action = getDetailJobAction(res.data.content);
            dispatch(action)
        }
        catch(err){
            console.log(err)
    }
}}