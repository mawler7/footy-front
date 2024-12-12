import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';
import {
  NavContainer,
  TeamLogoDetails,
  TeamName,
  LeagueInfo,

  ButtonGroup,
} from '../../../styles/GlobalStyles';


import Statistics from './statistics/Statistics';
import Lineups from './lineups/Lineups';
import Odds from './odds/Odds';
import Events from './events/Events';
import Standings from '../../common/standings/Standings';
import H2H from './h2h/H2H';
import PredictionDetails from './predictions/PredictionDetails';
import BaseButton from '../../common/BaseButton';


import goalIcon from '../../../icons/goal.jpg';
import missedIcon from '../../../icons/missed.jpg';
import ownGoalIcon from '../../../icons/owngoal.jpg';
import redCardIcon from '../../../icons/red.jpg';
import yellowCardIcon from '../../../icons/yellow.jpg';
import subsIcon from '../../../icons/subs.jpg';
import varIcon from '../../../icons/var.jpg';

const FixtureDetails = ({ setShowBubble, bettingSlip, setBettingSlip }) => {
  const { id } = useParams();
  const { isLoggedIn } = useContext(AuthContext);
  const [match, setMatch] = useState(null);
  const [activeTab, setActiveTab] = useState('match');
  const [activeSubTab, setActiveSubTab] = useState('predictions');
  const [h2hData, setH2HData] = useState({ lastHomeMatches: [], lastAwayMatches: [], headToHeadMatches: [] });
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState('null');

  const handleAddToSlip = ({ betName, value, odd, matchInfo }) => {

    const newBet = {
      betName: betName || 'Unknown Bet',
      value: value || 'Unknown Value',
      odd: odd || '0.00',
      matchInfo: matchInfo || 'Unknown Team',
    };

    setBettingSlip((prev) => [...prev, newBet]);
    setShowBubble(true);
  };

  const iconMap = {
    goal: goalIcon,
    ownGoal: ownGoalIcon,
    substitution: subsIcon,
    yellowCard: yellowCardIcon,
    redCard: redCardIcon,
    var: varIcon,
    missed: missedIcon,
  };

  const getPlayerEvents = (events) => {
    const playerEvents = {};

    events.forEach(event => {
      const playerId = event.player?.id;
      if (playerId) {
        if (!playerEvents[playerId]) playerEvents[playerId] = [];

        if (event.type.includes('Goal')) {
          playerEvents[playerId].push(event.detail.includes('Own Goal') ? iconMap.ownGoal : iconMap.goal);
        } else if (event.type === 'Card' && event.detail.includes('Yellow')) {
          playerEvents[playerId].push(iconMap.yellowCard);
        } else if (event.type === 'Card' && event.detail.includes('Red')) {
          playerEvents[playerId].push(iconMap.redCard);
        } else if (event.type === 'subst') {
          playerEvents[playerId].push(iconMap.substitution);
        }
      }
    });

    return playerEvents;
  };

  const playerEvents = getPlayerEvents(match?.events || []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchMatchDetails();
    }
  }, [id, isLoggedIn]);

  useEffect(() => {
    const savedTab = localStorage.getItem('activeTab');
    const savedSubTab = localStorage.getItem('activeSubTab');

    if (savedTab) {
      setActiveTab(savedTab);
    } else {
      setActiveTab('match');
    }
    if (savedSubTab) {
      setActiveSubTab(savedSubTab);
    } else {
      setActiveSubTab('match');
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'standings' && filterType === null) {
      setFilterType('total');
    }
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
    localStorage.setItem('activeSubTab', activeSubTab);
  }, [activeTab, activeSubTab]);

  const fetchMatchDetails = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`http://localhost:8080/fixture/id/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      setMatch(response.data);
    } catch (error) {
      console.error('Error fetching match details:', error);
    }
  };

  useEffect(() => {
    const fetchH2HData = async () => {
      if (activeTab === 'h2h' && match) {
        try {
          const response = await axios.get(`http://localhost:8080/fixture/h2h/${match.homeTeamId}/${match.awayTeamId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
            withCredentials: true
          });
          setH2HData(response.data);
        } catch (error) {
          console.error('Error fetching H2H data:', error);
        }
      }
    };
    fetchH2HData();
  }, [activeTab, match]);

  useEffect(() => {
    if (match) {
      if (match.status === 'FT') {
        setActiveSubTab('events');
      } else if (match.status === 'NS') {
        setActiveSubTab(match.lineups && match.lineups.length > 0 ? 'lineups' : 'predictions');
      }
    }
  }, [match]);

  if (!match) {
    return;
  }

  const handleTabClick = (tab) => setActiveTab(tab);
  const handleSubTabClick = (subTab) => setActiveSubTab(subTab);

  const sortEventsByTime = (events) => {
    return events.sort((a, b) => {
      const timeA = a.time.elapsed + (a.time.extra ? a.time.extra / 100 : 0);
      const timeB = b.time.elapsed + (b.time.extra ? b.time.extra / 100 : 0);
      return timeA - timeB;
    });
  };

  const filteredEvents = {
    firstHalf: sortEventsByTime(match.events.filter(event => event.time.elapsed <= 45)),
    secondHalf: sortEventsByTime(match.events.filter(event => event.time.elapsed > 45 && event.time.elapsed <= 90)),
    extraTime: sortEventsByTime(match.events.filter(event => event.time.elapsed > 90)),
    penalties: sortEventsByTime(match.events.filter(event => event.type === 'Penalty'))
  };

  const handleTeamClick = (teamId) => {
    navigate(`/team/${teamId}`);
  };

  const handleLeagueClick = (leagueId) => {
    navigate(`/league/${leagueId}`);
  };

  const localDate = new Date(match.date * 1000);

  const playerPhotos = match.players.reduce((map, playerData) => {
    const { id, photo } = playerData.player;
    map[id] = photo || 'default-icon-url.jpg';
    return map;
  }, {});


  return (
    <NavContainer>
      <VideoBackground autoPlay loop muted playsInline>
        <source src={require('../../../icons/mp5.mp4')} type="video/mp4" />
      </VideoBackground>


      <FixtureDetailsMainContent>
        <LeagueInfo onClick={() => handleLeagueClick(match.leagueId)}>

          <LeagueFlag src={match.leagueLogo} alt="League Flag" />
          <span>{match.leagueName}</span> - <span>{match.round}</span>
        </LeagueInfo>

        <MatchHeader>
          <FixtureDetailsTeamSection>
            <TeamLogoDetails onClick={() => handleTeamClick(match.homeTeamId)} src={match.homeTeamLogo} alt={match.homeTeamName} />
            <TeamName>{match.homeTeamName}</TeamName>
          </FixtureDetailsTeamSection>
          <ScoreSection>
            <MatchDate>
              {localDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              <MatchTime>{localDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</MatchTime>
            </MatchDate>

            <MatchResult>{match.home ?? '-'} : {match.away ?? '-'}</MatchResult>
            <MatchStatus>
              {match.status !== 'NS' && (match.status === '1H' || match.status === '2H' ? `${match.elapsed} '` : match.status)}
            </MatchStatus>          </ScoreSection>
          <FixtureDetailsTeamSection>
            <TeamLogoDetails onClick={() => handleTeamClick(match.awayTeamId)} src={match.awayTeamLogo} alt={match.awayTeamName} />
            <TeamName>{match.awayTeamName}</TeamName>
          </FixtureDetailsTeamSection>
        </MatchHeader>

        <TabContainer>
          <TabButton active={activeTab === 'match'} onClick={() => handleTabClick('match')}>Match</TabButton>
          <TabButton active={activeTab === 'odds'} onClick={() => handleTabClick('odds')}>Odds</TabButton>
          <TabButton active={activeTab === 'h2h'} onClick={() => handleTabClick('h2h')}>H2H</TabButton>
          <TabButton active={activeTab === 'standings'} onClick={() => handleTabClick('standings')}>Standings</TabButton>
        </TabContainer>

        {activeTab === 'match' && (
          <ButtonGroup>
            <FixtureDetailsButton active={activeSubTab === 'predictions'} onClick={() => handleSubTabClick('predictions')}>Predictions</FixtureDetailsButton>
            <FixtureDetailsButton active={activeSubTab === 'lineups'} onClick={() => handleSubTabClick('lineups')}>Lineups</FixtureDetailsButton>
            <FixtureDetailsButton active={activeSubTab === 'events'} onClick={() => handleSubTabClick('events')}>Events</FixtureDetailsButton>
            <FixtureDetailsButton active={activeSubTab === 'statistics'} onClick={() => handleSubTabClick('statistics')}>Statistics</FixtureDetailsButton>
          </ButtonGroup>
        )}

        {activeTab === 'match' && activeSubTab === 'statistics' && <Statistics
          statistics={match?.statistics || []}
          homeTeamId={match?.homeTeamId}
          awayTeamId={match?.awayTeamId}
        />}

        {activeTab === 'match' && activeSubTab === 'lineups' && (
          <Lineups lineups={match.lineups} playerPhotos={playerPhotos} players={match.players} playerEvents={playerEvents} />
        )}

        {activeTab === 'match' && activeSubTab === 'predictions' && <PredictionDetails prediction={match} />}

        {activeTab === 'odds' && (
          <Odds
            odds={match.bets}
            match={match}
            setShowBubble={setShowBubble}
            matchInfo={`${match.homeTeamName} vs ${match.awayTeamName}`}
            bettingSlip={bettingSlip}
            setBettingSlip={setBettingSlip}
            handleAddToSlip={handleAddToSlip}
          />
        )}


        {activeTab === 'match' && activeSubTab === 'events' && (
          <Events
            firstHalfEvents={filteredEvents.firstHalf}
            secondHalfEvents={filteredEvents.secondHalf}
            extraTimeEvents={filteredEvents.extraTime}
            penalties={filteredEvents.penalties}
            match={match}
          />
        )}

        {activeTab === 'standings' && (
          <Standings
            leagueId={match.leagueId}
            filterType={filterType}
            setFilterType={setFilterType}
          />
        )}

        {activeTab === 'h2h' && (
          <H2H
            homeTeamName={match.homeTeamName}
            awayTeamName={match.awayTeamName}
            lastHomeMatches={h2hData.lastHomeMatches} c
            lastAwayMatches={h2hData.lastAwayMatches}
            headToHeadMatches={h2hData.headToHeadMatches}
          />
        )}

      </FixtureDetailsMainContent>
    </NavContainer >
  );
};

export default FixtureDetails;

const VideoBackground = styled.video`
  position: fixed; /* Ensures the video remains fixed on the screen */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

export const MatchDate = styled.div`
  margin-bottom:20px;
    width: 100px;
`;

export const MatchStatus = styled.div`
  color: var(--color-yellow);
  font-size: 16px;
  text-align: center;
  margin-top: 5px;
`;

export const MatchTime = styled.div`
  text-align:center;
`;

export const MatchResult = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: var(--color-primary);
  text-align: center;
  margin-bottom: 5px;
`;

export const FixtureDetailsTeamSection = styled.div`
  width: 275px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export const LeagueFlag = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
    border-radius: 4px;
`;

const FixtureDetailsMainContent = styled.div`
  display: flex;
  flex-direction: column;
    background-color: rgba(28, 30, 36, 0.7);
   border-radius: 10px;
  width: 100%;
  
  max-width: 670px;
  min-width: 370px;
  align-items: flex-start;
    @media (max-width: 768px) {
      min-width: 370px;
    margin-top: 0; /* Usuwa margin-top przy mniejszych ekranach */
  }
      padding: 5px;
`;

export const MatchHeader = styled.div`
 
  display: flex;
  justify-content: space-between;
  align-items: center;
 
  background-color: var(--color-support-5);
  border-radius: 12px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ScoreSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 100px;  // This ensures the score section has enough space
  text-align: center;
`;



const TabContainer = styled.div`
    display: flex;
    gap: 5px;
    margin-bottom: 5px;

    border-bottom: 2px solid #ccc;
    
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


export const FixtureDetailsButton = styled(BaseButton)`
  background: ${({ $isActive }) => ($isActive ? 'rgb(45, 50, 52)' : 'rgba(68, 76, 78, 0.7)')};
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#d0d4d6')};
  border: ${({ $isActive }) => ($isActive ? '2px solid rgb(35, 40, 42)' : '1px solid rgba(68, 76, 78, 0.5)')};
  border-radius: 6px;
  width: 82px;
  height: 26px;
  padding: 6px 14px;
 font-weight: 600;
  font-size: 0.67rem;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.2s ease;
  box-shadow: ${({ $isActive }) => ($isActive ? '0 4px 8px rgba(35, 40, 42, 0.5)' : 'none')};

  &:hover {
    background: ${({ $isActive }) => ($isActive ? 'rgb(85, 94, 97)' : 'rgb(58, 63, 65)')};
    color: #ffffff;
    box-shadow: ${({ $isActive }) => ($isActive ? '0 4px 8px rgba(85, 94, 97, 0.54)' : '0 3px 6px rgba(68, 76, 78, 0.75)')};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(85, 94, 97, 0.6);
  }

  &:active {
    transform: scale(0.97);
  }
`;


