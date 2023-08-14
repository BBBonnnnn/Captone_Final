import React, { useState, useEffect } from 'react'
import { DispatchType, RootState } from '../../../redux/configStore';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceAdminInterface, postEditServiceApi } from '../../../redux/reducers/admin/serviceAdminReducer';
import { JobItemInterface, getFullJobArrayApi } from '../../../redux/reducers/admin/UserJobReducer';
import { UserAdminData, getFullUserArrayApi } from '../../../redux/reducers/admin/userAdminReducer';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ServiceAdminForm } from '../CreateModal/CreateServiceModal';
type Props = {
    prod: ServiceAdminInterface,
    
}
const EditServiceAdmin = ({ prod  }: Props) => {
    const dispatch: DispatchType = useDispatch();
    const { fullJobArray } = useSelector((state: RootState) => state.UserJobReducer);
    const { fullUserArray } = useSelector((state: RootState) => state.userAdminReducer);

    useEffect(() => {

        const actionAsync = getFullJobArrayApi();
        dispatch(actionAsync);

        const actionAsync2 = getFullUserArrayApi();
        dispatch(actionAsync2);

    }, [prod.id])
    const formatDate = (dateString: string) => {
        if (!dateString) {
            return '';
        }
        const [day, month, year] = dateString.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };

    const reformatDate = (dateString: string) => {
        if (!dateString) {
          return '';
        }
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
      };
    const frm = useFormik<ServiceAdminForm>({
        initialValues: {
            maCongViec: prod.maCongViec,
            maNguoiThue: prod.maNguoiThue,
            ngayThue: formatDate(prod.ngayThue),
            hoanThanh: prod.hoanThanh,
        },
        validationSchema: yup.object().shape({
            maCongViec: yup.number().required('Job ID can not be blank!').min(0, 'Invalid Job ID'),
            maNguoiThue: yup.number().required('Customer ID can not be blank!').min(0, 'Invalid Customer ID'),
            ngayThue: yup.string().required('Rental date can not be blank!'),
            hoanThanh: yup.boolean().required('Completion status can not be blank!'),
        }),
        onSubmit: async (values: ServiceAdminForm) => {
            const reformateNgayThue = reformatDate(values.ngayThue);
            const finaleValues = {...values, ngaythue: reformateNgayThue}
            const actionAsync = postEditServiceApi(finaleValues,prod.id);
            await dispatch(actionAsync);
            await closeModalAndReloadPage();
        },
    });

    const closeModalAndReloadPage = async () => {
        // Close the modal
        const modal = document.getElementById(`EditServiceModal${prod.id}`);
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modal) {
          modal.style.display = 'none';
        }
        if (modalBackdrop) {
          modalBackdrop.remove();
        }

        // Reload the page
        window.location.reload();
      };
    return (





        <div className="modal fade" id={`EditServiceModal${prod.id}`} tabIndex={-1} data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalTitleId">Modal title</h5>
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

export default EditServiceAdmin