import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore';
import { USER_LOGIN, getStoreJson, http, setStoreJson } from '../../util/22-06-2023-08-41-20-config (1)';
import { FormRegister } from '../../pages/Register/Register';
import { FormValue } from '../../pages/Login/Login';
import { history } from '../..';
import { ProfileForm } from '../../pages/Profile/profileModal2';



export interface UserLogin {
    user: {
        id: number,
        name: string,
        email: string,
        password: string,
        phone: number,
        birthday: string,
        avatar: string,
        gender: boolean,
        role: string,
        skill: string[],
        certification: string[],
        bookingJob: string[]
    },
    token: string
}


export interface UserProfile {
    id: number,
    name: string,
    email: string,
    password: string,
    phone: number,
    birthday: string,
    avatar: string,
    gender: boolean,
    role: string,
    skill: string[],
    certification: string[],
    bookingJob: string[]
}
interface UserState {
    userLogin: UserLogin | null | any,
    userProfile:UserProfile|null
}

const initialState : UserState = {
    userLogin: getStoreJson(USER_LOGIN),
    userProfile: getStoreJson("userProfile")
}

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        loginAction: (state: UserState, action: PayloadAction<UserLogin>) => {
            state.userLogin = action.payload;
            console.log("state: ", state.userLogin);
        },

        getProfileAction: (state: UserState, action: PayloadAction<UserProfile>) => {
            state.userProfile = action.payload;
            console.log("state.userProfile: ", state.userProfile);
        },
    }
});

export const { loginAction, getProfileAction } = userReducer.actions

export default userReducer.reducer

export const loginActionApi = (userLoginFrom: FormValue) => {
    // console.log('here1');
    return async (dispatch: DispatchType) => {
        let res = await http.post('/api/auth/signin', userLoginFrom);
        if (res) {
            //Sau khi có kq từ api lưu vào localstorage và đưa reducer
            setStoreJson(USER_LOGIN, res.data.content);

            //Tạo action đưa lên reducer
            const action: PayloadAction<UserLogin> = loginAction(res.data.content);
            dispatch(action);
            history.push("/");
        }else{
            alert('Login failed please check again')
        }


    }
}

export const getProfileApi = (id:number) => {
    // console.log('here1');
    return async (dispatch: DispatchType) => {
        let res = await http.get(`/api/users/${id}`);
        if (res) {
            setStoreJson("userProfile", res.data.content);
            const action : PayloadAction<UserProfile> = getProfileAction(res.data.content);
            dispatch(action);
        }else{
            alert('cannot get profile')
        }


    }
}

export const editProfile = (id:number, values:ProfileForm) =>{
    return async (dispatch: DispatchType) => {
        //console.log(values);


        let res = await http.put(`/api/users/${id}`, values );
        //console.log(res)
        if(res){
            localStorage.removeItem("userProfile");
            setStoreJson("userProfile", res.data.content);
            const action : PayloadAction<UserProfile> = getProfileAction(res.data.content);
            dispatch(action);
            alert('edit thanh cong')
        }


    }
}