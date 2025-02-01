import { useState } from "react";

export const useSectionExpansion = () => {
    const [expandedSections, setExpandedSections] = useState({});
    const [isAllExpanded, setIsAllExpanded] = useState(true);

    const toggleSection = (section, leagueId = null, groupedMatches = null, toggleAll = false) => {
        setExpandedSections((prevSections) => {
            const updatedSections = { ...prevSections };

            if (toggleAll && groupedMatches) {
                const isSectionExpanded = Object.values(prevSections[section] || {}).some((expanded) => expanded);

                updatedSections[section] = {};
                Object.values(groupedMatches).forEach((group) => {
                    updatedSections[section][group.league.id] = !isSectionExpanded;
                });
            } else if (leagueId !== null) {
                updatedSections[section] = {
                    ...updatedSections[section],
                    [leagueId]: !(updatedSections[section]?.[leagueId] ?? true),
                };
            }

            return updatedSections;
        });
    };

    const toggleAll = (groupedMatches) => {
        if (!groupedMatches || typeof groupedMatches !== 'object') return;

        const newState = !isAllExpanded;

        setExpandedSections(() => {
            const updatedSections = {};

            Object.keys(groupedMatches).forEach((section) => {
                if (!groupedMatches[section]) return;

                updatedSections[section] = {};

                Object.values(groupedMatches[section] || {}).forEach((group) => {
                    if (group?.league?.id) {
                        updatedSections[section][group.league.id] = newState;
                    }
                });
            });

            return updatedSections;
        });

        setIsAllExpanded(newState);
    };

    return {
        expandedSections,
        isAllExpanded,
        toggleSection,
        toggleAll,
    };
};

