import React,{useState} from 'react'
import axios from 'axios';

const Register = () => {
    const [data,setData] = useState({
        name:'',
        email:'',
        password:'',
        confirmpassword:''
    })
    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler = e =>{
        e.preventDefault();
        axios.post('https://loginauthen-mern.onrender.com/addDetails',data).then(
            res => {alert(res.data);setData({
                name:'',
                email:'',
                password:'',
                confirmpassword:''
            })}
        )
       
    }
    return (
        <div>
            <center>
            <h3>Register</h3>
              <div className='card bg-dark text-white pt-5' style={{width:"30rem"}}>
            <form onSubmit={submitHandler} className='form-group' >
                
                <input type="text" onChange={changeHandler} name="name" placeholder="User Name"  className='form-control' required/><br />
                <input type="email" onChange={changeHandler} name="email" placeholder="Email" className='form-control' required/><br />
                <input type="password" onChange={changeHandler} name="password" placeholder="Password" className='form-control' required/><br />
                <input type="password" onChange={changeHandler} name="confirmpassword" placeholder="Confirm Password" className='form-control' required/><br />
                <input type="submit" value="Register" className='btn btn-primary'/><br />
            </form>
            </div>
            </center>
        </div>
    )
}

export default Register
