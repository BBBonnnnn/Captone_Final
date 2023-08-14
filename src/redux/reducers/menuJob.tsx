import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../util/22-06-2023-08-41-20-config';

export interface Item {
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
export interface StateType {
    contents:Item[]
}

const initialState = {
      contents: [],
}

const menuJob = createSlice({
  name: 'menuJob',
  initialState,
  reducers: {
    getMenuJobAction :(state,action) =>{
        state.contents = action.payload;
    }
  }
});

export const {getMenuJobAction} = menuJob.actions

export default menuJob.reducer

export const getMenuJobtApi =() =>{
    return async (dispatch:any ) =>{
        let res = await http.get('/api/cong-viec/lay-menu-loai-cong-viec');
        if(res){
            const action= getMenuJobAction(res.data.content);
            dispatch(action);
        }else{
            alert('get menujob fail !!');
        }
    }
}