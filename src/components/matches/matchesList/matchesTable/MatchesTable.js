import React, { useMemo, useContext } from 'react';
import styled from 'styled-components';
import MatchComponent from '../matchComponent/MatchComponent';

import { AuthContext } from '../../../../components/context/AuthContext';
const MatchesTable = ({
  matches,

  favorites = [],
  handleMatchClick,
  toggleFavorite,
  handleAddToSlip,
  expandedSections,
  setExpandedSections
}) => {


  const sortType = useContext(AuthContext).userPreferences.sortType;
  const { leagueOrder } = useContext(AuthContext);

  const processedMatches = useMemo(() => {
    if (!matches || matches.length === 0) {
      console.warn("No matches provided, returning empty array");
      return [];
    }

    if (sortType === 'LEAGUE_NAME') {
      const grouped = matches.reduce((acc, match) => {
        if (!match.leagueId || !match.leagueName || !match.leagueLogo) {
          console.warn('Skipped match with missing data:', match);
          return acc;
        }

        if (!acc[match.leagueId]) {
          acc[match.leagueId] = {
            league: {
              id: match.leagueId,
              name: match.leagueName,
              logo: match.leagueLogo,
            },
            matches: [],
          };
        }

        acc[match.leagueId].matches.push(match);
        return acc;
      }, {});

      const sortedGroups = Object.values(grouped).map(group => ({
        league: group.league,
        matches: group.matches.sort((a, b) => new Date(a.date) - new Date(b.date)),
      })).sort((a, b) => {
        // Ensure proper handling of leagueOrder
        const orderA = leagueOrder?.indexOf(a.league.id);
        const orderB = leagueOrder?.indexOf(b.league.id);

        const normalizedOrderA = orderA >= 0 ? orderA : Infinity; // Unlisted leagues go to the end
        const normalizedOrderB = orderB >= 0 ? orderB : Infinity;

        return normalizedOrderA - normalizedOrderB;
      });

      return sortedGroups;
    }

    // Fallback sorting for other cases
    return matches
      .filter((match) => match.leagueId && match.leagueName && match.leagueLogo)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [matches, sortType, leagueOrder]);



  const toggleSection = (leagueId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [leagueId]: !prev[leagueId],
    }));
  };

  const renderMatches = () => {
    if (sortType === 'LEAGUE_NAME') {
      return processedMatches.map((group) => {
        if (!group.league || !group.matches) {
          console.warn('Skipped group with missing data:', group);
          return null;
        }

        return (
          <LeagueSection key={group.league.id}>
            <LeagueHeader onClick={() => toggleSection(group.league.id)}>
              <LeagueLogo src={group.league.logo || 'default-logo.png'} alt={group.league.name} />
              <LeagueName>{group.league.name}</LeagueName>
              <Chevron>{expandedSections[group.league.id] ? '▲' : '▼'}</Chevron>
            </LeagueHeader>
            {expandedSections[group.league.id] && (
              <MatchesList>
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
      });
    }

    // Renderowanie dla TIME
    return processedMatches.map((match, index) => {
      const isNewLeague =
        index === 0 || processedMatches[index - 1].leagueId !== match.leagueId;

      return (
        <React.Fragment key={match.id}>
          {isNewLeague && (
            <LeagueHeader>
              <LeagueLogo src={match.leagueLogo || 'default-logo.png'} alt={match.leagueName} />
              <LeagueName>{match.leagueName}</LeagueName>
            </LeagueHeader>
          )}
          <MatchComponent
            match={match}
            handleMatchClick={handleMatchClick}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
            handleAddToSlip={handleAddToSlip}
          />
        </React.Fragment>
      );
    });
  };



  return <Container>
    {Array.isArray(processedMatches) && processedMatches.length > 0 ? (
      renderMatches()
    ) : (
      <div>No matches available</div>
    )}
  </Container>
};

export default MatchesTable;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  width: 100%;
`;

const LeagueSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const MatchesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const LeagueHeader = styled.div`
  width: 100%;
  max-width: 680px;
  background-color: rgba(28, 30, 36, 0.85);
  border-radius: 5px;
  color: white;
  padding: 7px;
  font-weight: bold;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    background: linear-gradient(135deg, #3b9dbd, #3a87ad);
    color: #ffffff;
    box-shadow: 0 4px 8px rgba(58, 135, 173, 0.2);
  }
`;

const LeagueLogo = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  margin-right: 15px;
  object-fit: contain;
`;

const LeagueName = styled.span`
  flex-grow: 1;
`;

const Chevron = styled.span`
  font-size: 0.7rem;
  color: white;
`;
