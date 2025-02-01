import React from 'react';
import {
    FaListAlt,
    FaStar,
    FaCalendarAlt,
    FaPlay,
    FaCheckCircle,
} from 'react-icons/fa';
import { Tab } from '../styles/buttons/buttons';
import { Tooltip, TooltipWrapper } from '../styles/match/FiltersStyles';

export const filterButtonsConfig = [
    { key: 'All', icon: <FaListAlt />, tooltip: 'All' },
    { key: 'Favorites', icon: <FaStar />, tooltip: 'Favorites' },
    { key: 'Scheduled', icon: <FaCalendarAlt />, tooltip: 'Scheduled' },
    { key: 'Live', icon: <FaPlay />, tooltip: 'Live' },
    { key: 'Finished', icon: <FaCheckCircle />, tooltip: 'Finished' },
];

export const renderFilterButton = ({ key, icon, tooltip }, activeFilters, handleTabClick, count = null) => (
    <TooltipWrapper key={key}>
        <Tab
            $isActive={activeFilters.includes(key)}
            onClick={() => handleTabClick(key)}
            disabled={count === 0}
        >
            {icon}
        </Tab>
        <Tooltip>{tooltip}</Tooltip>
    </TooltipWrapper>
);
