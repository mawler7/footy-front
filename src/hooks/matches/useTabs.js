import { useState, useCallback } from 'react';

export const useTabs = (initialTab = 'Match', defaultSubTabs = { Match: 'Predictions', Standings: 'Table' }) => {
    const [activeTab, setActiveTab] = useState(initialTab);
    const [activeSubTab, setActiveSubTab] = useState(defaultSubTabs[initialTab] || '');

    const handleTabChange = useCallback((tab) => {
        setActiveTab(tab);
        setActiveSubTab(defaultSubTabs[tab] || '');
    }, [defaultSubTabs]);

    return { activeTab, activeSubTab, setActiveSubTab, handleTabChange };
};
