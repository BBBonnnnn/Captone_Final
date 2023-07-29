import React, { useEffect } from 'react'
import ProfileModal from './ProfileModal'
import { getProfileApi } from '../../redux/reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/configStore'

type Props = {}

const Profile = (props: Props) => {

  const { userLogin, userProfile } = useSelector((state: RootState) => state.userReducer);
  
  const dispatch:DispatchType = useDispatch();
  const getProfileApiFunction= async ()=>{
    const actionAsync = getProfileApi(userLogin.user.id);
    dispatch(actionAsync);
  }

  useEffect(()=>{
    getProfileApiFunction();
    
  },[]);
  console.log('userProfile: ', userProfile?.email)
  const renderGender = () => {
    if(userProfile.gender == true){
      return <p>Gender: Male</p>
    }else{
      return <p>Gender: Female</p>
    }
  }
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-4'>
          <h1>User Profile</h1>
          <p>Email: {userProfile?.email}</p>
          <p>Phone: {userProfile.phone}</p>
          <p>Name: {userProfile.name}</p>
          <p>Birthday: {userProfile.birthday}</p>
          {renderGender()}

          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Update User</button>

          <ProfileModal />


        </div>
        <div className='col-8'>

        </div>
      </div>
    </div>
  )
}

export default Profile