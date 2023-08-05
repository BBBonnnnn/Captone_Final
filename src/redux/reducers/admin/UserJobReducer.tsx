import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DispatchType } from '../../configStore';
import { http } from '../../../util/22-06-2023-08-41-20-config';
export interface JobItemInterface {
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
}

export interface UserJobResponse {
    pageIndex: number;
    pageSize: number;
    totalRow: number;
    keywords: null | string;
    data: JobItemInterface[];
}

interface userJobState {
    jobArray: UserJobResponse | null
    fullJobArray:JobItemInterface[]|[]
}
const initialState: userJobState = {
    jobArray: null,
    fullJobArray:[]
}


const UserJobReducer = createSlice({
    name: "UserJobReducer",
    initialState,
    reducers: {
        getJobArray: (state: userJobState, action: PayloadAction<UserJobResponse>) => {
            state.jobArray = {
                pageIndex: action.payload.pageIndex,
                pageSize: action.payload.pageSize,
                totalRow: action.payload.totalRow,
                keywords: action.payload.keywords,
                data: action.payload.data,
            };
            
        },
        getFullJobArray :(state: userJobState, action: PayloadAction<JobItemInterface[]>) =>{
            state.fullJobArray = action.payload
        }
    }
});

export const { getJobArray,getFullJobArray } = UserJobReducer.actions

export default UserJobReducer.reducer


export const getJobArrayApi = (pageIndex: number, pageSize: number, keywords: string) => {
    return async (dispatch: DispatchType) => {
        let res = await http.get('/api/cong-viec/phan-trang-tim-kiem', { params: { pageIndex, pageSize, keywords } });
        //console.log('res1: ', res)
        if (res) {
            const action: PayloadAction<UserJobResponse> = getJobArray(res.data.content);
            dispatch(action);
        } else {
            alert('Khong the lay dc danh sach Job');
        }
    }
}

export const getFullJobArrayApi = () => {
    return async (dispatch: DispatchType) => {
        let res = await http.get('/api/cong-viec');
        // console.log('res1: ', res)
        if (res) {
            const action: PayloadAction<JobItemInterface[]> = getFullJobArray(res.data.content);
            dispatch(action);
        } else {
            alert('Khong the lay dc danh sach toan bo user');
        }
    }
}
