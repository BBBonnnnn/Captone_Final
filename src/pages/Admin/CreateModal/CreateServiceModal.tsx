import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { DispatchType, RootState } from '../../../redux/configStore';
import { useDispatch, useSelector } from 'react-redux';
import { JobItemInterface, getFullJobArrayApi } from '../../../redux/reducers/admin/UserJobReducer';
import { UserAdminData, getFullUserArrayApi } from '../../../redux/reducers/admin/userAdminReducer';
import { CreateServiceAdminApi, getFullServiceArrayApi } from '../../../redux/reducers/admin/serviceAdminReducer';

export interface ServiceAdminForm {
    maCongViec: number;
    maNguoiThue: number;
    ngayThue: string;
    hoanThanh: boolean;
}
type Props = {}

const CreateServiceModal = (props: Props) => {
    const dispatch: DispatchType = useDispatch();
    const { fullJobArray } = useSelector((state: RootState) => state.UserJobReducer);
    const { fullUserArray } = useSelector((state: RootState) => state.userAdminReducer);
    useEffect(() => {

        const actionAsync = getFullJobArrayApi();
        dispatch(actionAsync);

        const actionAsync2 = getFullUserArrayApi();
        dispatch(actionAsync2);

    }, [])




    const frm = useFormik<ServiceAdminForm>({
        initialValues: {
            maCongViec: 0,
            maNguoiThue: 0,
            ngayThue: '',
            hoanThanh: false,
        },
        validationSchema: yup.object().shape({
            maCongViec: yup.number().required('Job ID can not be blank!').min(0, 'Invalid Job ID'),
            maNguoiThue: yup.number().required('Customer ID can not be blank!').min(0, 'Invalid Customer ID'),
            ngayThue: yup.string().required('Rental date can not be blank!'),
            hoanThanh: yup.boolean().required('Completion status can not be blank!'),
        }),
        onSubmit: async (values: ServiceAdminForm) => {
            const actionAsync = CreateServiceAdminApi(values);
            dispatch(actionAsync);

            const actionAsync2 = getFullServiceArrayApi();
            dispatch(actionAsync2);
        },
    });
    return (
        <div className="modal fade" id="CreateServiceModal" tabIndex={-1} data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title " id="modalTitleId">ADMIN: Create Service</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <form className="my-2" onSubmit={frm.handleSubmit}>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <p>Job</p>
                                        <select
                                            className="form-control"
                                            id="maCongViec"
                                            name="maCongViec"
                                            value={frm.values.maCongViec}
                                            onChange={frm.handleChange}
                                            onBlur={frm.handleBlur}
                                        >

                                            {fullJobArray?.map((job: JobItemInterface) => (
                                                <option key={job.id} value={job.id}>{job.tenCongViec}</option>
                                            ))}
                                        </select>
                                        {frm.errors.maCongViec && <p className="text-danger">{frm.errors.maCongViec}</p>}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <p>Customer ID</p>
                                        

<select
                                            className="form-control"
                                            id="maNguoiThue"
                                            name="maNguoiThue"
                                            value={frm.values.maNguoiThue}
                                            onChange={frm.handleChange}
                                            onBlur={frm.handleBlur}
                                        >

                                            {fullUserArray?.map((user: UserAdminData) => (
                                                <option key={user.id} value={user.id}>{user.name}</option>
                                            ))}
                                        </select>
                                        {frm.errors.maNguoiThue && <p className="text-danger">{frm.errors.maNguoiThue}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-6">
                                    <div className="form-group">
                                        <p>Rent Date</p>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="ngayThue"
                                            name="ngayThue"
                                            value={frm.values.ngayThue}
                                            onChange={frm.handleChange}
                                            onBlur={frm.handleBlur}
                                        />
                                        {frm.errors.ngayThue && <p className="text-danger">{frm.errors.ngayThue}</p>}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <p>Completion Status</p>
                                        <select
                                            className="form-control"
                                            id="hoanThanh"
                                            name="hoanThanh"
                                            value={frm.values.hoanThanh.toString()}
                                            onChange={frm.handleChange}
                                            onBlur={frm.handleBlur}
                                        >
                                            <option value="true">Completed</option>
                                            <option value="false">Not Completed</option>
                                        </select>
                                        {frm.errors.hoanThanh && <p className="text-danger">{frm.errors.hoanThanh}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group text-center mt-3">
                                <button type="submit" className="btn btn-success">Register</button>
                            </div>
                        </form>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default CreateServiceModal