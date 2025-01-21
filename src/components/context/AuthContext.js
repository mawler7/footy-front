import React, { createContext } from 'react';
import useAuth from '../../hooks/context/useAuth';

export const AuthContext = createContext({
    isLoggedIn: false,
    isLoading: false,
    saveToken: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }) => {
    const { isLoggedIn, isLoading, saveToken, handleLogout } = useAuth();

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                isLoading,
                saveToken,
                logout: handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
