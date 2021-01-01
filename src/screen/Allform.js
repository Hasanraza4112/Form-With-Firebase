import React, { useState } from 'react'
import firebase from '../configs/firebase'
import { Link, Route, Switch } from 'react-router-dom';


function App() {
    const [get,setGet]=useState([])
  firebase.database().ref('form/').orderByChild('id').once('value').then((datas)  => {
    if (datas.val()) {
        // console.log(Object.values(datas.val()))
       setGet(Object.values(datas.val()))
    }
    //   console.log(datas.val())
// let allArr = []
//     let data = datas.val()
//     // data.dataId
//     allArr.push(data)
//     setGet([...allArr])

// console.log(data.dataId)
// db.ref('todo').orderByChild('userId').equalTo(userId).once('value').then((todos) => {

})

  return (
      <div>
           <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
              <Link className="nav-link " to="/">Home </Link>              </li>
          
              <li className="nav-item">
              <Link className="nav-link active" to="/wecancy">Wecancy   </Link>
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
              {/* <li className="nav-item"> */}
              {/* <li><Link className="nav-link" onClick={logoutUser}>Log Out   </Link></li>
              </li> */}
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
              
            </form>
          </div>
        </div>
      </nav>  
<div  className='container main'>

 {
                        get.map((form, index) => {
                          console.log(form)
                            return(
                                 <div className="list-group cards">
                                        <ul>
                                        <li className="list-group-item"  style={{background: "black" ,color:"white",textAlign:'center',fontSize:'20px'} }>Form : {index}</li>

                                            <li  className="list-group-item">Name :  {form.name}</li>
                                            <li  className="list-group-item"> Father Name : {form.fname}</li>
                                            <li  className="list-group-item"> Class : {form.classs}</li>
                                            <li  className="list-group-item"> last Education : {form.lastEducation}</li>
                                            <li  className="list-group-item"> Date of Birth : {form.dateOfBirth}</li>


                                            <li  className="list-group-item">Address :  {form.address}</li>
                                        </ul>

    {/* <div className="card-body">
      <h5 className="card-title">Form</h5>
      <h6 className="card-subtitle mb-2 text-muted">Name : {todo.get.name}</h6> */}

    </div>
                                          )              })}
    </div>    </div>


);
}

export default App;