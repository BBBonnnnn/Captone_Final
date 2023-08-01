import React, { useEffect } from 'react'
import bankimg from '../../assets/img/bank.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/configStore'
import { editProfile, getProfileApi } from '../../redux/reducers/userReducer'
import { useFormik } from 'formik'
import * as yup from 'yup'
import ProfileModal2 from './profileModal2'
import RenderList from './RenderList'
type Props = {}

const UserInfo = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
  const { userLogin, userProfile } = useSelector((state: RootState) => state.userReducer);
  const ssss = { ...userProfile };
  const renderGender = () => {
    if (userProfile?.gender == true) {
      return <p>Male</p>
    } else {
      return <p>Female</p>
    }
  }
  useEffect(() => {
    const actionAsync = getProfileApi(userLogin.user.id);
    dispatch(actionAsync);
  }, [])
  return (
    <div className='container'>
      <div className='row my-5'>
        <div className='col-6'>
          <div className='card w-75'>
            <div className='card-header'>
              <img src="http://i.pravatar.cc?u=400" alt="" className='w-50  d-block m-auto rounded-circle' />
              <p className='text-center mt-4'>{userProfile?.name}</p>
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalId">
              <i className="fa fa-user-edit mx-2"></i>
                 <span>Edit Profile</span></button>
              <ProfileModal2 userProfile={userProfile} />
            </div>
            <div className='card-body d-flex justify-content-between'>
              <div className='col-6'>
                <p>From</p>
                <p>Member since</p>
                <p>Role</p>
                <p>Birthday</p>
                <p>Phone</p>
                <p>Gender</p>
              </div>
              <div className='col-6 text-end'>
                <p>Vietnam</p>
                <p>May 2021</p>
                <p>{userProfile?.role}</p>
                <p>{userProfile?.birthday}</p>
                <p>{userProfile?.phone}</p>
                <p> {renderGender()}</p>
              </div>
            </div>
          </div>
          <div className='card my-5 w-75'>
            <div className='card-header'>
              <div className='row'>
                <div className='col-6'>
                  Descrpition
                </div>
                <div className='col-6 text-primary text-end'>
                  Edit Descrpition
                </div>
                <hr className='my-5' />
              </div>
              <div className='row'>
                <div className='col-6'>
                  <h4> Languages</h4>
                  <p>English-Basic</p>
                </div>
                <div className='col-6 text-primary text-end'>
                  Add now
                </div>
                <hr className='my-5' />
              </div>
            </div>
            <div className='card-body'>
              <h3>Linked Accounts</h3>
              <ul className='text-primary'>
                <li className='my-3'>Facebook</li>
                <li className='my-3'>Google</li>
                <li className='my-3'>Dribble</li>
                <li className='my-3'>Stack overflow</li>
                <li className='my-3'>GibHub</li>
                <li className='my-3'>Vimeo</li>
                <li className='my-3'>Twitter</li>
              </ul>
            </div>
            <div className='card-footer'>
              <div className='row'>
                <div className='col-6'>
                  <h4> Skills</h4>
                  <p>Add your skills</p>
                </div>
                <div className='col-6 text-primary text-end'>
                  Add now
                </div>
                <hr className='my-5' />
              </div>
              <div className='row'>
                <div className='col-6'>
                  <h4> Education</h4>
                  <p>Add your Education</p>
                </div>
                <div className='col-6 text-primary text-end'>
                  Add now
                </div>
                <hr className='my-5' />
              </div>
              <div className='row'>
                <div className='col-6'>
                  <h4>Certification</h4>
                  <p>Add your Certification</p>
                </div>
                <div className='col-6 text-primary text-end'>
                  Add now
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-6'>
          <div className='card p-2'>
            <div className='row'>
              <div className='col-2 m-auto text-center'>
                <img src={bankimg} alt="" className='w-100 p-1' />
              </div>
              <div className='col-10 p-2'>
                <p>Buying services for work? Help us tallor your experience to fit your needs</p>
                <p className='text-success'>Tell us more about your business</p>
              </div>
            </div>

          </div>
          <div className='card my-5 p-2'>
            <div className='row'>
              <div className='col-8 m-auto text-center'>
                It seem that you don't have any active Gigs. Get starting!!
              </div>
              <div className='col-4 p-2'>
                <button className='btn btn-success' style={{ borderRadius: '0' }}>Creat a New Gig</button>
              </div>
            </div>
          </div>
          <div className='card'>
            {/* <div className='row py-4'>
              <div className='col-4 my-auto'>
                <img src={bankimg} alt="" className='w-100 p-1' />
              </div>
              <div className='col-8'>
                <h3>Lập trình viên front-End với reactjs</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minus tempora aperiam libero explicabo. Corrupti accusamus consequatur labore iure quibusdam.</p>
                <div className='text-end'>
                  <button className='mx-2'>View detail</button>
                  <button className='mx-2'>Edit</button>
                  <button className='mx-2'>Delete</button>
                </div>
              </div>
            </div> */}
            
           
          <RenderList />
          
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo