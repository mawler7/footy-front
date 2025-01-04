import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { lightTheme, darkTheme } from './styles/content/themes';

import AppContent from './components/context/AppContent';
import { AuthContext } from './components/context/AuthContext';

const App = () => {
    const { userPreferences } = useContext(AuthContext);

    return (
        <ThemeProvider theme={userPreferences.darkMode ? darkTheme : lightTheme}>
            <GlobalStyles />
            <AppContent />
        </ThemeProvider>
    );
};

export default App;
