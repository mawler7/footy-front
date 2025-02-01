import React from 'react';
import { Tab } from '../../styles/buttons/buttons';
import { TabContainerWrapper } from '../../styles/league/TabContainerStyles';

const TabNavigation = ({ activeTab, setActiveTab }) => (
  <TabContainerWrapper>
    {['summary', 'standings', 'squad'].map((tab) => (
      <Tab
        key={tab}
        active={activeTab === tab}
        onClick={() => setActiveTab(tab)}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </Tab>
    ))}
  </TabContainerWrapper>
);

export default React.memo(TabNavigation);
