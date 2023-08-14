import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/configStore'
import { getProfileApi } from '../../redux/reducers/userReducer'
import ProfileModal2 from './profileModal2'
import RenderList from './RenderList'
import { Image } from 'antd';
type Props = {}


const UserInfo = () => {
  console.log('11123232')
  const dispatch: DispatchType = useDispatch();
  const { userLogin, userProfile } = useSelector((state: RootState) => state.userReducer);
  console.log('userProfile', userProfile)
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
              <Image
                src={`http://i.pravatar.cc?u=${Math.floor(Math.random() * 500) + 1} `}
                className='w-50  d-block m-auto rounded-circle'
              />
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
                  <p>{userProfile?.skill}</p>
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
                  <p>{userProfile?.certification}</p>
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
                <img src={process.env.PUBLIC_URL + '/assets/img/bank.jpg'} alt="" className='w-100 p-1' />
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
            <RenderList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo