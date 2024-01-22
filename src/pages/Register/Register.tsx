import React from 'react'
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { DispatchType } from '../../redux/configStore';
import { http } from '../../util/22-06-2023-08-41-20-config';
import { history } from '../..';
import { Checkbox } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useSpring, animated } from '@react-spring/web'
export interface FormRegister {
  email: string | null,
  password: string | null,
  name: string | null,
  phone: string | null,
  gender: string | null,

  birthday: string | null
}


type Props = {}
const onChange: any = (checkedValues: CheckboxValueType[]) => {
  console.log('checked = ', checkedValues);
};
const Register = (props: Props) => {
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
        console.log('123', values)
        alert('successful registration!!');

        history.push('/')
      } else {
        alert('Email already exists!!');
      }
    }
  })

  return (
    <form className='container w-50 border my-5' onSubmit={frm.handleSubmit} style={{ borderRadius: '20px', height: '700px' }}>
      <div className='row h-100 align-items-center'>
        <div className='col-6'>
          <animated.h3
            className='text-center'
            style={{
              color: 'rgb(83, 146, 249)',
              transform: props1.rotate.interpolate((val) => `rotate(${val}deg)`),
            }}
          >Register</animated.h3>
          <div>
            <div className='form-group text-center mb-4'>
              <div className='d-flex align-items-center'>
                <i className="fa fa-user-astronaut me-2"></i>
                <input className='form-control' id='name' name='name' onChange={frm.handleChange} onBlur={frm.handleBlur} />
              </div>
              {frm.errors.name && <p className='text-danger'>{frm.errors.name}</p>}
            </div>
            <div className='form-group text-center mb-4'>
              <div className=' d-flex align-items-center'>
                <i className="fa fa-phone-volume me-2"></i>
                <input className='form-control' id='phone' name='phone' onChange={frm.handleChange} onBlur={frm.handleBlur} />
              </div>
              {frm.errors.phone && <p className='text-danger'>{frm.errors.phone}</p>}
            </div>
            <div className='form-group text-center mb-4'>
              <div className=' d-flex align-items-center'>
                <i className="fa fa-mail-bulk me-2"></i>
                <input className='form-control' id='email' name='email' onChange={frm.handleChange} onBlur={frm.handleBlur} />
              </div>
              {frm.errors.email && <p className='text-danger'>{frm.errors.email}</p>}
            </div>
            <div className='form-group text-center mb-4'>
              <div className=' d-flex align-items-center'>
                <i className="fa fa-key me-2"></i>
                <input className='form-control' id='password' name='password' type='password' onChange={frm.handleChange} onBlur={frm.handleBlur} />
              </div>
              {frm.errors.password && <p className='text-danger'>{frm.errors.password}</p>}
            </div>
            <div className='form-group text-center mb-4'>
              <div className='d-flex align-items-center'>
                <i className="fa fa-birthday-cake me-2"></i>
                <input className='form-control' id='birthday' name='birthday' type="date" onChange={frm.handleChange} onBlur={frm.handleBlur} />
              </div>
              {frm.errors.birthday && <p className='text-danger'>{frm.errors.birthday}</p>}
            </div>
            <div className='form-group text-center mb-4'>
              <div className='d-flex align-items-center '>
                <i className="fa fa-transgender-alt me-2"></i>
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
            <Checkbox onChange={onChange}>I agree all statements in <span style={{ color: 'rgb(83, 146, 249)' }}>Terms of service</span></Checkbox>
          </div>
          <div className='form-group  mt-3'>
            <button type='submit' className='btn btn-primary  w-100' style={{ color: 'white' }}>Register</button>
            <hr />
            <p className='text-center'> or continue with</p>
          </div>
        </div>
        <div className='col-6'>
          <animated.img
            src={process.env.PUBLIC_URL + '/assets/img/signup.jpg'}
            style={{
              width: '100%',
              height: '100%',
              transform: props1.rotate.interpolate((val) => `rotate(${val}deg)`),
            }}
          />
          <p className='text-center' style={{ color: 'rgb(83, 146, 249)', cursor: 'pointer' }} onClick={() => {
            history.push('/login')
          }}>i'm member already</p>
        </div>
      </div>
    </form>
  )
}

export default Register