import React, { useEffect, useState } from 'react'
import { Link, Route, Switch } from 'react-router-dom';

import firebase from '../configs/firebase'
// import { Button, } from '../Button/index'
import './form.css'
function Form(props) {
const [form, setForm] = useState('')
const [AllForm, setAllForm] = useState([])
const [user, setUser] = useState({})
const [name,setName]=useState('')
const [fname,setFname]=useState('')
const [classs,setClass]=useState('')
const [address,setAddress]=useState('')
const [lastEducation,setLastEducation]=useState('')
const [dateOfBirth,setDateOfBirth]=useState('')
const database = firebase.database()
const logOut = () => {
    firebase.auth().signOut()
}
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
    const userId = localStorage.getItem('userId')
        getUserFormFirebase(userId)
        getFormList(userId)

}, [])

const getUserFormFirebase = (userId) => {
    console.log( userId)
    database.ref('users/' + userId).once('value').then((data) => {
        setUser(data.val())
        console.log(data.val())
        getUserFormFromFirebase(userId)

    })
    .catch((err) => console.log(err))
}
const getFormList = (userId) => {
    database.ref('form').orderByChild('userId').equalTo(userId).once('value',(forms) => {
        if (forms.val()) {
            setAllForm(Object.values(forms.val()))
            console.log(Object.values(forms.val()))
        }
    })
}
const getUserFormFromFirebase = (userId) => {
    let arr = []
    database.ref('form').orderByChild('userId').equalTo(userId).on('child_added', (form) => {
        console.log(form.val())
        let forms = form.val()
        forms.formId = forms.key
        arr.push(forms)
    })
        setAllForm([...arr])
    }


const submit = () => {
    if (name === '' && fname=== '' && classs=== '' && address=== ''&& lastEducation=== ''&& dateOfBirth=== '') {
        alert('Complete Form for Addmission ')
    }
    else {
        let obj = {
            name,
            fname,
            classs,
            lastEducation,
            dateOfBirth,
            address,
            userId: user.id,
        }
    database.ref('form').push(obj)
    }
    getUserFormFromFirebase(user.id)
    
}
const deleteform = (formId, index) => {
        console.log(index,formId)
        let arr = AllForm
        arr.splice(index, 1 )
        setAllForm([...arr])
        database.ref('form/' + formId).remove();
    }
    return (
        
            <div className=''>
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
              <li className="nav-item">
              <li><Link className="nav-link" onClick={logOut}>Log Out   </Link></li>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
              
            </form>
          </div>
        </div>
      </nav>  
            <div className='container'>

      <ul class="nav justify-content-end">
  
  <li class="nav-item">
    <Link class="nav-link " to="/allform" tabindex="-1" aria-disabled="true">All Sections Form</Link>
  </li>
</ul>
                <div className='first_para' >
                        <h2  >The Smart School</h2>
                         <h3>Admission Form</h3>   </div>     {/* <h1>{user.name}</h1> */}
            <div>
            <form action="">
                  <label> Name   :</label>   <input className="input" value={name}  label="Name"  onChange={(e)=> setName(e.target.value)} />  <br/>
                  <label> F.Name :</label>   <input className="input" value={fname}  label="fname"  onChange={(e)=> setFname(e.target.value)} />  <br/>
                  <label> Class  :</label>   <input className="input" value={classs}  label="class"  onChange={(e)=> setClass(e.target.value)} />  <br/>
                  <label> Last Education  :</label>   <input className="input" value={lastEducation}  label="class"  onChange={(e)=> setLastEducation(e.target.value)} />  <br/>
                  <label> Date of Birth :</label>  <input className="input" type='date' value={dateOfBirth}  label="address"  onChange={(e)=> setDateOfBirth(e.target.value)} /> <br/> <br />
                  <label> Address :</label>  <input className="input" value={address}  label="address"  onChange={(e)=> setAddress(e.target.value)} /> <br/> <br />
                  <button variant="contained" color="secomdary" style={{padding:'10px', marginTop:'2px',borderRadius:'9px'}} onClick={submit}>submit</button>
                  <hr/>
                  {/* <button variant="contained" color="primary" onClick={logout}>logout</button> */}
                      </form>
                {/* <input type={'text'} value={todo}
                    placeholder={'Enter Todo'}
                    onChange={(e) => setForm(e.target.value)} value={todo} /> */}
                {/* <button onClick={submit} title={""} >Add</button> */}
            </div>

            <div className="main">
                {
                    AllForm.map((form, index) => {
                        console.log('form', form)
                        return (
                            <div >
  <div className="list-group card">
      <div>

    
      <li className="list-group-item"  style={{background: "black" ,color:"white",textAlign:'center',fontSize:'20px'} }>Form </li>
{/* <li>{form}</li> */}
    <li className="list-group-item">Name :           {form.name}</li>
    <li className="list-group-item">Father Name :    {form.fname} </li>
    <li className="list-group-item">CLass :          {form.classs} </li>
    <li className="list-group-item">last Education : {form.lastEducation} </li>
    <li className="list-group-item">Date of Birth :  {form.dateOfBirth} </li>
    <li className="list-group-item">Address:         {form .address}</li>
     <button    style={{background: "red"}} onClick={() => deleteform(form.form, index)}>delete</button>

</div>
  </div>
                                {/* <span> {todo.name} </span>
                                <span>{todo.fname} </span>
                                <span> {todo.classs}</span>
                                <span> {todo.addres} </span> */}
                                {/* <span> {index}= {todo.todo}</span> */}

                                {/* <button onClick={() => deleteTodo(todo.formId, index)}>delete</button> */}
                            </div>
                            
  
                        )
                    })
                }
        </div>    </div>     
</div>
    );
}

export default Form;














// ........................







// import {Link} from "react-router-dom"
// import React ,{useEffect,useState} from "react"
// import firebase from "../configs/firebase"
// import "./form.css"
// // import TextField from '@material-ui/core/TextField';
// // import Button from '@material-ui/core/Button';

// const App=(props)=>{
 
//         const db=firebase.database();
//         const  [allData,setAlldata]=useState([])


//         useEffect(()=>{
//      firebase.auth().onAuthStateChanged((user)=>{
//      if(user){
//                props.history.push("/wecancy")
               
//      } else{
//               alert("user is not signed in")
//               props.history.push("/Signin")
//      }
        
//      });

//       db.ref("student").on("value", (data)=>{
//           const arr =[]
//           const dt=data.val();
//           for(let id in dt){
//                     arr.push({id,...dt[id]})
//           }
//          setAlldata(arr)
    
//       })

//         },[]);
//         useEffect(() => {
//           var userId = localStorage.getItem('userId')
//           console.log(userId)
//           // getUserFormFirebase(userId)
//           // getFormList(userId)
  
//       }, [])
    

//   const [name,setName]=useState('')
//   const [fname,setFname]=useState('')
//   const [cls,setClassnum]=useState('')
//   const [address,setAddress]=useState('')

//  const submit=()=>{
//          if(name != "" &&  fname != "" && cls  != "" && address !=""){
//        let  form ={
//                name,
//                fname,
//                cls,
//                address,
//           }
//                  db.ref("student").push(form).then(()=>{
                       
//                  })

         


//         }
//                else{
//                         alert("please filled all the field")
//                }  
//  }



//         return(  

//                 <div>
//                   {/* <h1>  {user.name}</h1> */}
//                   <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <div className="container-fluid">
//           <a className="navbar-brand" href="#">Navbar</a>
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon" />
//           </button>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               <li className="nav-item">
//               <Link className="nav-link" to="/">Home </Link>              </li>
          
//               <li className="nav-item">
//               <Link className="nav-link active" to="/wecancy">Wecancy   </Link>
//               </li>
//               <li className="nav-item">
//               <li><Link className="nav-link" to="/signin">SignIn   </Link></li>
//               </li>
//               <li className="nav-item">
//               <li><Link className="nav-link" to="/signup">SignUp   </Link></li>
//               </li>
              
//               <li className="nav-item">
//                 <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">Disabled</a>
//               </li>
//             </ul>
//             <form className="d-flex">
//               <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
//               <button className="btn btn-outline-success" type="submit">Search</button>
//             </form>
//           </div>
//         </div>
//       </nav>
           
              
//                 <div className='container'>
//                          <h1 >The Smart School</h1>
//                           <h3>Admission Form</h3>
//   {/* ..................... */}

//   {/* ............................... */}
//                           <form action="">
//                   <label> Name   :</label>   <input id="standard-basic" className="input" value={name}  label="Name"  onChange={(e)=> setName(e.target.value)} />  <br/>
//                   <label> F.Name :</label>   <input id="standard-basic" className="input" value={fname}  label="fname"  onChange={(e)=> setFname(e.target.value)} />  <br/>
//                   <label> Class  :</label>   <input id="standard-basic" className="input" value={cls}  label="class"  onChange={(e)=> setClassnum(e.target.value)} />  <br/>
//                   <label> Address :</label>  <input id="standard-basic" className="input" value={address}  label="address"  onChange={(e)=> setAddress(e.target.value)} /> <br/> <br />
//                   <button variant="contained" color="secomdary" onClick={submit}>submit</button>
//                   {/* <button variant="contained" color="primary" onClick={logout}>logout</button> */}
//                       </form>
//                      </div>  
                   
//                        <div className="data">
//                              <table>
//                                      <tr>
//                                      <th>Name </th>        <br />
//                                      <th>f.Name </th><br />
//                                      <th>Class </th><br />
//                                      <th> Address </th><br />
//                                       </tr>

//                                       {allData && allData.map((d,i)=>{
//                                               return(
//                                                       <tr>
//                                                               <td>{ name} </td>
//                                                               <td> {fname} </td>
//                                                               <td> {cls} </td>
//                                                                <td> {address}  </td>
//                                                               </tr>
//                                               )
//                                       })}
//                                       </table>  
                                                            
                               
//                                 </div>





                  
//                  </div>


        



                
        
//         )
// }

// export default App;