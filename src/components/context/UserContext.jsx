import React, { createContext, useCallback, useMemo, useState } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/localStorageUtils';
import { lightTheme, darkTheme } from '../../styles/themes';
import useAuth from '../../hooks/context/useAuth';
import { ThemeProvider } from 'styled-components';
import { DEFAULT_PREFERENCES } from '../../utils/helpers';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const { isLoggedIn, isLoading, saveToken, handleLogout } = useAuth();

    const [preferences, setPreferences] = useState(() =>
        loadFromLocalStorage('userPreferences', DEFAULT_PREFERENCES)
    );
    const theme = preferences.darkMode ? darkTheme : lightTheme;
    const updatePreferences = useCallback((newPreferences) => {
        const updatedPreferences = { ...preferences, ...newPreferences };
        setPreferences(updatedPreferences);
        saveToLocalStorage('userPreferences', updatedPreferences);
    }, [preferences]);

    const toggleTheme = useCallback(() => {
        updatePreferences({ darkMode: !preferences.darkMode });
    }, [preferences, updatePreferences]);

    const contextValue = useMemo(() => ({
        isLoggedIn,
        isLoading,
        saveToken,
        logout: handleLogout,
        preferences,
        updatePreferences,
        toggleTheme,
        theme,
    }), [
        isLoggedIn,
        isLoading,
        saveToken,
        handleLogout,
        preferences,
        updatePreferences,
        toggleTheme,
        theme,
    ]);

    return (
        <UserContext.Provider value={contextValue}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </UserContext.Provider>
    );
};
