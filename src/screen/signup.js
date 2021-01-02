import React, {   useState } from 'react'
import { Link } from 'react-router-dom';

import firebase from '../configs/firebase'
function SignUp(props) {
   
 const [Username, setUsername] = useState('')
 const [Age, setAge] = useState('')
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')




const register = () => {
     if (email != '' && password != '' && Username != '' && Age != '') {
        let obj = {
          Username,
          Age,
          email,
          password
                      }
      firebase.auth().createUserWithEmailAndPassword(email, password).then(async (user) => {
          console.log(user.user.uid)
          obj.id = user.user.uid
          await localStorage.setItem('userId' , user.user.uid)
      firebase.database().ref('users/' + user.user.uid + '/').set(obj)
          setUsername('')
          setEmail('')
          setPassword('')
          setAge('')
          props.history.push('/')
       })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage)
                    })
    } else {
      alert('Enter Details')
            }

    }
return (
           
<div > 
<ul className='navi'>
  <li className={'navi_list'}><Link to="/" >Home</Link></li>
  <li className={'navi_list'}><Link  to="/wecancy"  >Wecancy</Link></li>
  <li className={'navi_list'}><Link to="/signin" >SignIn</Link></li>
  {/* <li className='navi_list' style={{float: 'right'}}><Link onClick={logoutUser} >Log out</Link></li> */}
  </ul>


{/* Nav Bar End */}
<div className="container">
  <h1>Sign Up</h1>
  <p>Please fill in this form to create an account.</p>
  <hr />
  <label ><b>Username</b></label>
  <input value={Username} onChange={(e) => setUsername(e.target.value)} placeholder={'Name'} /> 
  <label ><b>Your Age</b></label>
  <input value={Age} onChange={(e) => setAge(e.target.value)} placeholder={'Your Age'} /> 
  <label ><b>Email</b></label>
  <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'Enter Email'} /> 
  <label ><b>Password</b></label>
  <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder={'Enter Password'} type='password' />
  <button style={{padding:'10px', marginTop:'2px',borderRadius:'9px',width:'100%',background:'green',color:'white'}}  onClick={register}>Register</button>
</div>
</div>
);
}

export default SignUp;