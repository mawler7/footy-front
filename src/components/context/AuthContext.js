import React, { createContext, useState, useCallback } from 'react';
import useAuth from '../../hooks/context/useAuth';

const DEFAULT_PREFERENCES = {
    timezone: 'GMT+1',
    sortType: 'LEAGUE_NAME',
    darkMode: true,
};

const getLocalStorageItem = (key, fallback) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
};

const setLocalStorageItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const useUserPreferences = () => {
    const [userPreferences, setUserPreferences] = useState(() =>
        getLocalStorageItem('userPreferences', DEFAULT_PREFERENCES)
    );

    const savePreferences = useCallback((newPreferences) => {
        const updatedPreferences = { ...userPreferences, ...newPreferences };
        setUserPreferences(updatedPreferences);
        setLocalStorageItem('userPreferences', updatedPreferences);
    }, [userPreferences]);

    const toggleTheme = useCallback(() => {
        savePreferences({ darkMode: !userPreferences.darkMode });
    }, [savePreferences, userPreferences.darkMode]);

    return { userPreferences, savePreferences, toggleTheme };
};

const useLeagueOrder = () => {
    const [leagueOrder, setLeagueOrder] = useState(() =>
        getLocalStorageItem('leagueOrder', [])
    );

    const updateLeagueOrder = useCallback((newOrder) => {
        setLeagueOrder(newOrder);
        setLocalStorageItem('leagueOrder', newOrder);
    }, []);

    return { leagueOrder, updateLeagueOrder };
};

export const AuthContext = createContext({
    userPreferences: DEFAULT_PREFERENCES,
    leagueOrder: [],
    savePreferences: () => { },
    toggleTheme: () => { },
    setLeagueOrder: () => { },
    isLoggedIn: false,
    isLoading: false,
    saveToken: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }) => {
    const { userPreferences, savePreferences, toggleTheme } = useUserPreferences();
    const { leagueOrder, updateLeagueOrder } = useLeagueOrder();
    const { isLoggedIn, isLoading, saveToken, handleLogout } = useAuth();

    return (
        <AuthContext.Provider
            value={{
                userPreferences,
                savePreferences,
                toggleTheme,
                leagueOrder,
                setLeagueOrder: updateLeagueOrder,
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
