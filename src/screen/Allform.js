import React, { useState } from 'react'
import firebase from '../configs/firebase'
import { Link, Route, Switch } from 'react-router-dom';


function App() {
const signUp = (props) => props.history.push('/signup')

const [get,setGet]=useState([])
firebase.database().ref('form/').orderByChild('id').once('value',(datas)  => {
if (datas.val()) {
setGet(Object.values(datas.val()))
       }

})

  return (
      <div>
<ul className='navi'>
  <li className={'navi_list'}><Link to="/" >Home</Link></li>
  <li className={'navi_list'}><Link  to="/wecancy"  >Wecancy</Link></li>
  <li className={'navi_list'}><Link to="/signin" >SignIn</Link></li>
  <li className='navi_list' style={{float: 'right'}}><Link onClick={signUp} >Log out</Link></li></ul>


<div  className='container main'>

 {
                        get.map((form, index) => {
                          // console.log('------------->',form.id)
                            return(
                                 <div className="list-group cards">
                                   {/* <h1>{form}</h1> */}
                                        <ul>
                                        <li className="list-group-item"  style={{background: "black" ,color:"white",textAlign:'center',fontSize:'20px'} }>Form : {index}</li>
                               <li  className="list-group-item" >Name :  {form.name}</li>
                                            <li  className="list-group-item" > Father Name : {form.fname}</li>
                                            <li  className="list-group-item" > Class : {form.classs}</li>
                                            <li  className="list-group-item" > last Education : {form.lastEducation}</li>
                                            <li  className="list-group-item" > Date of Birth : {form.dateOfBirth}</li>
                                            <li  className="list-group-item" >Address :  {form.address}</li>
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