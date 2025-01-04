import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSortConfig from '../../hooks/standings/useSortConfig';
import useFetchStandings from '../../hooks/standings/useFetchStandings';
import useDescriptionColors from '../../hooks/standings/useDescriptionColors';
import useTeamForm from '../../hooks/standings/useTeamForm';
import {
  FormContainer,
  StandingsFormItem,
  GroupSpacing,
  FilterContainer,
  Legend,
  LegendColor,
  LegendItem,
  LegendTitle,
  RankSquare,
  StyledStandingWrapper,
  StyledTableCell,
  StyledTableContainer,
  StyledTableRow,
  StyledTableTeamCell,
  TeamCell,
  TeamLogo,
  StyledTableHeader,
} from '../../styles/standings/StandingsStyles'
import { SubTab, TableFilterButton } from '../../styles/buttons/buttons';
import { LeagueButton, LeagueLogoImage, LeagueTooltip } from '../../styles/team/SquadStyles';

const Standings = ({ leagueId, singleLeagueMode = false, onLeagueChange, leagues = [], isBettingSlipOpen }) => {
  const [filterType, setFilterType] = useState('total');
  const { handleSort, sortedTeams } = useSortConfig();
  const { groupedStandings, fixtures } = useFetchStandings(leagueId, filterType);
  const descriptionColors = useDescriptionColors(groupedStandings);
  const hasStandings = useMemo(() => Object.keys(groupedStandings).length > 0, [groupedStandings]);
  const { calculateForm } = useTeamForm(fixtures);
  const navigate = useNavigate();

  const renderLegend = (descriptionColors) => {
    if (!descriptionColors || Object.keys(descriptionColors).length === 0) return null;

    return (
      <Legend>
        <LegendTitle>Legend</LegendTitle>
        {Object.entries(descriptionColors).map(([description, color]) => (
          <LegendItem key={description}>
            <LegendColor color={color} />
            {description}
          </LegendItem>
        ))}
      </Legend>
    );
  };

  const [updatedFormIndicators, setUpdatedFormIndicators] = useState({});

  useEffect(() => {
    const newFormIndicators = {};
    Object.entries(groupedStandings).forEach(([groupName, teams]) => {
      teams.forEach((team) => {
        newFormIndicators[team.team.name] = calculateForm(team.team.name, team.filteredData.played);
      });
    });
    setUpdatedFormIndicators(newFormIndicators);
  }, [groupedStandings, calculateForm, filterType]);

  const handleTeamClick = (teamId) => {
    navigate(`/team/${teamId}`);
  };

  const handleIndicatorClick = (matchId) => {
    if (matchId) {
      navigate(`/fixture/id/${matchId}`);
    }
  };

  return (
    <StyledStandingWrapper>
      {!singleLeagueMode && (
        <FilterContainer>
          {leagues
            .slice()
            .sort((a, b) => a.leagueName.localeCompare(b.leagueName))
            .map((league) => (
              <LeagueButton
                key={league.id}
                $isActive={league.id === leagueId}
                onClick={() => onLeagueChange(league.id)}
              >
                <LeagueLogoImage
                  src={league.league.logo}
                  alt={league.league.leagueName}
                />
                <LeagueTooltip>{league.league.leagueName}</LeagueTooltip>
              </LeagueButton>
            ))}
        </FilterContainer>
      )}
      {hasStandings && (
        <TableFilterButton isBettingSlipOpen={isBettingSlipOpen}>
          <SubTab $isActive={filterType === 'total'} onClick={() => setFilterType('total')}>Total</SubTab>
          <SubTab $isActive={filterType === 'home'} onClick={() => setFilterType('home')}>Home</SubTab>
          <SubTab $isActive={filterType === 'away'} onClick={() => setFilterType('away')}>Away</SubTab>
        </TableFilterButton>
      )}
      {Object.entries(groupedStandings).map(([groupName, teams]) => (
        <GroupSpacing key={groupName}>
          <StyledTableContainer isBettingSlipOpen={isBettingSlipOpen} >
            <thead>
              <StyledTableRow>
                <StyledTableHeader onClick={() => handleSort('rank')}>#</StyledTableHeader>
                <TeamCell onClick={() => handleSort('team.name')} style={{ cursor: 'pointer' }}>
                  Team
                </TeamCell>
                <StyledTableHeader isBettingSlipOpen={isBettingSlipOpen} onClick={() => handleSort('filteredData.played')}>P</StyledTableHeader>
                <StyledTableHeader isBettingSlipOpen={isBettingSlipOpen} onClick={() => handleSort('filteredData.win')}>W</StyledTableHeader>
                <StyledTableHeader isBettingSlipOpen={isBettingSlipOpen} onClick={() => handleSort('filteredData.draw')}>D</StyledTableHeader>
                <StyledTableHeader isBettingSlipOpen={isBettingSlipOpen} onClick={() => handleSort('filteredData.lose')}>L</StyledTableHeader>
                <StyledTableHeader isBettingSlipOpen={isBettingSlipOpen} onClick={() => handleSort('filteredData.goals.for')}>G</StyledTableHeader>
                <StyledTableHeader isBettingSlipOpen={isBettingSlipOpen} onClick={() => handleSort('points')}>Pts</StyledTableHeader>
                <StyledTableHeader isBettingSlipOpen={isBettingSlipOpen} onClick={() => handleSort('formPoints')}>Form</StyledTableHeader>
              </StyledTableRow>
            </thead>
            <tbody>
              {sortedTeams(teams).map((team, index) => (
                <StyledTableRow key={team.team.id}>
                  <StyledTableCell isBettingSlipOpen={isBettingSlipOpen}>
                    <RankSquare color={descriptionColors[team.description]}>{index + 1}</RankSquare>
                  </StyledTableCell>
                  <StyledTableTeamCell isBettingSlipOpen={isBettingSlipOpen}>
                    <TeamCell onClick={() => handleTeamClick(team.team.id)} style={{ cursor: 'pointer' }}>
                      <TeamLogo src={team.team.logo} alt={team.team.name} />
                      {team.team.name}
                    </TeamCell>
                  </StyledTableTeamCell>
                  <StyledTableCell isBettingSlipOpen={isBettingSlipOpen}>{team.filteredData.played}</StyledTableCell>
                  <StyledTableCell isBettingSlipOpen={isBettingSlipOpen} >{team.filteredData.win}</StyledTableCell>
                  <StyledTableCell isBettingSlipOpen={isBettingSlipOpen}>{team.filteredData.draw}</StyledTableCell>
                  <StyledTableCell isBettingSlipOpen={isBettingSlipOpen}>{team.filteredData.lose}</StyledTableCell>
                  <StyledTableCell isBettingSlipOpen={isBettingSlipOpen}>
                    {team.filteredData.goals.for}:{team.filteredData.goals.against}
                  </StyledTableCell>
                  <StyledTableCell isBettingSlipOpen={isBettingSlipOpen}>{team.points}</StyledTableCell>
                  <StyledTableCell  >
                    <FormContainer>
                      {calculateForm(team.team.name, team.filteredData.played).map((formItem, idx) => (
                        <StandingsFormItem
                          key={idx}
                          color={formItem.color}
                          title={formItem.tooltip}
                          onClick={() => handleIndicatorClick(formItem.matchId)}
                        >
                          {formItem.result}
                        </StandingsFormItem>
                      ))}
                    </FormContainer>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </tbody>
          </StyledTableContainer>
        </GroupSpacing>
      ))}
      {renderLegend(descriptionColors)}
    </StyledStandingWrapper>
  );
};

export default Standings;