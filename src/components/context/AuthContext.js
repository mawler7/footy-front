import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({
    userPreferences: {
        timezone: 'GMT+1',
        sortType: 'LEAGUE_NAME',
        darkMode: false,
    },
    leagueOrder: [],
    savePreferences: () => { },
    setLeagueOrder: () => { },
});

export const AuthProvider = ({ children }) => {
    const DEFAULT_PREFERENCES = {
        timezone: 'GMT+1',
        sortType: 'LEAGUE_NAME',
        darkMode: false,
    };

    const [userPreferences, setUserPreferences] = useState(() => {
        const storedPreferences = localStorage.getItem('userPreferences');
        return storedPreferences ? JSON.parse(storedPreferences) : DEFAULT_PREFERENCES;
    });

    const [leagueOrder, setLeagueOrder] = useState(() => {
        const storedOrder = localStorage.getItem('leagueOrder');
        return storedOrder ? JSON.parse(storedOrder) : [39, 140, 135, 78, 61, 94, 144, 119, 88, 106, 203, 207, 307, 2, 3, 848, 531, 528, 66, 65, 143, 137, 206, 108, 81, 121, 46, 47, 937, 45, 1038, 90, 48, 871, 96, 526, 97, 209, 529, 547, 727, 543, 817, 5, 4, 1, 35, 913, 6, 36, 19, 30, 29, 32, 33, 34, 37, 31, 15, 26, 10];
    });

    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const updateLeagueOrder = (newOrder) => {
        setLeagueOrder(newOrder);
        localStorage.setItem('leagueOrder', JSON.stringify(newOrder));
    };

    const savePreferences = (newPreferences) => {
        const updatedPreferences = { ...userPreferences, ...newPreferences };
        setUserPreferences(updatedPreferences);
        localStorage.setItem('userPreferences', JSON.stringify(updatedPreferences));
    };

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get('token');
        if (token) {
            saveToken(token);
        }
    }, []);


    const saveToken = (token) => {
        if (!token) {
            console.error("No token to save");
            return;
        }
        localStorage.setItem('authToken', token);
        setIsLoggedIn(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        navigate('/');
    };
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        delete axios.defaults.headers.common['Authorization'];
        navigate('/login');
    };

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setIsLoggedIn(false);
                setIsLoading(false);
                navigate('/login');
                return;
            }
            try {
                await axios.get('http://localhost:8080/auth/verify', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setIsLoggedIn(true);
            } catch (error) {
                handleLogout();
            } finally {
                setIsLoading(false);
            }
        };

        verifyToken();
    }, [navigate]);

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get('token');
        if (token) {
            saveToken(token);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                isLoading,
                saveToken,
                logout: handleLogout,
                userPreferences,
                savePreferences,
                leagueOrder,
                setLeagueOrder: updateLeagueOrder,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
