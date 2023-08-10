import React from 'react'
import { UserAdminCreateForm } from '../CreateModal/CreateUserModal'
import { UserAdminData, postEditUserApi } from '../../../redux/reducers/admin/userAdminReducer'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { DispatchType } from '../../../redux/configStore';
import { useDispatch } from 'react-redux';
type Props = {
    prod: UserAdminData
}
export interface UserAdminCreateForm2 {
    email: string,
    password: string,
    name: string,
    phone: string,
    gender: boolean,
    birthday: string,
    role: 'ADMIN' | 'USER';
}
const formatDate = (dateString: string) => {
    if (!dateString || dateString == '0') {
        return '';
    }
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

const reformatDate = (dateString: string) => {
    if (!dateString || dateString == '0') {
        return '';
    }
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};
const EditUserAdmin = ({ prod }: Props) => {
    const dispatch: DispatchType = useDispatch();
    const frm = useFormik<UserAdminCreateForm2>({
        initialValues: {
            email: prod.email,
            password: prod.password,
            name: prod.name,
            phone: prod.phone,
            gender: prod.gender,
            birthday: prod.birthday,
            role: prod.role === 'ADMIN' ? 'ADMIN' : 'USER',
        },
        validationSchema: yup.object().shape({
            email: yup.string().required('Email can not be blank!').email('email is not valid!'),
            name: yup.string().required('Name can not be blank!').matches(/^[a-zA-Z ]+$/, 'Name is only letters!!'),
            phone: yup.string().required('Phone can not be blank!').matches(/^[0-9]*$/, 'phone is only number!'),
            gender: yup.string().required('gender can not be blank!'),
            birthday: yup.string().required('gender can not be blank!'),
            role: yup.string().required('Role is required').oneOf(['ADMIN', 'USER'], 'Invalid role'),
        }),
        
        onSubmit: async (values: UserAdminCreateForm2) => {
            const actionAsync = postEditUserApi(values, prod.id);
            await dispatch(actionAsync).then(() => {closeModalAndReloadPage()});
        },
    });
    const closeModalAndReloadPage = async () => {
        // Close the modal
        const modal = document.getElementById(`EditUserModal${prod.id}`);
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modal) {
            modal.style.display = 'none';
        }
        if (modalBackdrop) {
            modalBackdrop.remove();
        }

        // Reload the page
        await window.location.reload();
    };

    //UserAdminCreateForm
    return (
        <div className="modal fade" id={`EditUserModal${prod.id}`} tabIndex={-1} data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalTitleId">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <form className=' my-2' onSubmit={frm.handleSubmit}>


                            <div className='row'>
                                <div className='col-6'>
                                    <div className='form-group'>
                                        <p>Name</p>
                                        <input className='form-control' id='name' name='name'
                                            value={frm.values.name}
                                            onChange={frm.handleChange}
                                            onBlur={frm.handleBlur} />
                                        {frm.errors.name && <p className='text-danger'>{frm.errors.name}</p>}
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='form-group'>
                                        <p>Phone</p>
                                        <input className='form-control' id='phone' name='phone'
                                            value={frm.values.phone}
                                            onChange={frm.handleChange}
                                            onBlur={frm.handleBlur} />
                                        {frm.errors.phone && <p className='text-danger'>{frm.errors.phone}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className='form-group'>
                                        <p>Email</p>
                                        <input className='form-control' id='email' name='email'
                                            value={frm.values.email}
                                            onChange={frm.handleChange}
                                            onBlur={frm.handleBlur} />
                                        {frm.errors.email && <p className='text-danger'>{frm.errors.email}</p>}
                                    </div>
                                </div>

                                <div className='col-6'>
                                    <div className='form-group'>
                                        <p>Password</p>
                                        <input className='form-control' id='password' name='password' type='password'
                                            value={frm.values.password}
                                            onChange={frm.handleChange}
                                            onBlur={frm.handleBlur} />
                                        {frm.errors.password && <p className='text-danger'>{frm.errors.password}</p>}
                                    </div>
                                </div>


                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className='form-group'>
                                        <p>BirthDay</p>
                                        <input className='form-control' id='birthday' name='birthday' type="date"
                                            value={frm.values.birthday}
                                            onChange={frm.handleChange}
                                            onBlur={frm.handleBlur} />
                                        {frm.errors.birthday && <p className='text-danger'>{frm.errors.birthday}</p>}
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <p>Gender</p>
                                    <div className='d-flex justify-content-start align-items-center'>
                                        <div className='form-group'>
                                            <label htmlFor="men" className='mx-2'>Men</label>
                                            <input
                                                type='radio'
                                                id='men'
                                                value='true'
                                                name='gender'
                                                onChange={frm.handleChange}
                                                checked={frm.values.gender === true}
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="women" className='mx-2'>Women</label>
                                            <input
                                                type='radio'
                                                id='women'
                                                value='false'
                                                name='gender'
                                                onChange={frm.handleChange}
                                                checked={frm.values.gender === false}
                                            />
                                        </div>
                                    </div>
                                    {frm.errors.gender && <p className='text text-danger'>{frm.errors.gender}</p>}
                                </div>


                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className='form-group'>
                                        <p>Role</p>
                                        <select
                                            className='form-control'
                                            id='role'
                                            name='role'
                                            value={frm.values.role}
                                            onChange={frm.handleChange}
                                            onBlur={frm.handleBlur}
                                        >
                                            <option value='ADMIN'>ADMIN</option>
                                            <option value='USER'>USER</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='form-group text-center mt-3'>
                                <button type='submit' className='btn btn-success' data-bs-dismiss="modal">Register</button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EditUserAdmin