import React from 'react'
import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../context';
import Login from '../pages/Login';

import {publicRoutes, privateRoutes} from '../router';
import Loader from './UI/Loader/Loader';


const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext);

  if(isLoading){
    //console.log("Loading....");
    return <Loader/>
  }
  //console.log("DownLoading....");
  return ( 
    isAuth
    ?   
    <Routes>        
    {privateRoutes.map(route =>
      <Route path={route.path} element={route.component} key={route.path}/>            
    )}        
    </Routes>    
    :
    <Routes>
    {publicRoutes.map(route =>
      <Route path={route.path} element={route.component} key={route.path}/>       
    )}      
    </Routes>  
  )
}

export default AppRouter