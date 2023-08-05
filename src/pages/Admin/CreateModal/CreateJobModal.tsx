import { useFormik } from 'formik';
import * as yup from 'yup';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../../redux/configStore';
import { CategoryJobInterface, getFullCategoryArrayApi } from '../../../redux/reducers/admin/categoryAdminReducer';
import { CreateJobAdminApi, getFullJobArrayApi } from '../../../redux/reducers/admin/UserJobReducer';
export interface JobAdminCreateForm {
    tenCongViec: string;
    danhGia: number;
    giaTien: number;
    maChiTietLoaiCongViec: number;
    moTa: string;
    moTaNgan: string;
    saoCongViec: number;
    
}
type Props = {}

const CreateJobModal = (props: Props) => {
    const dispatch: DispatchType = useDispatch();
    const { fullCategoryArray } = useSelector((state: RootState) => state.categoryAdminReducer);

    useEffect(() => {

        const actionAsync = getFullCategoryArrayApi();
        dispatch(actionAsync);
    }, [])



    const frm = useFormik<JobAdminCreateForm>({
        initialValues: {
            tenCongViec: '',
            danhGia: 0,
            giaTien: 0,
            maChiTietLoaiCongViec: 0,
            moTa: '',
            moTaNgan: '',
            saoCongViec: 1,
            
        },
        validationSchema: yup.object().shape({
             tenCongViec: yup.string().required('Job name can not be blank!'),
             danhGia: yup.number().required('Rating can not be blank!').min(0, 'Rating must be at least 0').max(10, 'Rating must be at most 10'),
             giaTien: yup.number().required('Price can not be blank!').min(0, 'Price must be at least 0'),
             
             moTa: yup.string().required('Description can not be blank!'),

             moTaNgan: yup.string().required('Short Description can not be blank!'),
             saoCongViec: yup.number().required('Star Rating can not be blank!').min(1, 'Star Rating must be at least 1').max(5, 'Star Rating must be at most 5'),
        }),
        onSubmit: async (values: JobAdminCreateForm) => {
            
            const actionAsync = CreateJobAdminApi(values);
            dispatch(actionAsync);

            const actionAsync2 = getFullJobArrayApi();
            dispatch(actionAsync2);
        },
    });

    return (

        <div className="modal fade" id="CreateJobModal" tabIndex={-1} data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title " id="modalTitleId">ADMIN: Create Job</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <form className="my-2" onSubmit={frm.handleSubmit}>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <p>Job Name</p>
                                        <input
                                            className="form-control"
                                            id="tenCongViec"
                                            name="tenCongViec"
                                            value={frm.values.tenCongViec}
                                            onChange={frm.handleChange}
                                            onBlur={frm.handleBlur}
                                        />
                                        {frm.errors.tenCongViec && <p className="text-danger">{frm.errors.tenCongViec}</p>}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <p>Rating</p>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="danhGia"
                                            name="danhGia"
                                            value={frm.values.danhGia}
                                            onChange={frm.handleChange}
                                            onBlur={frm.handleBlur}
                                        />
                                        {frm.errors.danhGia && <p className="text-danger">{frm.errors.danhGia}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <p>Price</p>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="giaTien"
                                            name="giaTien"
                                            value={frm.values.giaTien}
                                            onChange={frm.handleChange}
                                            onBlur={frm.handleBlur}
                                        />
                                        {frm.errors.giaTien && <p className="text-danger">{frm.errors.giaTien}</p>}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <p>Detail Job Type ID</p>


                                        <select
                                            className="form-control"
                                            id="maChiTietLoaiCongViec"
                                            name="maChiTietLoaiCongViec"
                                            value={frm.values.maChiTietLoaiCongViec}
                                            onChange={frm.handleChange}
                                            onBlur={frm.handleBlur}
                                        >

                                            {fullCategoryArray?.map((category: CategoryJobInterface) => (
                                                <option key={category.id} value={category.id}>{category.tenLoaiCongViec}</option>
                                            ))}
                                        </select>
                                        {frm.errors.maChiTietLoaiCongViec && <p className="text-danger">{frm.errors.maChiTietLoaiCongViec}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <p>Description</p>
                                <textarea
                                    className="form-control"
                                    id="moTa"
                                    name="moTa"
                                    value={frm.values.moTa}
                                    onChange={frm.handleChange}
                                    onBlur={frm.handleBlur}
                                />
                                {frm.errors.moTa && <p className="text-danger">{frm.errors.moTa}</p>}
                            </div>
                            <div className="form-group">
                                <p>Short Description</p>
                                <textarea
                                    className="form-control"
                                    id="moTaNgan"
                                    name="moTaNgan"
                                    value={frm.values.moTaNgan}
                                    onChange={frm.handleChange}
                                    onBlur={frm.handleBlur}
                                />
                                {frm.errors.moTaNgan && <p className="text-danger">{frm.errors.moTaNgan}</p>}
                            </div>
                            <div className="form-group">
                                <p>Star Rating</p>
                                <select
                                    className="form-control"
                                    id="saoCongViec"
                                    name="saoCongViec"
                                    value={frm.values.saoCongViec}
                                    onChange={frm.handleChange}
                                    onBlur={frm.handleBlur}
                                >
                                    <option value={1}>1 Star</option>
                                    <option value={2}>2 Stars</option>
                                    <option value={3}>3 Stars</option>
                                    <option value={4}>4 Stars</option>
                                    <option value={5}>5 Stars</option>
                                </select>
                                {frm.errors.saoCongViec && <p className="text-danger">{frm.errors.saoCongViec}</p>}
                            </div>
                            <div className="form-group text-center mt-3">
                                <button type="submit" className="btn btn-success" data-bs-dismiss="modal">
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>


                </div>
            </div>
        </div>




    )
}

export default CreateJobModal