import React, { createContext, useState, useCallback } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/localStorageUtils';


export const PreferencesContext = createContext();

const DEFAULT_PREFERENCES = {
    timezone: 'GMT+1',
    sortType: 'LEAGUE_NAME',
    darkMode: true,
};

export const PreferencesProvider = ({ children }) => {
    const [preferences, setPreferences] = useState(() =>
        loadFromLocalStorage('userPreferences', DEFAULT_PREFERENCES)
    );

    const updatePreferences = useCallback((newPreferences) => {
        const updatedPreferences = { ...preferences, ...newPreferences };
        setPreferences(updatedPreferences);
        saveToLocalStorage('userPreferences', updatedPreferences);
    }, [preferences]);

    return (
        <PreferencesContext.Provider value={{ preferences, updatePreferences }}>
            {children}
        </PreferencesContext.Provider>
    );
};
