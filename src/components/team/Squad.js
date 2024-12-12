import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaFutbol, FaClock, FaHandsHelping } from 'react-icons/fa';
import styled from 'styled-components';
import BaseButton from './../common/BaseButton'
import LazyPlayerImage from '../players/LazyPlayerImage';


const YellowCardIcon = () => (
    <svg width="12" height="15" viewBox="0 0 20 20" fill="yellow">
        <rect width="16" height="20" rx="2" ry="2" />
    </svg>
);

const RedCardIcon = () => (
    <svg width="12" height="15" viewBox="0 0 20 20" fill="red">
        <rect width="16" height="20" rx="2" ry="2" />
    </svg>
);

const Squad = ({ id }) => {
    const [squad, setSquad] = useState([]);
    const [activeLeague, setActiveLeague] = useState(null);
    const [activeTab, setActiveTab] = useState('match');
    const [activeSubTab, setActiveSubTab] = useState('predictions');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    useEffect(() => {
        if (!id) {
            console.error('Team ID is undefined');
            return;
        }

        const fetchSquad = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/team/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                const filteredSquad = response.data.filter(league =>
                    league.league.leagueName !== 'Friendlies' && league.players.length > 0
                );
                setSquad(filteredSquad);
                if (filteredSquad.length > 0) {
                    setActiveLeague(filteredSquad[0].league.id);
                }
            } catch (error) {
                console.error('Error fetching squad data:', error);
            }
        };

        fetchSquad();
    }, [id]);

    const handleLeagueClick = (leagueId) => {
        setActiveLeague(leagueId);
    };

    const handlePlayerClick = (playerId) => {
        window.location.href = `/player/${playerId}`;
    };



    const calculateAge = (birthDate) => {
        if (!birthDate) return '-';
        const birthYear = new Date(birthDate).getFullYear();
        const currentYear = new Date().getFullYear();
        return currentYear - birthYear;
    };

    const getPlayerStatistics = (player) => {
        const stats = player?.statistics[0] || {};
        const info = player?.player || {};

        return {
            position: stats.position || 'Unknown',
            rating: stats.games?.rating ? Number(stats.games?.rating).toFixed(2) : '-',
            appearances: stats.games?.appearences ?? 0,
            minutes: stats.games?.minutes ?? 0,
            goals: stats.goals?.total ?? 0,
            yellowCards: stats.cards?.yellow ?? 0,
            redCards: stats.cards?.red ?? 0,
            assists: stats.goals?.assists ?? 0,
            age: calculateAge(info.birth?.date),
            photo: info.photo || '/path/to/default-photo.jpg'
        };
    };

    const groupByPosition = (players) => {
        if (!players || players.length === 0) return {};
        return {
            Goalkeepers: players.filter(p => p.statistics[0]?.games.position === 'Goalkeeper'),
            Defenders: players.filter(p => p.statistics[0]?.games.position === 'Defender'),
            Midfielders: players.filter(p => p.statistics[0]?.games.position === 'Midfielder'),
            Forwards: players.filter(p => p.statistics[0]?.games.position === 'Attacker'),
        };
    };

    const activeLeagueData = squad.find((league) => league.league.id === activeLeague);

    if (!activeLeagueData) {
        return null;
    }

    const groupedPlayers = groupByPosition(activeLeagueData.players);

    const handleSort = (key) => {
        setSortConfig((prevState) => ({
            key,
            direction: prevState.key === key && prevState.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    const sortedPlayers = (players) => {
        if (!sortConfig.key) return players;

        return [...players].sort((a, b) => {
            const getValue = (player, key) => {
                const stats = getPlayerStatistics(player);
                return stats[key] ?? '';
            };

            const valueA = getValue(a, sortConfig.key);
            const valueB = getValue(b, sortConfig.key);

            if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
            if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    };

    return (
        <SquadContainer>
            <LeagueFilterContainer>
                {squad.map((league) => (
                    <LeagueButton
                        key={league.league.id}
                        active={activeLeague === league.league.id} // Sprawdź, czy warunek jest poprawny
                        onClick={() => handleLeagueClick(league.league.id)}
                    >
                        {league.league.leagueName}
                    </LeagueButton>
                ))}
            </LeagueFilterContainer>

            <StyledTable>
                {Object.keys(groupedPlayers).map((positionGroup, index) => (
                    <React.Fragment key={positionGroup}>
                        {index > 0 && <GroupSeparator />}
                        <TableHeader>
                            <HeaderCell>{positionGroup}</HeaderCell>
                            <StyledTableStandingsHeaderCell onClick={() => handleSort('age')}>Age</StyledTableStandingsHeaderCell>
                            <StyledTableStandingsHeaderCell onClick={() => handleSort('rating')}><FaStar /></StyledTableStandingsHeaderCell>
                            <StyledTableStandingsHeaderCell onClick={() => handleSort('appearances')}><FaFutbol /></StyledTableStandingsHeaderCell>
                            <StyledTableStandingsHeaderCell onClick={() => handleSort('minutes')}><FaClock /></StyledTableStandingsHeaderCell>
                            <StyledTableStandingsHeaderCell onClick={() => handleSort('goals')}><FaFutbol style={{ color: 'green' }} /></StyledTableStandingsHeaderCell>
                            <StyledTableStandingsHeaderCell onClick={() => handleSort('assists')}><FaHandsHelping /></StyledTableStandingsHeaderCell>
                            <StyledTableStandingsHeaderCell onClick={() => handleSort('yellowCards')}><YellowCardIcon /></StyledTableStandingsHeaderCell>
                            <StyledTableStandingsHeaderCell onClick={() => handleSort('redCards')}><RedCardIcon /></StyledTableStandingsHeaderCell>
                        </TableHeader>

                        {sortedPlayers(groupedPlayers[positionGroup]).map((playerData) => {
                            const playerStats = getPlayerStatistics(playerData);
                            return (
                                <TableRow key={playerData.player.id} onClick={() => handlePlayerClick(playerData.player.id)}>
                                    <TableCellPlayer>
                                        <PlayerInfo>
                                            <LazyPlayerImage
                                                playerId={playerData.player.id}
                                                photoUrl={playerStats.photo}
                                                alt={playerData.player.name}
                                            />
                                            <PlayerName>{playerData.player.name}</PlayerName>
                                        </PlayerInfo>
                                    </TableCellPlayer>
                                    <StyledTableCell>{playerStats.age}</StyledTableCell>
                                    <StyledTableCell>{playerStats.rating}</StyledTableCell>
                                    <StyledTableCell>{playerStats.appearances}</StyledTableCell>
                                    <StyledTableCell>{playerStats.minutes}</StyledTableCell>
                                    <StyledTableCell>{playerStats.goals}</StyledTableCell>
                                    <StyledTableCell>{playerStats.assists}</StyledTableCell>
                                    <StyledTableCell>{playerStats.yellowCards}</StyledTableCell>
                                    <StyledTableCell>{playerStats.redCards}</StyledTableCell>
                                </TableRow>
                            );
                        })}
                    </React.Fragment>
                ))}
            </StyledTable>
        </SquadContainer>
    );
};

export default Squad;

const StyledTableCell = styled.td`
  padding: 5px;
  text-align: center;
  font-size: 12px;
  color: #ffffff;
  min-width: ${({ minWidth }) => minWidth || 'auto'};
  max-width: ${({ maxWidth }) => maxWidth || 'auto'};
`;




const SquadContainer = styled.div`
    width: 100%;
  max-width: 720px;
    background-color: #1e1f24;
    border-radius: 12px;
    padding: 5px;
    margin: auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
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

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    background-color: #282b30;
    color: #fff;
    border-radius: 8px;
    overflow: hidden;
`;

const TableHeader = styled.tr`
    background-color: #3a3d42;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    height: 35px;
`;

const TableRow = styled.tr`
      cursor: pointer;
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

const TableCellPlayer = styled.td`
    display: flex;
    align-items: center;
    padding: 8px;
    text-align: left;
    font-size: 12px;
    color: #e0e0e0;

`;

const PlayerPhoto = styled.img`
    width: 28px;
    height: 28px;
    border-radius: 50%;
    margin-right: 10px;
`;

const PlayerName = styled.span`
margin-left:10px;
    font-size: 12px;
    color: #ffffff;
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const HeaderCell = styled.th`
    padding: 8px;
    text-align: center;
    font-size: 13px;
    background-color: #3a3d42;
    color: #ffffff;
    width:250px;
`;

const StyledTableStandingsHeaderCell = styled.th`
    padding: 8px;
    text-align: center;
    font-size: 12px;
    color: #ffffff;
    background-color: #3a3d42;
`;

const GroupSeparator = styled.tr`
    height: 15px;  
`;

const PlayerInfo = styled.div`
    display: flex;
    align-items: center;
`;