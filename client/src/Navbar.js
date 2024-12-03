import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import { store } from './App';

const Nav = () => {
    const [token,setToken] = useContext(store)
    return (
      <form class="form-inline my-2 my-lg-0">
      <ul>
          <Link to='/register' ><li>Register</li></Link>
          <Link to='/login' ><li>Login</li></Link>
          <Link to='/update'><li>Update</li></Link>
      </ul>
      </form>
    )
}

export default Nav
