import React from 'react'
import { Button } from '@material-ui/core';
import {auth ,provider} from './firebase'

import {useContext} from 'react'
import {StateContext} from './StateProvider'
import './App.css'
import firebase from 'firebase'

const Login = () => {
   
   const {adduser}=useContext(StateContext)
    const SignIn=()=>{

        
       auth.signInWithPopup(provider)
       .then((result)=>{
          adduser(result.user)
       })
       .catch((error)=>alert(error.message))
    }
    return (
        <div className="Login">
            <div className="login_page">
             <h1>LOGIN</h1>
            <div className="login_container">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt=""/>
            <div className="whatsapp">
             <h3>SIGN IN TO WHATSAPP</h3>
            </div>
           <Button 
           onClick={SignIn}
           
           className="button">
            SIGN IN WITH GOOGLE
           </Button>
            </div>

            </div>
        </div>
    )
}

export default Login
