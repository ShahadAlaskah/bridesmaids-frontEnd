import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const AuthRoute = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      const request = await fetch('/api/v1/user/me');
      if (request.status === 401) {
        localStorage.removeItem('loggedIn');
        navigate('/login');
      }
    };
    checkAuth();
  }, []);
  if (!localStorage.getItem('loggedIn')) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default AuthRoute;