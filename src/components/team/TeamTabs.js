import React from 'react';
import { Tab } from '../../styles/buttons';

const TeamTabs = ({ activeTab, setActiveTab, isBettingSlipOpen }) => {
    const tabs = ['summary', 'standings', 'squad'];

    return (
        < >
            {tabs.map((tab) => (
                <Tab
                    key={tab}
                    active={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Tab>
            ))}
        </>
    );
};

export default TeamTabs;