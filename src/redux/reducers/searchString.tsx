import { createSlice,PayloadAction } from '@reduxjs/toolkit'

interface KeywordState {
  keyword:string
}

const initialState:KeywordState = {
    keyword:'',
}

const searchString = createSlice({
  name: 'searchStringReducer',
  initialState,
  reducers: {
    getKeyWordAction:(state:KeywordState,action)=>{
        state.keyword=action.payload
    }
  }
});

export const {getKeyWordAction} = searchString.actions

export default searchString.reducer