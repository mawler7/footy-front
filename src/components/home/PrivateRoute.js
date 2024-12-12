import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { isLoggedIn, isLoading } = useContext(AuthContext);

    console.log("PrivateRoute - isLoggedIn:", isLoggedIn, "isLoading:", isLoading);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;