import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth0();
  
  const ADMIN_EMAILS = import.meta.env.VITE_ADMIN_EMAILS

  const isAdmin = isAuthenticated && 
    ADMIN_EMAILS.includes(user?.email);

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
