import React, { createContext, useState, useCallback } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/localStorageUtils';

export const LeagueOrderContext = createContext();

export const LeagueOrderProvider = ({ children }) => {
    const [leagueOrder, setLeagueOrder] = useState(() =>
        loadFromLocalStorage('leagueOrder', [])
    );

    const updateLeagueOrder = useCallback((newOrder) => {
        setLeagueOrder(newOrder);
        saveToLocalStorage('leagueOrder', newOrder);
    }, []);

    return (
        <LeagueOrderContext.Provider value={{ leagueOrder, updateLeagueOrder }}>
            {children}
        </LeagueOrderContext.Provider>
    );
};
