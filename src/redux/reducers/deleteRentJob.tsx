import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../util/22-06-2023-08-41-20-config';

const initialState = {
    newArrJob : []
}

const deleteRentJob = createSlice({
  name: 'deleteRentJob',
  initialState,
  reducers: {
    deleteJobAction:(state,action)=>{
            state.newArrJob = action.payload
    }
   
}
  
});

export const {deleteJobAction} = deleteRentJob.actions

export default deleteRentJob.reducer

export const deleteJobApi =(id:number) =>{
   
    return async (dispatch:any) =>{
        let res = await http.delete(`/api/thue-cong-viec/${id}`);
        try{
            const action  = deleteJobAction(res.data.content);
            dispatch(action);
            alert('Delete Success!!');
            window.location.reload();
        }catch(err){
            alert('Delete Fail!!');
        }
    }
}

