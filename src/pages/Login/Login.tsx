import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { loginActionApi } from '../../redux/reducers/userReducer';
import { useDispatch } from 'react-redux';
import { DispatchType } from '../../redux/configStore'

export interface FormValue {
  email: string | null,
  password: string | null
}
type Props = {}

const Login = (props: Props) => {

  const dispatch:DispatchType = useDispatch();
  const frm = useFormik<FormValue>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('Email can not be blank!').email('email is not valid!'),
      password: yup.string().required('password can not be blank!'),
    }),
    onSubmit:(values:FormValue)=>{
      const actionAsync = loginActionApi(values);
      dispatch(actionAsync);
    }
  })






  return (
    <form className='container w-25 card my-5' onSubmit={frm.handleSubmit}>
      <div className='card-header text-center'>
        <h3>Login</h3>
      </div>
      <div className='card-body'>
        


        
            <div className='form-group'>
              <p>Email</p>
              <input className='form-control' id='email' name='email' onChange={frm.handleChange} onBlur={frm.handleBlur} />
              <p className='text-danger'>{frm.errors.email}</p>
            </div>
          
          
            <div className='form-group'>
              <p>Password</p>
              <input className='form-control' id='password' name='password' type='password' onChange={frm.handleChange} onBlur={frm.handleBlur} />
              <p className='text-danger'>{frm.errors.password}</p>
            </div>
        

        <div className='form-group text-center mt-3'>
          <button  type='submit' className='btn btn-success'>Login</button>
        </div>
      </div>
    </form>
  )
}

export default Login