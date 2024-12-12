import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import BaseButton from '../BaseButton';

import { TableFilterButton, } from '../../../styles/GlobalStyles';

const Standings = ({ leagueId, singleLeagueMode = false, onLeagueChange, leagues = [] }) => {
  const [groupedStandings, setGroupedStandings] = useState({});
  const [filterType, setFilterType] = useState('total');
  const navigate = useNavigate();
  const [fixtures, setFixtures] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'points', direction: 'desc' });


  const fetchStandings = async () => {
    if (!leagueId) return;

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`http://localhost:8080/leagues/${leagueId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const leagueData = response.data;

      setFixtures(leagueData.fixtures || []);

      const groups = leagueData.standings.reduce((acc, team) => {
        const groupName = team.group || 'Unknown Group';
        if (!acc[groupName]) acc[groupName] = [];


        const filteredData =
          filterType === 'home'
            ? team.home
            : filterType === 'away'
              ? team.away
              : team.all;


        const points = (filteredData.win || 0) * 3 + (filteredData.draw || 0);

        acc[groupName].push({
          ...team,
          filteredData,
          points,
        });

        return acc;
      }, {});


      const sortedGroups = Object.entries(groups)
        .sort(([a], [b]) => a.localeCompare(b))
        .reduce((acc, [groupName, teams]) => {
          acc[groupName] = teams.sort((a, b) => b.points - a.points);
          return acc;
        }, {});


      setGroupedStandings(sortedGroups);
    } catch (error) {
      console.error('Error fetching standings:', error);
    }
  };

  const handleSort = (key) => {
    setSortConfig((prevState) => ({
      key,
      direction: prevState.key === key && prevState.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  const sortedTeams = (teams) => {
    return [...teams].sort((a, b) => {
      const getValue = (team, key) => {
        if (key === 'formPoints') {
          return calculateFormPoints(team.team.name);
        }
        if (key === 'team.name') {
          return team.team.name.toLowerCase();
        }
        return key.split('.').reduce((obj, k) => (obj ? obj[k] : undefined), team);
      };

      const valueA = getValue(a, sortConfig.key);
      const valueB = getValue(b, sortConfig.key);

      if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  useEffect(() => {
    fetchStandings();
  }, [leagueId, filterType]);

  const descriptionColors = useMemo(() => {
    const uniqueDescriptions = [...new Set(
      Object.values(groupedStandings).flat().map((team) => team.description).filter(Boolean)
    )].sort();

    const colorPalette = ['#27ae60', '#f39c12', '#8e44ad', '#2980b9'];
    return uniqueDescriptions.reduce((acc, desc, index) => {
      acc[desc] = desc.toLowerCase().includes('relegation') ? '#e74c3c' : colorPalette[index % colorPalette.length];
      return acc;
    }, {});
  }, [groupedStandings]);

  const calculateForm = (teamName, matchesPlayed) => {
    const teamFixtures = fixtures.filter(
      (match) => match.homeTeamName === teamName || match.awayTeamName === teamName
    );

    const currentDate = new Date();
    const nextMatch = teamFixtures.find((match) => new Date(match.date) > currentDate);
    const pastMatches = teamFixtures
      .filter((match) => new Date(match.date) < currentDate)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, Math.min(matchesPlayed, 5)); // Maksymalnie 5 ostatnich meczów

    const form = [];

    // Dodanie kolejnego meczu (jeśli istnieje) jako pierwszy element
    if (nextMatch) {
      form.push({
        result: '?',
        color: '#d3d3d3',
        tooltip: `${nextMatch.homeTeamName} vs ${nextMatch.awayTeamName}\n${new Date(
          nextMatch.date
        ).toLocaleString()}`,
        matchId: nextMatch.id,
      });
    }

    // Dodanie wskaźników dla przeszłych meczów
    pastMatches.forEach((match) => {
      const isHome = match.homeTeamName === teamName;
      const teamGoals = isHome ? match.fullTimeHome : match.fullTimeAway;
      const opponentGoals = isHome ? match.fullTimeAway : match.fullTimeHome;
      const result = teamGoals > opponentGoals ? 'W' : teamGoals === opponentGoals ? 'D' : 'L';
      const color = result === 'W' ? '#27ae60' : result === 'D' ? '#f39c12' : '#e74c3c';
      const tooltip = `${match.homeTeamName} ${match.fullTimeHome} - ${match.fullTimeAway} ${match.awayTeamName}\n${new Date(match.date).toLocaleString()}`;

      form.push({
        result,
        color,
        tooltip,
        matchId: match.id,
      });
    });

    // Ograniczenie liczby wskaźników do maksymalnie 6
    return form.slice(0, Math.max(matchesPlayed, 6));
  };



  const handleTeamClick = (teamId) => {
    navigate(`/team/${teamId}`);
  };

  const handleIndicatorClick = (matchId) => {
    if (matchId) {
      navigate(`/fixture/id/${matchId}`);
    }
  };


  const calculateFormPoints = (teamName) => {
    const form = calculateForm(teamName);
    return form.reduce((total, indicator) => {
      if (indicator.result === 'W') return total + 3;
      if (indicator.result === 'D') return total + 1;
      return total;
    }, 0);
  };



  const renderLegend = () => (
    <Legend>
      <LegendTitle>Legenda</LegendTitle>
      {Object.entries(descriptionColors).map(([description, color]) => (
        <LegendItem key={description}>
          <LegendColor color={color} />
          {description}
        </LegendItem>
      ))}
    </Legend>
  );

  return (
    <StyledStandingWrapper>
      {!singleLeagueMode && (
        <LeagueFilterContainer>
          {leagues
            .slice()
            .sort((a, b) => a.leagueName.localeCompare(b.leagueName))
            .map((league) => (
              <LeagueButton
                key={league.id}
                $isActive={league.id === leagueId}
                onClick={() => onLeagueChange(league.id)}
              >
                {league.leagueName}
              </LeagueButton>
            ))}
        </LeagueFilterContainer>
      )}
      <TableFilterButton>
        <StyledFilterButton $isActive={filterType === 'total'} onClick={() => setFilterType('total')}>Total</StyledFilterButton>
        <StyledFilterButton $isActive={filterType === 'home'} onClick={() => setFilterType('home')}>Home</StyledFilterButton>
        <StyledFilterButton $isActive={filterType === 'away'} onClick={() => setFilterType('away')}>Away</StyledFilterButton>
      </TableFilterButton>
      {Object.entries(groupedStandings).map(([groupName, teams]) => (
        <GroupSpacing key={groupName}>
          <GroupTitle>{groupName}</GroupTitle>
          <StyledTableContainer>
            <thead>
              <StyledTableRow>
                <StyledTableCell colWidth="30px" onClick={() => handleSort('rank')}>
                  #
                </StyledTableCell>
                <StyledTableTeamCell colWidth="220px">
                  <TeamCell onClick={() => handleSort('team.name')} style={{ cursor: 'pointer' }}>
                    Team
                  </TeamCell>
                </StyledTableTeamCell>
                <StyledTableCell colWidth="30px" onClick={() => handleSort('filteredData.played')}>
                  P
                </StyledTableCell>
                <StyledTableCell colWidth="30px" onClick={() => handleSort('filteredData.win')}>
                  W
                </StyledTableCell>
                <StyledTableCell colWidth="30px" onClick={() => handleSort('filteredData.draw')}>
                  D
                </StyledTableCell>
                <StyledTableCell colWidth="30px" onClick={() => handleSort('filteredData.lose')}>
                  L
                </StyledTableCell>
                <StyledTableCell colWidth="50px" onClick={() => handleSort('filteredData.goals.for')}>
                  G
                </StyledTableCell>
                <StyledTableCell colWidth="50px" onClick={() => handleSort('points')}>
                  Pts
                </StyledTableCell>
                <StyledTableCell colWidth="140px" onClick={() => handleSort('formPoints')}>
                  Form
                </StyledTableCell>
              </StyledTableRow>



            </thead>
            <tbody>
              {sortedTeams(teams).map((team, index) => (
                <StyledTableRow key={team.team.id}>
                  <StyledTableCell colWidth="30px">
                    <RankSquare color={descriptionColors[team.description]}>
                      {index + 1}
                    </RankSquare>
                  </StyledTableCell>
                  <StyledTableTeamCell colWidth="220px">
                    <TeamCell onClick={() => handleTeamClick(team.team.id)} style={{ cursor: 'pointer' }}>
                      <TeamLogo src={team.team.logo} alt={team.team.name} />
                      {team.team.name}
                    </TeamCell>
                  </StyledTableTeamCell>
                  <StyledTableCell colWidth="40px">{team.filteredData.played}</StyledTableCell>
                  <StyledTableCell colWidth="40px">{team.filteredData.win}</StyledTableCell>
                  <StyledTableCell colWidth="40px">{team.filteredData.draw}</StyledTableCell>
                  <StyledTableCell colWidth="40px">{team.filteredData.lose}</StyledTableCell>
                  <StyledTableCell colWidth="60px">
                    {team.filteredData.goals.for}:{team.filteredData.goals.against}
                  </StyledTableCell>
                  <StyledTableCell colWidth="50px">{team.points}</StyledTableCell>
                  <StyledTableCell colWidth="140px">
                    <FormContainer>
                      {calculateForm(team.team.name, team.filteredData.played).map((formItem, idx) => (
                        <FormItem
                          key={idx}
                          color={formItem.color}
                          title={formItem.tooltip}
                          onClick={() => handleIndicatorClick(formItem.matchId)}
                        >
                          {formItem.result}
                        </FormItem>
                      ))}
                    </FormContainer>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </tbody>
          </StyledTableContainer>
        </GroupSpacing>
      ))}
      {renderLegend()}
    </StyledStandingWrapper>
  );
};

export default Standings;



export const StyledStandingWrapper = styled.div`
  padding: 10px;
  width:660px;
  background-color: #1c1e24;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const StyledTableRow = styled.tr`
  cursor: pointer;
  
  border-bottom: 1px solid #3a3d42;
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

export const StyledFilterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
`;

export const StyledFilterButton = styled(BaseButton)`
  background: ${({ $isActive }) => ($isActive ? 'rgb(45, 50, 52)' : 'rgba(68, 76, 78, 0.7)')};
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#d0d4d6')};
  border: ${({ $isActive }) => ($isActive ? '2px solid rgb(35, 40, 42)' : '1px solid rgba(68, 76, 78, 0.5)')};
  border-radius: 6px;
  width: 90px;
  height: 26px;
  padding: 6px 14px;
 font-weight: 600;
  font-size: 0.7rem;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.2s ease;
  box-shadow: ${({ $isActive }) => ($isActive ? '0 4px 8px rgba(35, 40, 42, 0.5)' : 'none')};

  &:hover {
    background: ${({ $isActive }) => ($isActive ? 'rgb(55, 60, 62)' : 'rgba(68, 76, 78, 0.6)')};
    color: #ffffff;
    box-shadow: 0 4px 8px rgba(35, 40, 42, 0.4);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(35, 40, 42, 0.6);
  }
`;

export const StandingTableContainer = styled.table`
  width: max(520px);
  border-collapse: collapse;
  background-color: #1e1e1e;
  color: white;
  display: flex;
  flex-direction: column;
  border: 1px solid #2a2a2a;
`;

export const StandingTableWrapper = styled.div`
  padding: 10px;
  background-color: #1c1e24;
  border-radius: 10px;
  border: 1px solid #2a2a2a;
`;

export const StandingTableRow = styled.tr`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;

  &:nth-child(even) {
    background-color: #2e2e2e;
  }

  &:hover {
    background-color: #34495e;
  }
`;

export const StandingTeamLogoCell = styled.img`
  width: max(25px);
  height: max(25px);
  margin-right: 10px;
  vertical-align: middle;
  object-fit: contain;
`;

export const FilterButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 5px;
  margin-bottom: 5px;
`;

export const FilterButton = styled(BaseButton)`
  background: ${({ active }) => (active ? 'linear-gradient(135deg, #34495e, #2c3e50)' : '#1c1e24')};
  color: ${({ active }) => (active ? '#ecf0f1' : '#7f8c8d')};
  margin: 0 5px;

  &:hover {
    background: linear-gradient(135deg, #16a085, #1abc9c);
    box-shadow: 0 4px 12px rgba(22, 160, 133, 0.4);
    transform: translateY(-2px);
  }

  &:active {
    background: linear-gradient(135deg, #1abc9c, #16a085);
  }
`;

export const GroupTitle = styled.h3`
  font-size: 18px;
  color: #f0f0f0;
  margin: 15px 0;
  padding-bottom: 5px;
  border-bottom: 1px solid #34495e;
`;

export const GroupSpacing = styled.div`
  margin-top: 20px;
`;

const FormContainer = styled.div`
  display: flex;
  gap: 4px; /* Odstęp między wskaźnikami */
  justify-content: center; /* Wyśrodkowanie poziome */
  align-items: center; /* Wyśrodkowanie pionowe */
  height: 100%; /* Dopasowanie do wysokości komórki tabeli */
  min-width: 120px; /* Opcjonalna szerokość minimalna */
  position: relative; /* Dodanie dla kontroli layoutu */
  text-align: center; /* Środkowanie tekstu, jeśli wymagane */
`;

const FormItem = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center; /* Wyśrodkowanie tekstu w pionie */
  justify-content: center; /* Wyśrodkowanie tekstu w poziomie */
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background-color: ${({ color }) => color || 'transparent'};
  cursor: pointer;
  white-space: pre-line;

  &:hover {
    background-color: #34495e;
  }
`;

const LeagueFilterContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
  gap: 12px;
`;

const LeagueButton = styled(BaseButton)`
  background: ${({ $isActive }) => ($isActive ? 'rgba(68, 76, 78, 0.85)' : 'rgba(48, 54, 56, 0.65)')};
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#b0b4b8')};
  border: ${({ $isActive }) => ($isActive ? '2px solid rgb(35, 40, 42)' : '1px solid rgba(68, 76, 78, 0.5)')};
  border-radius: 5px;
  padding: 6px 12px;
  font-weight: 700;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.2s ease;

  &:hover {
    background: ${({ $isActive }) => ($isActive ? 'rgb(85, 94, 97)' : 'rgb(58, 63, 65)')};
    color: #ffffff;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(85, 94, 97, 0.6);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const StyledTableContainer = styled.table`
  width: 100%;
  table-layout: fixed; /* Stała szerokość kolumn */
  border-collapse: collapse;
  background-color: rgba(28, 30, 36, 0.85);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const StyledTableCell = styled.td`
  padding: 5px;
  text-align: center;
  vertical-align: middle; /* Wyśrodkowanie zawartości w pionie */
  font-size: 12px;
  color: #ffffff;
  width: ${({ colWidth }) => colWidth || 'auto'}; /* Ustaw szerokość kolumny */
  white-space: nowrap; /* Zapobiega zawijaniu tekstu */
  overflow: hidden; /* Ukrycie nadmiaru */
  text-overflow: ellipsis; /* Dodanie "..." w przypadku nadmiaru */
`;

export const StyledTableTeamCell = styled.td`

  text-align: center;
  vertical-align: middle; /* Wyśrodkowanie zawartości w pionie */
  font-size: 12px;
  color: #ffffff;
  width: ${({ colWidth }) => colWidth || 'auto'}; /* Ustaw szerokość kolumny */
  white-space: nowrap; /* Zapobiega zawijaniu tekstu */
  overflow: hidden; /* Ukrycie nadmiaru */
  text-overflow: ellipsis; /* Dodanie "..." w przypadku nadmiaru */
`;

export const TeamCell = styled.td`
  display: flex;
  align-items: center;
  padding: 5px;
  font-size: 12px;
  color: #ffffff;
    width: 220px;
`;

const RankSquare = styled.div`
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color || "#2c3e50"};
  color: white;
  border-radius: 4px;
  font-size: 12px;
`;

const TeamLogo = styled.img`
  width: 22px;
  height: 22px;
  margin-right: 8px;
  object-fit: contain;
  border-radius: 50%;
`;

const Legend = styled.div`
  margin-top: 20px;
`;

const LegendTitle = styled.h4`
  color: #ffffff;
  margin-bottom: 10px;
  font-size: 14px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  color: #ffffff;
    font-size: 12px;
`;

const LegendColor = styled.div`
  width: 15px;
  height: 15px;
  margin-right: 10px;
  background-color: ${({ color }) => color};
  border-radius: 3px;
`;