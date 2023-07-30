import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore';
import { http } from '../../util/22-06-2023-08-41-20-config (1)';


export interface RenderListInterface {
    id: number;
    ngayThue: string;
    hoanThanh: boolean;
    congViec: {
      id: number;
      tenCongViec: string;
      danhGia: number;
      giaTien: number;
      nguoiTao: number;
      hinhAnh: string;
      moTa: string;
      maChiTietLoaiCongViec: number;
      moTaNgan: string;
      saoCongViec: number;
    };
  }

interface RenderListState {
    renderList: RenderListInterface[],
}

const initialState : RenderListState = {
    renderList : []
}

const renderListReducer = createSlice({
  name: 'renderListReducer',
  initialState,
  reducers: {
    getRenderListAction :(state:RenderListState, action:PayloadAction<RenderListInterface[]>) =>{
        state.renderList = action.payload;
        
    }
  }
});

export const {getRenderListAction} = renderListReducer.actions

export default renderListReducer.reducer

export const getRenderListApi =() =>{
    return async (dispatch : DispatchType) =>{
        let res = await http.get('/api/thue-cong-viec/lay-danh-sach-da-thue');
        if(res){
            const action : PayloadAction<RenderListInterface[]> = getRenderListAction(res.data.content);
            dispatch(action);
        }else{
            alert('Khong the lay dc da sach da thue');
        }
    }
}