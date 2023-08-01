import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    arrDetailJob:[]
}

const detailJob = createSlice({
  name: 'detailJob',
  initialState,
  reducers: {
    getDetailJobAction:(state,action)=>{
        state.arrDetailJob=action.payload
    }
  }
});

export const {getDetailJobAction} = detailJob.actions

export default detailJob.reducer

export const getDetailJobByJobIdApi=(id:any)=>{
    return async (dispatch:any) =>{
        try {
            const res = await axios({
                url: `https://fiverrnew.cybersoft.edu.vn/api/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${id}`,
                method: 'GET',
                headers: {
                  TokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`
                }
              })
            const action = getDetailJobAction(res.data.content);
            dispatch(action)
        }
        catch(err){
            console.log(err)
    }
}}