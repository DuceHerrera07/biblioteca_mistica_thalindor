import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from './auth/auth';

const RoleBasedRoute = ({ children, role }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    const userRole = getUserRole();
    return userRole === role ? children : <Navigate to="/" />;
};

export default RoleBasedRoute;
