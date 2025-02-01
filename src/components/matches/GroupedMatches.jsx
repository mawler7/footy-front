import React from "react";
import MatchesSection from "./MatchesSection";

const GroupedMatches = React.memo(
    ({
        filteredGroupedMatches,
        toggleFavorite,
        favorites,
        expandedSections,
        toggleSection,
        handleMatchClick,
        handleLeagueClick,
        toggleBettingSlip,
        showBubble,
    }) => {
        return (
            <>
                {Object.entries(filteredGroupedMatches).map(([key, matches]) => (
                    <MatchesSection
                        key={key}
                        title={key}
                        groupedMatches={matches}
                        toggleFavorite={toggleFavorite}
                        favorites={favorites}
                        expandedSections={expandedSections}
                        toggleSection={toggleSection}
                        handleMatchClick={handleMatchClick}
                        handleLeagueClick={handleLeagueClick}
                        toggleBettingSlip={toggleBettingSlip}
                        showBubble={showBubble}
                    />
                ))}
            </>
        );
    },
    (prevProps, nextProps) => {
        return (
            prevProps.filteredGroupedMatches === nextProps.filteredGroupedMatches &&
            prevProps.toggleFavorite === nextProps.toggleFavorite &&
            prevProps.favorites === nextProps.favorites
        );
    }
);

export default GroupedMatches;
