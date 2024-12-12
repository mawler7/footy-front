import React, { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AuthProvider } from './components/context/AuthContext';
import GlobalStyle from './styles/GlobalStyles';
import { theme } from './styles/GlobalStyles';
import AppContent from './components/AppContent';

const App = () => (
    <ThemeProvider theme={theme}>
        <DndProvider backend={HTML5Backend}>
            <AuthProvider>
                <GlobalStyle />
                <Suspense fallback={<div>Loading...</div>}>
                    <AppContent />
                </Suspense>
            </AuthProvider>
        </DndProvider>
    </ThemeProvider>
);

export default App;
