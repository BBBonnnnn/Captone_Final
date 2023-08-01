import { createSlice } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore';
import { http } from '../../util/22-06-2023-08-41-20-config';

const initialState = {
    commentData:{
         id: 0,
         maCongViec: 0,
         maNguoiBinhLuan: 0,
         ngayBinhLuan: "",
         noiDung: "",
         saoBinhLuan: 0
    }
}

const addComent = createSlice({
  name: 'addComent',
  initialState,
  reducers: {
    addCommentAction: (state,action) => {
        state.commentData = action.payload;
      
    },
  }
});

export const {addCommentAction} = addComent.actions

export default addComent.reducer

export const addCommentApi = (data:any) => {
    // console.log('here1');
    return async (dispatch: DispatchType) => {
        let res = await http.post('/api/binh-luan',data);
        if (res) {
           
            const action = addCommentAction(res.data.content);
            dispatch(action);
        }else{
            alert('Login failed please check again')
        }


    }
}