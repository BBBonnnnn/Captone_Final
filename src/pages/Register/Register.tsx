import React from 'react'
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { DispatchType } from '../../redux/configStore';
import { http } from '../../util/22-06-2023-08-41-20-config';
import { history } from '../..';
export interface FormRegister {
  email: string | null,
  password: string | null,
  name: string | null,
  phone: string | null,
  gender: string | null,

  birthday: string | null
}


type Props = {}

const Register = (props: Props) => {
  const dispatch: DispatchType = useDispatch();

  const frm = useFormik<FormRegister>({
    initialValues: {
      email: '',
      password: '',
      name: '',
      phone: '',
      gender: '',
      birthday: ''
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('Email can not be blank!').email('email is not valid!'),
      name: yup.string().required('Name can not be blank!').matches(/^[a-zA-Z ]+$/, 'Name is only letters!!'),
      phone: yup.string().required('Phone can not be blank!').matches(/^[0-9]*$/, 'phone is only number!'),
      password: yup.string().required('password can not be blank!'),
      gender: yup.string().required('gender can not be blank!'),
      birthday: yup.string().required('gender can not be blank!'),
    }),
    onSubmit: async (values: FormRegister) => {
      let res = await http.post('/api/auth/signup', values);
      if (res) {
        alert('successful registration');

        history.push('/')
      } else {
        alert('Please check your Input again');
      }
    }
  })

  return (
    <form className='container w-25 card my-5' onSubmit={frm.handleSubmit}>
      <div className='card-header text-center'>
        <h3>Register</h3>
      </div>
      <div className='card-body'>
        <div className='row'>
          <div className='col-6'>
            <div className='form-group'>
              <p>Name</p>
              <input className='form-control' id='name' name='name' onChange={frm.handleChange} onBlur={frm.handleBlur} />
              {frm.errors.name && <p className='text-danger'>{frm.errors.name}</p>}
            </div>
          </div>
          <div className='col-6'>
            <div className='form-group'>
              <p>Phone</p>
              <input className='form-control' id='phone' name='phone' onChange={frm.handleChange} onBlur={frm.handleBlur} />
              {frm.errors.phone && <p className='text-danger'>{frm.errors.phone}</p>}
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-6'>
            <div className='form-group'>
              <p>Email</p>
              <input className='form-control' id='email' name='email' onChange={frm.handleChange} onBlur={frm.handleBlur} />
              {frm.errors.email && <p className='text-danger'>{frm.errors.email}</p>}
            </div>
          </div>
          <div className='col-6'>
            <div className='form-group'>
              <p>Password</p>
              <input className='form-control' id='password' name='password' type='password' onChange={frm.handleChange} onBlur={frm.handleBlur} />
              {frm.errors.password && <p className='text-danger'>{frm.errors.password}</p>}
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-6'>
            <div className='form-group'>
              <p>BirthDay</p>
              <input className='form-control' id='birthday' name='birthday' type="date" onChange={frm.handleChange} onBlur={frm.handleBlur} />
              {frm.errors.birthday && <p className='text-danger'>{frm.errors.birthday}</p>}
            </div>
          </div>
          <div className='col-6 '>
            <p>Gender</p>
            <div className='d-flex justify-content-start align-items-center'>
              <div className='form-group'>
                <label htmlFor="men" className='mx-2'>Men</label>
                <input type='radio' id='men' value='true' name='gender' onChange={frm.handleChange} />
              </div>
              <div className='form-group'>
                <label htmlFor="women" className='mx-2'>Women</label>
                <input type='radio' id='women' value='false' name='gender' onChange={frm.handleChange} />
              </div>
            </div>
            {frm.errors.gender && <p className='text text-danger'>{frm.errors.gender}</p>}
          </div>
        </div>
        <div className='form-group text-center mt-3'>
          <button type='submit' className='btn btn-success'>Register</button>
        </div>
      </div>
    </form>
  )
}

export default Register