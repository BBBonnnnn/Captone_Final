import axios, { InternalAxiosRequestConfig } from 'axios';
import { history } from '../index'
// import jwt_decode from "jwt-decode";

//setup hằng số
export const DOMAIN = 'https://fiverrnew.cybersoft.edu.vn';
export const TOKEN = 'token';
export const USER_LOGIN = 'userLogin';
export const tokenCybersoft  = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`

export const { getStoreJson, setStoreJson, getStore, setStore } = {
    getStoreJson: (name: string): any => {
        if (localStorage.getItem(name)) {
            const strResult: string | null | any = localStorage.getItem(name);
            return JSON.parse(strResult);
        }
        return null;
    },
    setStoreJson: (name: string, data: any): void => {
        const strJSON = JSON.stringify(data);
        localStorage.setItem(name, strJSON);
    },
    getStore: (name: string): string | null => {
        return localStorage.getItem(name);
    },
    setStore: (name: string, data: string): void => {
        localStorage.setItem(name, data);
    }
}

//interceptor
export const http = axios.create({
    baseURL: DOMAIN,
    timeout: 30000
});

export const httpNonAuth = axios.create({
    baseURL: DOMAIN,
    timeout: 30000
})

httpNonAuth.interceptors.request.use((config: any) => {
    config.baseURL = DOMAIN;
    config.headers = { ...config.headers }
    config.headers.tokenCybersoft = `${tokenCybersoft}`;
    console.log(tokenCybersoft);
    return config
}, err => {
    return Promise.reject(err)
});
http.interceptors.request.use((config: any) => {
    config.headers = { ...config.headers }
    let token = getStoreJson(USER_LOGIN)?.token;
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.tokenCybersoft = `${tokenCybersoft}`;
    return config
}, err => {
    return Promise.reject(err)
});


//Cấu hình cho response (kết quả trả về từ api)
http.interceptors.response.use((res) => {
    console.log(res);
    return res;
}, (err) => {
    //Xử lý lỗi cho api bị lỗi theo status code 
    console.log(err);
    if (err.response?.status === 401) {

        // //Đã đăng nhập nhưng hết hạn (gọi api refresh token)
        // let decodedToken:any = jwt_decode(getStoreJson(USER_LOGIN).accessToken);
        // console.log("Decoded Token", decodedToken);
        // let currentDate = new Date();

        // // JWT exp is in seconds
        // if (decodedToken.exp * 1000 < currentDate.getTime()) {
        //     console.log("Token expired.");
        //     //Remove userlogin trong localstorage
        //     localStorage.removeItem(USER_LOGIN);
        //     //Chuyển hướng về đăng nhập
        //     history.push('/login');

        // }

        // //Chưa đăng nhập
        // alert('Đăng nhập để vào trang này !');
        // history.push('/login');
    }
    if (err.response?.status === 403) {
        alert('Không đủ quyền truy cập vào trang này !');
        history.push('/admin/login');
    }
    if (err.response?.status === 400) {
        alert('Request Failed Please do it again');
        
    }
    return Promise.reject(err);
});

/* statusCode thông dụng : 
    200: Dữ liệu gửi đi và nhận về kết quả thành công (OK)
    201: Dữ liệu khởi tạo thành công (Created)
    400: Bad request (lỗi không tìm thấy item trên backend)
    404: Not found (không tìm thấy link backend)
    500: Error in server (Lỗi xảy ra tại server - có thể do dữ liệu frontend gửi lên xử lý bị lỗi backend không catch trường hợp này thì ra 500 hoặc là backend code bị lỗi) => Xác định lỗi => mở post man request thử với data đúng thì có được hay không nếu vẫn lỗi thì báo backend fix
    401: UnAuthorize (Lỗi khi không có quyền truy cập vào api này (phải token hợp lệ ...))
    403: Forbiden ( Lỗi chưa đủ quyền truy cập vào api )

*/
