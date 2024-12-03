import React,{useState,createContext}from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Navbar from './Navbar';
import Register from './Register';
import Login from './Login';
import Update from './Update'
import Myprofile from './myprofile' ;
export const store=createContext();
const App = () => {
  const [token,setToken]=useState(null);
  return (
    <div>
      <store.Provider value={[token,setToken ]}>
      <BrowserRouter>
      < Navbar/>
      <Routes>
          <Route path="/register" Component={Register}/>
          <Route path="/login" Component={Login}/>
          <Route path="/myprofile" Component={Myprofile}/>
          <Route path='/update' Component={Update}></Route>
      </Routes>
      </BrowserRouter>
      </store.Provider>
    </div>
  )
}

export default App;
