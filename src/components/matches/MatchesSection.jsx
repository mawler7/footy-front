import React from "react";
import StarButton from "../../styles/buttons/StarButton";
import MatchComponent from "./MatchComponent";
import {
  LeagueHeader, LeagueLogo, LeagueName, LeagueSection, MatchesList, SectionHeader, SectionWrapper,
} from "../../styles/match/MatchesSectionStyles";

const MatchesSection = React.memo(
  ({
    title,
    groupedMatches,
    toggleFavorite,
    favorites,
    expandedSections,
    toggleSection,
    handleMatchClick,
    handleLeagueClick,
    toggleBettingSlip,
    showBubble,
  }) => {
    if (!groupedMatches || !Object.keys(groupedMatches).length) return null;

    return (
      <SectionWrapper>
        <SectionHeader onClick={() => toggleSection(title, null, groupedMatches, true)}>
          {title}
        </SectionHeader>
        {Object.values(groupedMatches).map((group) => {
          const { league, matches } = group;
          const isExpanded = expandedSections[title]?.[league.id] ?? true;

          if (!league?.id) {
            console.warn("Invalid league data:", league);
            return null;
          }

          return (
            <LeagueSection key={league.id}>
              <LeagueHeader onClick={() => toggleSection(title, league.id)}>
                <StarButton
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(matches);
                  }}
                  isActive={matches.every((match) =>
                    favorites.some((fav) => fav.id === match.id)
                  )}
                />
                <LeagueLogo
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLeagueClick(league.id);
                  }}
                  src={league.logo || "default-logo.png"}
                  alt={league.name}
                />
                <LeagueName>{league.name}</LeagueName>
              </LeagueHeader>
              {isExpanded && (
                <MatchesList>
                  {matches
                    .slice()
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((match) => (
                      <MatchComponent
                        key={match.id}
                        match={match}
                        handleMatchClick={handleMatchClick}
                        toggleFavorite={toggleFavorite}
                        favorites={favorites}
                        toggleBettingSlip={toggleBettingSlip}
                        showBubble={showBubble}
                      />
                    ))}
                </MatchesList>
              )}
            </LeagueSection>
          );
        })}
      </SectionWrapper>
    );
  }
);

export default React.memo(MatchesSection, (prevProps, nextProps) => {
  return (
    prevProps.title === nextProps.title &&
    prevProps.groupedMatches === nextProps.groupedMatches &&
    prevProps.expandedSections === nextProps.expandedSections &&
    prevProps.favorites === nextProps.favorites
  );
});
