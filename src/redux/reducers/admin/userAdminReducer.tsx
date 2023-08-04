import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { http } from '../../../util/22-06-2023-08-41-20-config';
import { DispatchType } from '../../configStore';
import { wait } from '@testing-library/user-event/dist/utils';
export interface UserAdminData {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    birthday: string;
    avatar: string;
    gender: boolean;
    role: string;
    skill: string[];
    certification: string[];
    bookingJob: string[];
}

export interface UserAdminResponse {
    pageIndex: number;
    pageSize: number;
    totalRow: number;
    keywords: null | string;
    data: UserAdminData[];
}

interface userAdminState {
    userArray: UserAdminResponse | null;
}
const initialState: userAdminState = {
    userArray: null
}

const userAdminReducer = createSlice({
    name: "userAdminReducer",
    initialState,
    reducers: {
        getUserArray: (state: userAdminState, action: PayloadAction<UserAdminResponse>) => {
            
            state.userArray = {
                
                pageIndex: action.payload.pageIndex,
                pageSize: action.payload.pageSize,
                totalRow: action.payload.totalRow,
                keywords: action.payload.keywords,
                data: action.payload.data,
            };
        }

    }
});

export const { getUserArray } = userAdminReducer.actions

export default userAdminReducer.reducer




export const getUserArrayApi = (pageIndex: number, pageSize: number, keywords: string) => {
    return async (dispatch: DispatchType) => {
        let res = await http.get('/api/users/phan-trang-tim-kiem', { params: { pageIndex, pageSize, keywords } });
        // console.log('res1: ', res)
        if (res) {
            const action: PayloadAction<UserAdminResponse> = getUserArray(res.data.content);
            dispatch(action);
        } else {
            alert('Khong the lay dc danh sach user');
        }
    }
}