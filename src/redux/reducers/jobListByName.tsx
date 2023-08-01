import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
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


export const getjobListByNameApi=(key:any)=>{
        return async (dispatch:any) =>{
            try {
                const res = await axios({
                    url: `https://fiverrnew.cybersoft.edu.vn/api/cong-viec/lay-danh-sach-cong-viec-theo-ten/${key}`,
                    method: 'GET',
                    headers: {
                        TokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`
                    }
                })
                const action = getArrJobListByNameAction(res.data.content);
                dispatch(action)
            }
            catch(err){
                console.log(err)
        }
}}