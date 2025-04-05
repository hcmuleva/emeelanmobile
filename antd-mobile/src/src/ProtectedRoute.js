import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;