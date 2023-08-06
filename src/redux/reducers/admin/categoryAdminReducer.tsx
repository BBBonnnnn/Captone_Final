import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DispatchType } from '../../configStore';
import { http } from '../../../util/22-06-2023-08-41-20-config';
import { CategoryAdminForm } from '../../../pages/Admin/CreateModal/CreateCategoryModal';
import { history } from '../../..';
export interface CategoryJobInterface {
    id: number;
    tenLoaiCongViec:string;
}

export interface CategoryJobResponse {
    pageIndex: number;
    pageSize: number;
    totalRow: number;
    keywords: null | string;
    data: CategoryJobInterface[];
}

interface categoryJobState {
    categoryArray: CategoryJobResponse | null,
    fullCategoryArray : CategoryJobInterface[] | [],
    EditCategory:CategoryJobInterface | null
}
const initialState:categoryJobState = {
    categoryArray: null,
    fullCategoryArray:[],
    EditCategory:null
}

const categoryAdminReducer = createSlice({
  name: 'categoryAdminReducer',
  initialState,
  reducers: {
    getCategoryArray: (state: categoryJobState, action: PayloadAction<CategoryJobResponse>) => {
        state.categoryArray = {
            pageIndex: action.payload.pageIndex,
            pageSize: action.payload.pageSize,
            totalRow: action.payload.totalRow,
            keywords: action.payload.keywords,
            data: action.payload.data,
        };
    
    },
    getFullCategoryArray :(state: categoryJobState, action: PayloadAction<CategoryJobInterface[]>) =>{
        state.fullCategoryArray = action.payload
    },
    getEditCategory  :(state: categoryJobState, action: PayloadAction<CategoryJobInterface>) =>{
        state.EditCategory = action.payload
    }
  }
});

export const {getCategoryArray,getFullCategoryArray,getEditCategory} = categoryAdminReducer.actions

export default categoryAdminReducer.reducer

export const getCategoryArrayApi = (pageIndex: number, pageSize: number, keyword: string) => {
    return async (dispatch: DispatchType) => {
        let res = await http.get('/api/loai-cong-viec/phan-trang-tim-kiem', { params: { pageIndex, pageSize, keyword } });
        //console.log('res1: ', res)
        if (res) {
            const action: PayloadAction<CategoryJobResponse> = getCategoryArray(res.data.content);
            dispatch(action);
        } else {
            alert('Khong the lay dc danh sach Category Job');
        }
    }
}


export const getFullCategoryArrayApi = () => {
    return async (dispatch: DispatchType) => {
        let res = await http.get('/api/loai-cong-viec');
        // console.log('res1: ', res)
        if (res) {
            const action: PayloadAction<CategoryJobInterface[]> = getFullCategoryArray(res.data.content);
            dispatch(action);
        } else {
            alert('Khong the lay dc danh sach toan bo user');
        }
    }
}


export const CreateCategoryAdminApi = (JobCreateAdmin: CategoryAdminForm) => {
    return async (dispatch: DispatchType) => {
        let res = await http.post('/api/loai-cong-viec', JobCreateAdmin);
        if (res) {
            alert('successful registration');
            history.push('/categoryadmin');
        } else {
            alert('Please check your Input again');
        }
    }
}

export const getEditCategoryApi = (id : number) =>{
    return async (dispatch: DispatchType) => {
        let res = await http.get(`/api/loai-cong-viec/${id}`);
        
        if (res) {
            const action : PayloadAction<CategoryJobInterface> = getEditCategory(res.data.content);
            dispatch(action);
        }else{
            alert('cannot get profile')
        }


    }
}