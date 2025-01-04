import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { LoadingWrapper, Spinner } from '../../styles/GlobalStyles';

const PrivateRoute = ({ children }) => {
    const { isLoggedIn, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return (
            <LoadingWrapper>
                <Spinner />
            </LoadingWrapper>
        );
    }
    return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;