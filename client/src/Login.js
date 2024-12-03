
import React,{useState,useContext} from 'react'
import axios from 'axios';
import {store} from './App';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const [token,setToken] = useContext(store)
    const [data,setData] = useState({
        email:'',
        password:'',
    })
    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler = e =>{
        e.preventDefault();
        axios.post('https://loginauthen-mern.onrender.com/login',data).then(
            res => setToken(res.data.token)
        )
    }
    if(token){
       return <Navigate to='/myprofile' />
    }
    return (
        <div>
            <center>
            <h3>Login</h3>
                <div className='card text-white bg-dark pt-5' style={{width:'30rem'}}>
            <form onSubmit={submitHandler} className='form'>
                <div className='form-group'>
                
                <input type="email" onChange={changeHandler} name="email" placeholder="Email" className='form-control' required/><br />
                <input type="password" onChange={changeHandler} name="password" placeholder="Password"className=' form-control' required /><br />
                <input type="submit" className='btn btn-success form-group' value="Login" /><br />
                </div>
            </form>
            </div>
            </center>
        </div>
    )
}

export default Login
