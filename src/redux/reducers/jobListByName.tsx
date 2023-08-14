import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../util/22-06-2023-08-41-20-config';
import { DispatchType } from '../configStore';

interface CongViec {
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


export interface itemType {
    id:                 number;
    congViec:           CongViec;
    tenLoaiCongViec:    string;
    tenNhomChiTietLoai: string;
    tenChiTietLoai:     string;
    tenNguoiTao:        string;
    avatar:             string;
}

    


interface StateType {
    arrJob:itemType[]
}


const initialState:StateType = {
    arrJob:[],
}

const jobListByName = createSlice({
  name: 'jobListByName',
  initialState,
  reducers: {
    getArrJobListByNameAction:(state,action)=>{
        state.arrJob=action.payload;
    },
   
  }
});
export const {getArrJobListByNameAction} = jobListByName.actions

export default jobListByName.reducer


export const getjobListByNameApi=(key:number|undefined )=>{
        return async (dispatch:DispatchType) =>{
            try {
                const res = await http.get(`/api/cong-viec/lay-danh-sach-cong-viec-theo-ten/${key}`)
                const action = getArrJobListByNameAction(res.data.content);
                dispatch(action)
            }
            catch(err){
                console.log('Fail !!!')
        }
}}
