import React, {  useState } from 'react'
import { Link } from 'react-router-dom';

import firebase from '../configs/firebase'
function SignUp(props) {
   
 const [Username, setUsername] = useState('')
 const [Age, setAge] = useState('')
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')

const register = () => {
     if (email != '' && password !== '' && Username !== '' && Age !== '') {
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
 <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Navbar</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
       </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
      <Link className="nav-link" to="/">Home </Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link " to="/wecancy">Wecancy   </Link>
      </li>
      <li className="nav-item">
      <li><Link className="nav-link" to="/signin">SignIn   </Link></li>
      </li>
      <li className="nav-item">
      <li><Link className="nav-link active" to="/signup">SignUp   </Link></li>
      </li>
              
      <li className="nav-item">
      <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">Disabled</a>
      </li>
    </ul>
    <form className="d-flex">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
    </div>
    </div>
  </nav>
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
  <button style={{padding:'10px', marginTop:'2px',borderRadius:'9px'}} onClick={register}>Register</button>
</div>
</div>
);
}

export default SignUp;