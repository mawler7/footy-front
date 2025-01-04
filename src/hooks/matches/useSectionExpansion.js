import { useState } from 'react';

export const useSectionExpansion = () => {
    const [expandedSections, setExpandedSections] = useState({});
    const [isAllExpanded, setIsAllExpanded] = useState(true);

    const toggleAllSections = (groupedSections) => {
        setExpandedSections((prevSections) => {
            const updatedSections = {};
            Object.keys(groupedSections).forEach((leagueId) => {
                updatedSections[leagueId] = !isAllExpanded;
            });
            return updatedSections;
        });
        setIsAllExpanded((prev) => !prev);
    };

    return { expandedSections, isAllExpanded, setExpandedSections, toggleAllSections };
};
