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
  StyledFixturesWrapper,
  FixtureRow,
  FixtureTeam,
  FixtureDate,
} from '../../styles/standings/StandingsStyles';
import { SubTab, TableFilterButton } from '../../styles/buttons/buttons';
import { LeagueButton, LeagueLogoImage, LeagueTooltip } from '../../styles/team/SquadStyles';

const Standings = ({ leagueId, singleLeagueMode = false, onLeagueChange, leagues = [], isBettingSlipOpen }) => {
  const [filterType, setFilterType] = useState('total');
  const { handleSort, sortedTeams } = useSortConfig();
  const { groupedStandings, fixtures } = useFetchStandings(leagueId, filterType);
  const descriptionColors = useDescriptionColors(groupedStandings);
  const hasStandings = useMemo(() => Object.keys(groupedStandings).length > 0, [groupedStandings]);
  const hasFixtures = useMemo(() => fixtures.length > 0, [fixtures]);
  const { calculateForm } = useTeamForm(fixtures);
  const navigate = useNavigate();

  const renderLegend = (descriptionColors, groupedStandings) => {
    if (!descriptionColors || Object.keys(descriptionColors).length === 0) return null;

    // Tworzymy listę pozycji w tabeli
    const sortedDescriptions = [];
    Object.values(groupedStandings).forEach((teams) => {
      teams.forEach((team) => {
        if (team.description) {
          sortedDescriptions.push({ description: team.description, color: descriptionColors[team.description] });
        }
      });
    });

    // Usuwamy duplikaty i zachowujemy kolejność
    const uniqueDescriptions = Array.from(
      new Map(sortedDescriptions.map((item) => [item.description, item])).values()
    );

    return (
      <Legend>
        <LegendTitle>Legend</LegendTitle>
        {uniqueDescriptions.map(({ description, color }) => (
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
    Object.entries(groupedStandings)?.forEach(([groupName, teams]) => {
      teams.forEach((team) => {
        const { form, formPoints } = calculateForm(
          team.team.name,
          team.filteredData.played,
          filterType
        );
        newFormIndicators[team.team.name] = form;
        team.formPoints = formPoints;
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

  const renderFixtures = () => (
    <StyledFixturesWrapper>
      <h2>Knockout Stage Fixtures</h2>
      {fixtures?.map((fixture) => (
        <FixtureRow key={fixture.id} onClick={() => navigate(`/fixture/id/${fixture.id}`)}>
          <FixtureDate>{new Date(fixture.date).toLocaleDateString()}</FixtureDate>
          <FixtureTeam>{fixture.homeTeam?.name || 'Unknown Team'}</FixtureTeam>
          <span>vs</span>
          <FixtureTeam>{fixture.awayTeam?.name || 'Unknown Team'}</FixtureTeam>
        </FixtureRow>
      ))}
    </StyledFixturesWrapper>
  );

  return (
    <StyledStandingWrapper isBettingSlipOpen={isBettingSlipOpen}>
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
      {hasStandings ? (
        <>
          <TableFilterButton $isBettingSlipOpen={isBettingSlipOpen}>
            <SubTab $isActive={filterType === 'total'} onClick={() => setFilterType('total')}>Total</SubTab>
            <SubTab $isActive={filterType === 'home'} onClick={() => setFilterType('home')}>Home</SubTab>
            <SubTab $isActive={filterType === 'away'} onClick={() => setFilterType('away')}>Away</SubTab>
          </TableFilterButton>
          {Object.entries(groupedStandings).map(([groupName, teams]) => (
            <GroupSpacing key={groupName}>
              <StyledTableContainer $isBettingSlipOpen={isBettingSlipOpen}>
                <thead>
                  <StyledTableRow>
                    <StyledTableHeader onClick={() => handleSort('rank')}>#</StyledTableHeader>
                    <StyledTableHeader onClick={() => handleSort('team.name')} style={{ cursor: 'pointer' }}>
                      Team
                    </StyledTableHeader>
                    <StyledTableHeader onClick={() => handleSort('filteredData.played')}>P</StyledTableHeader>
                    <StyledTableHeader onClick={() => handleSort('filteredData.win')}>W</StyledTableHeader>
                    <StyledTableHeader onClick={() => handleSort('filteredData.draw')}>D</StyledTableHeader>
                    <StyledTableHeader onClick={() => handleSort('filteredData.lose')}>L</StyledTableHeader>
                    <StyledTableHeader onClick={() => handleSort('filteredData.goals.for')}>G</StyledTableHeader>
                    <StyledTableHeader onClick={() => handleSort('points')}>Pts</StyledTableHeader>
                    <StyledTableHeader
                      className="form-header"
                      onClick={() => handleSort('formPoints')}
                    >
                      Form
                    </StyledTableHeader>
                  </StyledTableRow>
                </thead>
                <tbody>
                  {sortedTeams(teams).map((team, index) => (
                    <StyledTableRow key={team.team.id}>
                      <StyledTableCell>
                        <RankSquare color={descriptionColors[team.description]}>{index + 1}</RankSquare>
                      </StyledTableCell>
                      <StyledTableTeamCell>
                        <TeamCell onClick={() => handleTeamClick(team.team.id)} style={{ cursor: 'pointer' }}>
                          <TeamLogo src={team.team.logo} alt={team.team.name} />
                          {team.team.name}
                        </TeamCell>
                      </StyledTableTeamCell>
                      <StyledTableCell>{team.filteredData.played}</StyledTableCell>
                      <StyledTableCell>{team.filteredData.win}</StyledTableCell>
                      <StyledTableCell>{team.filteredData.draw}</StyledTableCell>
                      <StyledTableCell>{team.filteredData.lose}</StyledTableCell>
                      <StyledTableCell>
                        {team.filteredData.goals.for}:{team.filteredData.goals.against}
                      </StyledTableCell>
                      <StyledTableCell>{team.points}</StyledTableCell>
                      <StyledTableCell>
                        <FormContainer>
                          {updatedFormIndicators[team.team.name]?.map((formItem, idx) => (
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
        </>
      ) : hasFixtures ? (
        renderFixtures()
      ) : (
        <></>
      )}
      {renderLegend(descriptionColors, groupedStandings)}
    </StyledStandingWrapper>
  );
};

export default Standings;
