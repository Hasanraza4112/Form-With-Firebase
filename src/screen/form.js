import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import firebase from '../configs/firebase'
import './form.css'
function Form(props) {
// const [form, setForm] = useState('')
const [allform, setallform] = useState([])
const [user, setUser] = useState({})
const [name,setName]=useState('')
const [fname,setFname]=useState('')
const [classs,setClass]=useState('')
const [address,setAddress]=useState('')
const [lastEducation,setLastEducation]=useState('')
const [dateOfBirth,setDateOfBirth]=useState('')
const database = firebase.database()

useEffect(() => {
   
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
            setallform(Object.values(forms.val()))
            console.log(Object.values(forms.val()))
        }
    })
}
const getUserFormFromFirebase = (userId) => {
    let arr = []
    database.ref('form').orderByChild('userId').equalTo(userId).on('child_added', (forms) => {
        console.log(forms.val())
        let form = forms.val()
        form.formId = forms.key
        arr.push(form)
    })
        setallform([...arr])
    }
    const logoutUser = () => {
        firebase.auth().signOut()
        props.history.push('/signin')
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
    
}
const deleteform = (formId, index) => {
        console.log(index,formId)
        let arr = allform
        arr.splice(index,1)
        setallform([...arr])
        database.ref('form/' + formId).remove();
    }
const Logout = () => {
    firebase.auth().signOut()
    props.history.push('/signin')
}
    return (
        // <Link className="nav-link " to="/">Home </Link>  
<div className=''>
<ul className='navi'>
  <li className={'navi_list'}><Link to="/" >Home</Link></li>
  <li className={'navi_list'}><Link  to="/wecancy"  >Wecancy</Link></li>
  <li className={'navi_list'}><Link to="/signin" >SignIn</Link></li>
  <li className='navi_list' style={{float: 'right'}}><Link onClick={Logout} >Log out</Link></li></ul>




<div className='container'>

  
  
    <Link to='/allform' style={{float: 'right',color:'black !important'}}>All Sections Form</Link>

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
                  <button variant="contained" color="secomdary" style={{padding:'10px', marginTop:'2px',borderRadius:'9px',width:'100%',background:'green',color:'white'}} onClick={submit}>Submit</button>
                  <hr/>
                      </form>
            
            </div>

            <div className="main">
                {
                    allform.map((form, index) => {
                        
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
    <li className="list-group-item">Address:         {form.address}</li>
     <button    style={{background: "red",width:'100%',borderRadius:'9px',color:'white'}} onClick={() => deleteform(form.formId, index)}>Delete</button>

</div>
  </div>
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

