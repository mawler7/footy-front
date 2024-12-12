import React from 'react';
import styled from 'styled-components';
import BaseButton from '../common/BaseButton';

const TabNavigation = ({ activeTab, setActiveTab }) => (
    <TabContainer>
        <TabButton $isActive={activeTab === 'summary'} onClick={() => setActiveTab('summary')}>Summary</TabButton>
        <TabButton $isActive={activeTab === 'standings'} onClick={() => setActiveTab('standings')}>Standings</TabButton>
        <TabButton $isActive={activeTab === 'squad'} onClick={() => setActiveTab('squad')}>Squad</TabButton>
    </TabContainer>
);

export default TabNavigation;

const TabContainer = styled.div`
    display: flex;
    gap: 5px;
    margin-bottom: 5px;

    border-bottom: 2px solid #ccc;
    
`;

export const TabButton = styled(BaseButton)`
  background: ${({ $isActive }) => ($isActive ? 'rgba(68, 76, 78, 0.85)' : 'rgba(48, 54, 56, 0.65)')};
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#b0b4b8')};
  border: ${({ $isActive }) => ($isActive ? '2px solid rgb(35, 40, 42)' : '1px solid rgba(68, 76, 78, 0.5)')};
  border-radius: 5px;
  width: 80px;
  height: 34px;
  padding: 6px 12px;
  font-weight: 500;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.2s ease;
  box-shadow: ${({ $isActive }) => ($isActive ? '0 3px 6px rgba(35, 40, 42, 0.4)' : 'none')};

  &:hover {
    background: ${({ $isActive }) => ($isActive ? 'rgb(85, 94, 97)' : 'rgb(58, 63, 65)')};
    color: #ffffff;
    box-shadow: ${({ $isActive }) => ($isActive ? '0 4px 8px rgba(85, 94, 97, 0.8)' : '0 3px 6px rgba(68, 76, 78, 0.8)')};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(85, 94, 97, 0.6);
  }

  &:active {
    transform: scale(0.97);
  }
`;