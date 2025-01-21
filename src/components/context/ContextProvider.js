import React from "react";
import { AuthProvider } from "./AuthContext";
import { PreferencesProvider } from "./PreferencesContext";
import { LeagueOrderProvider } from "./LeagueOrderContext";
import { ThemeProvider } from "./ThemeContext";
import { DateProvider } from "./DateContext";
import { BettingSlipProvider } from "./BettingSlipContext";

const ContextProvider = ({ children }) => (
    <AuthProvider>
        <PreferencesProvider>
            <LeagueOrderProvider>
                <ThemeProvider>
                    <DateProvider>
                        <BettingSlipProvider>{children}</BettingSlipProvider>
                    </DateProvider>
                </ThemeProvider>
            </LeagueOrderProvider>
        </PreferencesProvider>
    </AuthProvider>
);

export default ContextProvider;
