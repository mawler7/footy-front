import React from 'react';
import { UserProvider } from './UserContext';
import { AppStateProvider } from './AppStateContext';
import { BettingSlipProvider } from './BettingSlipContext';

const ContextProvider = ({ children }) => (
    <UserProvider>
        <AppStateProvider>
            <BettingSlipProvider>
                {children}
            </BettingSlipProvider>
        </AppStateProvider>
    </UserProvider>
);

export default ContextProvider;
