import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaFutbol, FaClock, FaHandsHelping } from 'react-icons/fa';
import LazyPlayerImage from '../players/LazyPlayerImage';
import {
    PositionGroupSeparator,
    TableHeaderRow,
    TableHeaderCell,
    LeagueLogoImage,
    PlayerDetailsWrapper,
    PlayerNameText,
    SquadTable,
    StatCell,
    TableStatHeaderCell,
    PlayerInfoCell,
    PlayerRow,
    LeagueFilterWrapper,
    LeagueTooltip,
    SquadWrapper
} from '../../styles/team/SquadStyles';
import { LeagueButton } from '../../styles/buttons/buttons';

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
    const [sortConfig, setSortConfig] = useState({ key: 'minutes', direction: 'desc' });

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
        <SquadWrapper >

            <LeagueFilterWrapper>
                {squad.map((league) => (
                    <LeagueButton
                        key={league.league.id}
                        $isActive={activeLeague === league.league.id}
                        onClick={() => handleLeagueClick(league.league.id)}
                    >
                        <LeagueLogoImage
                            src={league.league.logo}
                            alt={league.league.leagueName}
                        />
                        <LeagueTooltip>{league.league.leagueName}</LeagueTooltip>
                    </LeagueButton>
                ))}
            </LeagueFilterWrapper>

            <SquadTable>
                {Object.keys(groupedPlayers).map((positionGroup, index) => (
                    <React.Fragment key={positionGroup}>
                        {index > 0 && <PositionGroupSeparator />}
                        <TableHeaderRow>
                            <TableHeaderCell>{positionGroup}</TableHeaderCell>
                            <TableStatHeaderCell onClick={() => handleSort('age')}>Age</TableStatHeaderCell >
                            <TableStatHeaderCell onClick={() => handleSort('rating')}><FaStar /></TableStatHeaderCell >
                            <TableStatHeaderCell onClick={() => handleSort('appearances')}><FaFutbol /></TableStatHeaderCell >
                            <TableStatHeaderCell onClick={() => handleSort('minutes')}><FaClock /></TableStatHeaderCell >
                            <TableStatHeaderCell onClick={() => handleSort('goals')}><FaFutbol style={{ color: 'green' }} /></TableStatHeaderCell >
                            <TableStatHeaderCell onClick={() => handleSort('assists')}><FaHandsHelping /></TableStatHeaderCell >
                            <TableStatHeaderCell onClick={() => handleSort('yellowCards')}><YellowCardIcon /></TableStatHeaderCell >
                            <TableStatHeaderCell onClick={() => handleSort('redCards')}><RedCardIcon /></TableStatHeaderCell >
                        </TableHeaderRow>
                        {sortedPlayers(groupedPlayers[positionGroup]).map((playerData) => {
                            const playerStats = getPlayerStatistics(playerData);
                            return (
                                <PlayerRow
                                    key={playerData.player.id}
                                    onClick={() => handlePlayerClick(playerData.player.id)}
                                >
                                    <PlayerInfoCell>
                                        <PlayerDetailsWrapper>
                                            <LazyPlayerImage
                                                playerId={playerData.player.id}
                                                photoUrl={playerStats.photo}
                                                alt={playerData.player.name}
                                                style={{
                                                    width: '30px',
                                                    height: '30px',
                                                }}
                                            />
                                            <PlayerNameText>{playerData.player.name}</PlayerNameText>
                                        </PlayerDetailsWrapper>
                                    </PlayerInfoCell>
                                    <StatCell>{playerStats.age}</StatCell>
                                    <StatCell>{playerStats.rating}</StatCell>
                                    <StatCell>{playerStats.appearances}</StatCell>
                                    <StatCell>{playerStats.minutes}</StatCell>
                                    <StatCell>{playerStats.goals}</StatCell>
                                    <StatCell>{playerStats.assists}</StatCell>
                                    <StatCell>{playerStats.yellowCards}</StatCell>
                                    <StatCell>{playerStats.redCards}</StatCell>
                                </PlayerRow>
                            );
                        })}
                    </React.Fragment>
                ))}
            </SquadTable>
        </  SquadWrapper>
    );
};

export default Squad;

