import { divide } from 'lodash';
import React from 'react'
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
type Props = {}

const responseFacebook = (response:any) => {
  console.log(response);
}
const LoginFacebook = (props: Props) => {
  return ( <div>
 <FacebookLogin
    appId="1088597931155576"
    autoLoad={true}
    fields="name,email,picture"
    onClick={(props:any)=>{
        return <div></div>
    }}
    callback={responseFacebook} />
  </div>
   
  )
}

export default LoginFacebook