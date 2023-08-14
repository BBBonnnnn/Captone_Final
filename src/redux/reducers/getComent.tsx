import { createSlice } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore';
import { http } from '../../util/22-06-2023-08-41-20-config';

export interface commentType {
    ngayBinhLuan:     any;
    noiDung:          string;
    saoBinhLuan:      number;
    tenNguoiBinhLuan: string;
    avatar:           string;
}
export interface StateType{
    arrComment: commentType[]
}
const initialState:StateType = {
    arrComment:[]
}
const getComent = createSlice({
  name: 'getComent',
  initialState,
  reducers: {
    getCommentAction: (state,action) => {
        state.arrComment = action.payload;
    },
  }
});
export const {getCommentAction} = getComent.actions
export default getComent.reducer
export const getCommentApi = (id:string|undefined) => {
    return async (dispatch: DispatchType) => {
        let res = await http.get(`/api/binh-luan/lay-binh-luan-theo-cong-viec/${id}`);
        if (res) {
            const action = getCommentAction(res.data.content);
            dispatch(action);
        }else{
            alert('Get comment fail!!')
        }


    }
}
