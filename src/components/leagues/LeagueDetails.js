import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import LeagueHeader from './LeagueHeader';
import Results from './Results';
import Matches from './Matches';
import BaseButton from '../common/BaseButton';

import Standings from '../common/standings/Standings';
import { LoadingMessage } from '../../styles/GlobalStyles';

const CACHE_EXPIRY = 30 * 60 * 1000;

const LeagueDetails = () => {
  const { leagueId } = useParams();
  const [standings, setStandings] = useState([]);
  const [leagueInfo, setLeagueInfo] = useState(null);
  const [filterType, setFilterType] = useState('total');
  const [activeTab, setActiveTab] = useState('table');
  const [completedMatches, setCompletedMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filteredStandings, setFilteredStandings] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  useEffect(() => {
    const fetchLeagueData = async () => {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      const cachedData = JSON.parse(localStorage.getItem(`leagueData_${leagueId}`));
      const now = Date.now();

      if (cachedData && now - cachedData.timestamp < CACHE_EXPIRY) {
        const { leagueInfo, completed, upcoming } = cachedData;
        setLeagueInfo(leagueInfo);
        setCompletedMatches(completed);
        setUpcomingMatches(upcoming);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/leagues/${leagueId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { fixtures } = response.data;

        const completed = fixtures.filter(({ status }) => ['FT', 'AET', 'PEN'].includes(status));
        const upcoming = fixtures.filter(({ status }) => ['NS', 'TBD'].includes(status));

        const leagueData = {
          leagueInfo: response.data,
          completed,
          upcoming,
          timestamp: now,
        };

        localStorage.setItem(`leagueData_${leagueId}`, JSON.stringify(leagueData));
        setLeagueInfo(response.data);
        setCompletedMatches(completed);
        setUpcomingMatches(upcoming);
      } catch (error) {
        console.error('Error fetching league data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagueData();
  }, [leagueId]);

  useEffect(() => {
    if (standings.length > 0) {
      const updatedStandings = standings.map(team => {
        const filteredData = filterType === 'home' ? team.home
          : filterType === 'away' ? team.away : team.all;

        const form = calculateForm(team.team.name, filteredData.played);

        return {
          ...team,
          filteredData,
          points: (filteredData.win * 3) + filteredData.draw,
          backgroundColor: getBackgroundColorForDescription(team.description),
          form,
        };
      });

      setFilteredStandings(updatedStandings);
    }
  }, [standings, filterType, leagueInfo]);

  const calculateForm = (teamName, played) => {
    if (!leagueInfo?.fixtures) return [];

    const teamMatches = leagueInfo.fixtures
      .filter(match => {
        if (filterType === 'home') return match.homeTeamName === teamName;
        if (filterType === 'away') return match.awayTeamName === teamName;
        return match.homeTeamName === teamName || match.awayTeamName === teamName;
      })
      .filter(match => match.fullTimeHome !== null && match.fullTimeAway !== null) // Uwzględnij tylko zakończone mecze
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const pastMatches = teamMatches
      .filter(match => new Date(match.date) < Date.now())
      .slice(-played)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    const form = pastMatches.map(match => {
      const isHome = match.homeTeamName === teamName;
      const teamGoals = isHome ? match.fullTimeHome : match.fullTimeAway;
      const opponentGoals = isHome ? match.fullTimeAway : match.fullTimeHome;
      const result = teamGoals > opponentGoals ? 'W' : teamGoals === opponentGoals ? 'D' : 'L';

      return {
        result,
        color: result === 'W' ? '#27ae60' : result === 'D' ? '#f39c12' : '#e74c3c',
        tooltip: `${teamName} ${teamGoals}-${opponentGoals} vs ${isHome ? match.awayTeamName : match.homeTeamName}`,
        matchId: match.id,
      };
    });

    return form.slice(0, 6);
  };


  const getBackgroundColorForDescription = (description) => {
    if (/Champions League/.test(description)) return '#3498db';
    if (/Europa League/.test(description)) return '#e67e22';
    if (/Conference League/.test(description)) return '#9b59b6';
    if (/Relegation/.test(description)) return '#e74c3c';
    return null;
  };



  if (!leagueInfo) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'table':
        return (
          <Standings
            leagueId={leagueId}
            singleLeagueMode={true}
          />
        );
      case 'results':
        return <Results matches={completedMatches} />;
      case 'matches':
        return <Matches matches={upcomingMatches} />;
      default:
        return null;
    }
  };

  if (!leagueInfo || loading) {
    return <LoadingMessage>Loading league data...</LoadingMessage>;
  }

  return (
    <NavContainer>
      <LeagueHeaderWrapper>
        <LeagueHeader
          leagueName={leagueInfo.leagueName}
          logo={leagueInfo.logo}
          season={`${leagueInfo.season}/${leagueInfo.season + 1}`}
        />
      </LeagueHeaderWrapper>
      <TabContainer>
        <TabButton $isActive={activeTab === 'table'} onClick={() => handleTabClick('table')}>
          Table
        </TabButton>
        <TabButton $isActive={activeTab === 'results'} onClick={() => handleTabClick('results')}>
          Results
        </TabButton>
        <TabButton $isActive={activeTab === 'matches'} onClick={() => handleTabClick('matches')}>
          Matches
        </TabButton>
      </TabContainer>
      {renderContent()}
    </NavContainer>
  );
};

export default LeagueDetails;

export const FilterButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 15px;
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




const TabContainer = styled.div`
    display: flex;
    gap: 5px;
    margin-bottom: 5px;
 
    border-bottom: 2px solid #ccc;
    
`;


const LeagueHeaderWrapper = styled.div`
  width: max(520px);
  width: 100%;
  border-radius: 8px;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;


export const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
    background-color: rgba(28, 30, 36, 0.7);
   border-radius: 10px;
  width: 100%;
  max-width: 670px;
  min-width: 168px;
  align-items: flex-start;
    @media (max-width: 768px) {
    margin-top: 0; /* Usuwa margin-top przy mniejszych ekranach */
  }
      padding: 5px;
`;



export const StyledTableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: rgba(28, 30, 36, 0.85);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;




export const TabButton = styled(BaseButton)`
  background: ${({ $isActive }) => ($isActive ? 'rgba(68, 76, 78, 0.85)' : 'rgba(48, 54, 56, 0.65)')};
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#b0b4b8')};
  border: ${({ $isActive }) => ($isActive ? '2px solid rgb(35, 40, 42)' : '1px solid rgba(68, 76, 78, 0.5)')};
  border-radius: 5px;
  width: 80px;
  height: 34px;
  padding: 6px 12px;
  font-weight: 500;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.2s ease;
  box-shadow: ${({ $isActive }) => ($isActive ? '0 3px 6px rgba(35, 40, 42, 0.4)' : 'none')};

  &:hover {
    background: ${({ $isActive }) => ($isActive ? 'rgb(85, 94, 97)' : 'rgb(58, 63, 65)')};
    color: #ffffff;
    box-shadow: ${({ $isActive }) => ($isActive ? '0 4px 8px rgba(85, 94, 97, 0.8)' : '0 3px 6px rgba(68, 76, 78, 0.8)')};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(85, 94, 97, 0.6);
  }

  &:active {
    transform: scale(0.97);
  }
`;

;