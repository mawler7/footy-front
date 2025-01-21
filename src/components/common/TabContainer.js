import React from 'react';
import { TabContainerWrapper } from '../../styles/league/TabContainerStyles';
import { Tab } from "../../styles/buttons/buttons";

const TabContainer = ({ tabs, activeTab, onTabClick, isBettingSlipOpen }) => {
  return (
    <TabContainerWrapper $isBettingSlipOpen={isBettingSlipOpen}>
      {tabs?.map(({ key, label, isVisible }) =>
        isVisible ? (
          <Tab
            key={key}
            $isActive={activeTab === key}
            onClick={() => onTabClick(key)}
          >
            {label}
          </Tab>
        ) : null
      )}
    </TabContainerWrapper>
  );
};

export default TabContainer;
