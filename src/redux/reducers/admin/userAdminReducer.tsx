import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { http } from '../../../util/22-06-2023-08-41-20-config';
import { DispatchType } from '../../configStore';
import { wait } from '@testing-library/user-event/dist/utils';
import { UserAdminCreateForm } from '../../../pages/Admin/CreateModal/CreateUserModal';
import { history } from '../../..';
import { UserAdminCreateForm2 } from '../../../pages/Admin/EditModal/EditUserAdmin';
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
    keywords: string;
    data: UserAdminData[];
}

interface userAdminState {
    userArray: UserAdminResponse | null,
    fullUserArray: UserAdminData[] | []
}
const initialState: userAdminState = {
    userArray: null,
    fullUserArray: []
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

        },
        getFullUserArray: (state: userAdminState, action: PayloadAction<UserAdminData[]>) => {
            state.fullUserArray = action.payload
        }

    }
});

export const { getUserArray, getFullUserArray } = userAdminReducer.actions

export default userAdminReducer.reducer




export const getUserArrayApi = (pageIndex: number, pageSize: number, keyword: string) => {
    return async (dispatch: DispatchType) => {

        let res = await http.get('/api/users/phan-trang-tim-kiem', { params: { pageIndex, pageSize, keyword } });

        if (res) {
            const action: PayloadAction<UserAdminResponse> = getUserArray(res.data.content);
            dispatch(action);
        } else {
            alert('Khong the lay dc danh sach user');
        }


    }
}



export const getFullUserArrayApi = () => {
    return async (dispatch: DispatchType) => {
        let res = await http.get('/api/users');
        // console.log('res1: ', res)
        if (res) {
            const action: PayloadAction<UserAdminData[]> = getFullUserArray(res.data.content);
            dispatch(action);
        } else {
            alert('Khong the lay dc danh sach toan bo user');
        }
    }
}

export const CreateUserAdminApi = (UserCreateAdmin: UserAdminCreateForm) => {
    return async (dispatch: DispatchType) => {
        let res = await http.post('/api/users', UserCreateAdmin);
        if (res) {
            alert('successful registration');

            history.push('/useradmin');
        } else {
            alert('Please check your Input again');
        }
    }
}


export const postEditUserApi = (UserAdminForm : UserAdminCreateForm2, id:number) =>{
    return async (dispatch: DispatchType) => {
        let res = await http.put(`/api/users/${id}`,UserAdminForm );
        
        if (res) {
            alert('Edit success')
        }else{
            alert('cannot Edit')
        }


    }
}