import React,{useContext,useState,useEffect} from 'react'
import {store} from './App';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import avatar from './avatar.png';

const Myprofile = () => {
    const [token,setToken] = useContext(store);
    const [data,setData] = useState(null);
    useEffect(() =>{
        axios.get('https://loginauthen-mern.onrender.com/myprofile',{
            headers: {
                'x-token' : token
            }
        }).then(res => setData(res.data)).catch((err) => console.log(err))
    },[])
    if(!token){
        return <Navigate to='/login' />
    }
    return (
        
            <center>
                
                <div className='card text-white bg-dark' style={{width:'30rem'}}>
                <form className='form-group'>
               <h1 className='card-title'>Dashbord</h1>
                 <button  onClick={() => setToken(null)} className='btn btn-danger'>Logout</button>
                 </form>
                 </div>
                 
            </center>
         
           
    )
}

export default Myprofile