import { createSlice } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore';
import { http } from '../../util/22-06-2023-08-41-20-config';

export interface arrGroupJobType {
    id:                number;
    tenLoaiCongViec:   string;
    dsNhomChiTietLoai: DsNhomChiTietLoai[];
}
export interface DsNhomChiTietLoai {
    id:             number;
    tenNhom:        string;
    hinhAnh:        string;
    maLoaiCongviec: number;
    dsChiTietLoai:  DsChiTietLoai[];
}
export interface DsChiTietLoai {
    id:         number;
    tenChiTiet: string;
}
interface StateType {
    arrGroupJob:arrGroupJobType[]
}

const initialState:StateType = {
  arrGroupJob:[]
}

const getGroupJob = createSlice({
  name: 'getGroupJob',
  initialState,
  reducers: {
    getGroupJobAction:(state,action)=>{
        state.arrGroupJob=action.payload;
    },
  }
});

export const {getGroupJobAction} = getGroupJob.actions

export default getGroupJob.reducer

export const getGroupJobApi=(id:number|string|undefined )=>{
    return async (dispatch:DispatchType) =>{
        try {
            const res = await http.get(`/api/cong-viec/lay-chi-tiet-loai-cong-viec/${id}`)
            const action = getGroupJobAction(res.data.content);
            dispatch(action)
        }
        catch(err){
            console.log('Fail !!!')
    }
}}
