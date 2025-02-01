import React, { createContext, useState, useCallback, useMemo } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/localStorageUtils';

export const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [leagueOrder, setLeagueOrder] = useState(() =>
        loadFromLocalStorage('leagueOrder', [])
    );
    const [isAdminView, setIsAdminView] = useState(false);

    const updateLeagueOrder = useCallback((newOrder) => {
        setLeagueOrder(newOrder);
        saveToLocalStorage('leagueOrder', newOrder);
    }, []);

    const toggleAdminView = useCallback(() => {
        setIsAdminView((prev) => !prev);
    }, []);

    const contextValue = useMemo(() => ({
        selectedDate,
        setSelectedDate,
        leagueOrder,
        updateLeagueOrder,
        isAdminView,
        toggleAdminView,
        setIsAdminView,
    }), [
        selectedDate,
        leagueOrder,
        updateLeagueOrder,
        isAdminView,
        toggleAdminView,
    ]);

    return (
        <AppStateContext.Provider value={contextValue}>
            {children}
        </AppStateContext.Provider>
    );
};
