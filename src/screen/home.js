import React,{useEffect} from 'react'
import firebase from '../configs/firebase'
import { Link, Route, Switch } from 'react-router-dom';


function App(props) {
 
    const logoutUser = () => {
        firebase.auth().signOut()
        props.history.push('/signin')
    }
  return (
<div  className="">
  
<nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
              <Link className="nav-link active" to="/">Home </Link>              </li>
          
              <li className="nav-item">
              <Link className="nav-link " to="/wecancy">Wecancy   </Link>
              </li>
              <li className="nav-item">
              <li><Link className="nav-link" to="/signin">SignIn   </Link></li>
              </li>
              <li className="nav-item">
              <li><Link className="nav-link" to="/signup">SignUp   </Link></li>
              </li>
              
              <li className="nav-item">
                <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">Disabled</a>
              </li>
              <li className="nav-item">
              <li><Link className="nav-link" onClick={logoutUser}>Log Out   </Link></li>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
              
            </form>
          </div>
        </div>
      </nav>

<h1>Welcome to our website</h1>
</div>);
}

export default App;