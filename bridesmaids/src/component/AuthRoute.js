import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const AuthRoute = ({setUser}) => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      const request = await fetch('/api/v1/user/me');
      const data= await request.json();
      console.log(data)
      if (request.status === 200) {
        console.log(data)
        setUser(data);
      } else 
      if (request.status === 401) {
        localStorage.removeItem('loggedIn');
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);
  if (!localStorage.getItem('loggedIn')) {
   
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default AuthRoute;