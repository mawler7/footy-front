import React, { createContext, useContext, useState, useCallback } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../../styles/themes';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('darkMode');
        return savedTheme ? JSON.parse(savedTheme) : true;
    });

    const toggleTheme = useCallback(() => {
        setDarkMode((prev) => {
            const newMode = !prev;
            localStorage.setItem('darkMode', JSON.stringify(newMode));
            return newMode;
        });
    }, []);

    const theme = darkMode ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
