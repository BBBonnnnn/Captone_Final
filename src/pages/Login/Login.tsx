import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { loginActionApi } from '../../redux/reducers/userReducer';
import { useDispatch, } from 'react-redux';
import { DispatchType } from '../../redux/configStore'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';
import { useSpring, animated } from '@react-spring/web'
export interface FormValue {
  email: string | null,
  password: string | null
}
type Props = {}
const Login = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
  const componentClicked = () => {
    console.log('Button clicked');
  };
  const responseFacebook = (response: any) => {
    console.log(response);
  }
  const responseGoogle = (response: any) => {
    console.log(response);
  }
  const props1 = useSpring({
    from: { rotate: 0 },
    to: async (next) => {
      while (true) {
        await next({ rotate: 3 });
        await next({ rotate: 0 });
        await next({ rotate: -3 });
        await next({ rotate: 0 });
      }
    },
    config: { duration: 1500 },
  });
  const frm = useFormik<FormValue>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('Email can not be blank!').email('email is not valid!'),
      password: yup.string().required('password can not be blank!'),
    }),
    onSubmit: (values: FormValue) => {
      const actionAsync = loginActionApi(values);
      dispatch(actionAsync);
    }
  })
  return (
    <form className='container w-50 my-5 border' onSubmit={frm.handleSubmit} style={{ borderRadius: '20px', height: '600px' }}>
      <div className='row h-100 align-items-center'>
        <div className='col-6'>
          <animated.img
            src={process.env.PUBLIC_URL + '/assets/img/signin.jpg'}
            style={{
              width: '100%',
              height: '100%',
              transform: props1.rotate.interpolate((val) => `rotate(${val}deg)`),
            }}
          />
        </div>
        <div className='col-6'>
          <animated.h3
            className='text-center my-3'
            style={{
              color: 'rgb(83, 146, 249)',
              transform: props1.rotate.interpolate((val) => `rotate(${val}deg)`),
            }}
          >SIGN IN TO FIVERR</animated.h3>
          <div>
            <div className='form-group text-center '>
              <div className='d-flex align-items-center'>
                <i className="fa fa-user-graduate fs-5 "></i>
                <input className='form-control mx-2' id='email' name='email' onChange={frm.handleChange} onBlur={frm.handleBlur} placeholder='Your Email' />
              </div>
              <p className='text-danger text-center'>{frm.errors.email}</p>
            </div>
          </div>
          <div>
            <div className='form-group text-center'>
              <div className='d-flex align-items-center'>
              <i className="fa fa-key fs-5"></i>
              <input className='form-control mx-2' id='password' name='password' type='password' onChange={frm.handleChange} onBlur={frm.handleBlur} placeholder='Your Password' />
              </div>
            <p className='text-danger text-center'>{frm.errors.password}</p>
            </div>
          </div>
          <div className='form-group mt-3  text-center'>
            <div className='w-100'>
              <button type='submit' className='btn btn-primary w-100'>Login</button>
            </div>
          </div>
          <div className='row my-4' style={{ color: 'rgb(83, 146, 249)' }}>
            <div className='col-6'>
              Create Account
            </div>
            <div className='col-6 text-end' style={{ color: 'rgb(83, 146, 249)' }}>
              Forgot Password
              <i className="fa fa-lock mx-1" style={{ color: 'rgb(83, 146, 249)' }}></i>
            </div>
          </div>
          <hr />
          <div className='text-center'>
            or sign in with
          </div>
          <hr />
          <div className='d-flex justify-content-evenly'>
            <div >
              <FacebookLogin
                appId="1398528477358841"
                autoLoad={false}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook}
                render={(renderProps: any) => (
                  <button className='btn btn-primary py-2' onClick={renderProps.onClick}>Facebook</button>
                )} />
            </div>
            <div>
              <GoogleLogin
                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
            </div>
          </div>
          <p style={{ fontSize: '11px' }} className='my-4 text-center'>By signing in, I agree to Fiverr's <span style={{ color: 'rgb(83, 146, 249)' }}>Terms of Use</span> and <span style={{ color: 'rgb(83, 146, 249)' }}>Privacy Policy</span>.</p>
        </div>
      </div>
    </form>
  )
}

export default Login