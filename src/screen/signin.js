import React, { useState } from 'react'
import firebase from '../configs/firebase'
import { Link } from 'react-router-dom';


function SignIn(props) {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const signIn = () => {
    if (email != '' && password !== '' ) {
      firebase.auth().signInWithEmailAndPassword(email, password).then(async(user) => {
        console.log( user.user.uid)
        await localStorage.setItem('userId' , user.user.uid)
        props.history.push('/')
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
      })
    }
    else {
        alert('Enter proper details')
    }
}
const signUp = () => props.history.push('/signup')
const Logout = () => {
  firebase.auth().signOut()
  props.history.push('/signin')
}

    return (
<div > 
<ul className='navi'>
  <li className={'navi_list'}><Link to="/" >Home</Link></li>
  <li className={'navi_list'}><Link  to="/wecancy"  >Wecancy</Link></li>
  <li className={'navi_list'}><Link to="/signin" >SignIn</Link></li>
  <li className={'navi_list'}><Link to="/signup" onClick={signUp} >SignUp</Link></li>

  <li className='navi_list' style={{float: 'right'}}><Link onClick={Logout} >Log out</Link></li></ul>



<div className="container">
  <h1>Sign In</h1>
  <p>Please fill in this form to create an account.</p>
  <hr />

  <label ><b>Email</b></label>
  <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'Enter Email'} />

  <label ><b>Password</b></label>
  <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder={'Enter Password'} type='password' />
  <button  style={{padding:'10px', marginTop:'2px',borderRadius:'9px',width:'100%',background:'green',color:'white'}} onClick = {signIn}>login</button> 

            </div>

     
              </div>)

}

export default SignIn;
