import React from 'react';
import styled from 'styled-components';

const TeamTabs = ({ activeTab, setActiveTab }) => {
    const tabs = ['summary', 'standings', 'squad'];

    return (
        <TabContainer>
            {tabs.map((tab) => (
                <TabButton
                    key={tab}
                    active={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabButton>
            ))}
        </TabContainer>
    );
};

export default TeamTabs;

const TabContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
`;

const TabButton = styled.button`
    background: ${({ active }) => (active ? '#3498db' : '#2c3e50')};
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background: #2980b9;
    }
`;
