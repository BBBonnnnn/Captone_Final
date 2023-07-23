import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore';
import { USER_LOGIN, getStoreJson, http, setStoreJson } from '../../util/22-06-2023-08-41-20-config (1)';
import { FormRegister } from '../../pages/Register/Register';
import { FormValue } from '../../pages/Login/Login';
import { history } from '../..';


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

interface UserStateLogin {
    userLogin: UserLogin | null | any
}
const initialState = {
    userLogin: getStoreJson(USER_LOGIN)
}

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        loginAction: (state: UserStateLogin, action: PayloadAction<UserLogin>) => {
            state.userLogin = action.payload;
            console.log("state: ", state.userLogin);
        }


    }
});

export const { loginAction } = userReducer.actions

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
        }


    }
}