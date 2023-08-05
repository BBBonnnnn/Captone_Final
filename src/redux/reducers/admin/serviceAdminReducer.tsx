import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DispatchType } from '../../configStore';
import { http } from '../../../util/22-06-2023-08-41-20-config';
import { ServiceAdminForm } from '../../../pages/Admin/CreateModal/CreateServiceModal';
import { history } from '../../..';
export interface ServiceAdminInterface {
    id: number;
    maCongViec: number;
    maNguoiThue: number;
    ngayThue: string;
    hoanThanh: boolean;
}
export interface ServiceAdminResponse {
    pageIndex: number;
    pageSize: number;
    totalRow: number;
    keywords: null | string;
    data: ServiceAdminInterface[];
}
interface ServiceAdminState {
    serviceArray: ServiceAdminResponse | null,
    fullServiceArray:ServiceAdminInterface[]|[]
}
const initialState:ServiceAdminState = {
    serviceArray:null,
    fullServiceArray:[]
}

const serviceAdminReducer = createSlice({
    name: "serviceAdminReducer",
    initialState,
    reducers: {
        getServiceArray: (state: ServiceAdminState, action: PayloadAction<ServiceAdminResponse>) => {
            state.serviceArray = {
                pageIndex: action.payload.pageIndex,
                pageSize: action.payload.pageSize,
                totalRow: action.payload.totalRow,
                keywords: action.payload.keywords,
                data: action.payload.data,
            };
            
        },
        getFullServiceArray :(state: ServiceAdminState, action: PayloadAction<ServiceAdminInterface[]>) =>{
            state.fullServiceArray = action.payload
        }

    }
});

export const {getServiceArray,getFullServiceArray } = serviceAdminReducer.actions

export default serviceAdminReducer.reducer

export const getServiceArrayApi = (pageIndex: number, pageSize: number, keyword: string) => {
    return async (dispatch: DispatchType) => {
        let res = await http.get('/api/thue-cong-viec/phan-trang-tim-kiem', { params: { pageIndex, pageSize, keyword } });
        //console.log('res1: ', res)
        if (res) {
            const action: PayloadAction<ServiceAdminResponse> = getServiceArray(res.data.content);
            dispatch(action);
        } else {
            alert('Khong the lay dc danh sach Service');
        }
    }
}

export const getFullServiceArrayApi = () => {
    return async (dispatch: DispatchType) => {
        let res = await http.get('/api/thue-cong-viec');
        // console.log('res1: ', res)
        if (res) {
            const action: PayloadAction<ServiceAdminInterface[]> = getFullServiceArray(res.data.content);
            dispatch(action);
        } else {
            alert('Khong the lay dc danh sach toan bo user');
        }
    }
}

export const CreateServiceAdminApi = (ServiceCreateAdmin: ServiceAdminForm) => {
    return async (dispatch: DispatchType) => {
        let res = await http.post('/api/thue-cong-viec', ServiceCreateAdmin);
        if (res) {
            alert('successful registration');

            history.push('/serviceadmin');
        } else {
            alert('Please check your Input again');
        }
    }
}