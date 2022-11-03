import jwtDecode from 'jwt-decode';
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import NotAuthorize from './NotAuthorize';

function ProtectedRoute({allowedRole}) {
  var token= localStorage.getItem("Authorization")
  if(token!==null){
    var decode= jwtDecode(token);
  }
 

    const auth=useSelector(state=>state.auth)

    const location=useLocation()

  return allowedRole?.includes(decode?.role)?<Outlet/>:localStorage.getItem("Authorization")!==null?<NotAuthorize/>:<Navigate to={"/sign-in"} state={{from:location}} replace/>
}

export default ProtectedRoute