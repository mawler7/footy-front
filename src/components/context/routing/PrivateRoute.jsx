import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import LoadingSpinner from '../../common/LoadingSpinner';

const PrivateRoute = ({ children }) => {
    const { isLoggedIn, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return (
            <LoadingSpinner />
        );
    }

    return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
