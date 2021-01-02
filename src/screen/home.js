import React, { useEffect } from 'react'
import firebase from '../configs/firebase'
import { Link } from 'react-router-dom';


function App(props) {
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          console.log( 'User is signed in.')
          props.history.push('/wecancy')
      }
      else{
          alert('Please Sign In.')
          console.log( 'User is not signed in.')
          props.history.push('/signup')
      }
      });
    }, [])
    const logoutUser = () => {
        firebase.auth().signOut()
        props.history.push('/signin')
    }
  return (
<div  className="">
  
<ul className='navi'>
  <li className={'navi_list'}><Link to="/" >Home</Link></li>
  <li className={'navi_list'}><Link  to="/wecancy"  >Wecancy</Link></li>
  <li className={'navi_list'}><Link to="/signin" >SignIn</Link></li>
  <li className='navi_list' style={{float: 'right'}}><Link onClick={logoutUser} >Log out</Link></li></ul>




<h1>Welcome to our website</h1>
</div>);
}

export default App;