import React from 'react'
import { DispatchType } from '../../../redux/configStore';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { CreateCategoryAdminApi, getFullCategoryArrayApi } from '../../../redux/reducers/admin/categoryAdminReducer';
export interface CategoryAdminForm {
    tenLoaiCongViec: string;
}
type Props = {}

const CreateCategoryModal = (props: Props) => {
    const dispatch: DispatchType = useDispatch();
    const frm = useFormik<CategoryAdminForm>({
        initialValues: {
            tenLoaiCongViec: '',
        },
        validationSchema: yup.object().shape({
            tenLoaiCongViec: yup.string().required('Category name can not be blank!'),
        }),
        onSubmit: async (values: CategoryAdminForm) => {
            const actionAsync = CreateCategoryAdminApi(values);
            dispatch(actionAsync);

            const actionAsync2 = getFullCategoryArrayApi();
            dispatch(actionAsync2);
        },
    });
    return (
        <div className="modal fade" id="CreateCategoryModal" tabIndex={-1} data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title " id="modalTitleId">ADMIN: Create Category</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <form className="my-2" onSubmit={frm.handleSubmit}>
                            <div className="form-group">
                                <p>Category Name</p>
                                <input
                                    className="form-control"
                                    id="tenLoaiCongViec"
                                    name="tenLoaiCongViec"
                                    value={frm.values.tenLoaiCongViec}
                                    onChange={frm.handleChange}
                                    onBlur={frm.handleBlur}
                                />
                                {frm.errors.tenLoaiCongViec && <p className="text-danger">{frm.errors.tenLoaiCongViec}</p>}
                            </div>
                            <div className="form-group text-center mt-3">
                                <button type="submit" className="btn btn-success">Create</button>
                            </div>
                        </form>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default CreateCategoryModal