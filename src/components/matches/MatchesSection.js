import React from 'react';
import StarButton from "../../styles/buttons/StarButton";
import MatchComponent from './MatchComponent';
import {
  LeagueHeader, LeagueLogo, LeagueName, LeagueSection, MatchesList, SectionHeader, SectionWrapper
}
  from '../../styles/match/MatchesSectionStyles';

const MatchesSection = ({
  title,
  groupedMatches,
  toggleFavorite,
  favorites,
  handleMatchClick,
  expandedSections,
  setExpandedSections,
  handleAddToSlip,
  isBettingSlipOpen
}) => {
  if (!groupedMatches || !Object.keys(groupedMatches).length) return null;

  return (
    <SectionWrapper isBettingSlipOpen={isBettingSlipOpen}>
      <SectionHeader>{title}</SectionHeader>
      {Object.values(groupedMatches).map((group) => {
        const allFavorite = group.matches.every((match) =>
          favorites.some((fav) => fav.id === match.id)
        );
        const isExpanded = expandedSections[group.league.id] ?? true;

        return (
          <LeagueSection key={group.league.id}>
            <LeagueHeader
              onClick={() =>
                setExpandedSections((prev) => ({
                  ...prev,
                  [group.league.id]: !isExpanded,
                }))
              }
            >
              <StarButton
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(group.matches);
                }}
                isActive={allFavorite}
              />
              <LeagueLogo src={group.league.logo || 'default-logo.png'} alt={group.league.name} />
              <LeagueName>{group.league.name}</LeagueName>
            </LeagueHeader>
            {isExpanded && (
              <MatchesList isBettingSlipOpen={isBettingSlipOpen}>
                {group.matches.map((match) => (
                  <MatchComponent
                    key={match.id}
                    match={match}
                    handleMatchClick={handleMatchClick}
                    toggleFavorite={toggleFavorite}
                    favorites={favorites}
                    handleAddToSlip={handleAddToSlip}
                  />
                ))}
              </MatchesList>
            )}
          </LeagueSection>
        );
      })}
    </SectionWrapper>
  );
};


export default MatchesSection;
