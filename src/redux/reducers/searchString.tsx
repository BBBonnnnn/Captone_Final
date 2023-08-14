import { createSlice,PayloadAction } from '@reduxjs/toolkit'

interface KeywordState {
  keyword:string|undefined
}

const initialState:KeywordState = {
    keyword:'',
}

const searchString = createSlice({
  name: 'searchStringReducer',
  initialState,
  reducers: {
    getKeyWordAction:(state:KeywordState,action:PayloadAction<string|undefined>)=>{
        state.keyword=action.payload
    }
  }
});

export const {getKeyWordAction} = searchString.actions

export default searchString.reducer