import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user } = useAuth();

  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // For testing purposes, skip role checking - allow all logged in users to access any page
  // TODO: Enable role checking when connecting to real backend
  
  // If has permission, display component
  return children;
};

export default ProtectedRoute;