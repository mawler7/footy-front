import React from 'react';
import ContextProvider from './components/context/ContextProvider';
import AppContent from './components/context/AppContent';
import GlobalStyles from './styles/content/GlobalStyles';
import ErrorBoundary from './components/common/ErrorBoundary';

const App = () => (
    <ContextProvider>
        <GlobalStyles />
        <ErrorBoundary>
            <AppContent />
        </ErrorBoundary>
    </ContextProvider>
);

export default App;
