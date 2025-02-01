import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import LazyPlayerImage from '../players/LazyPlayerImage';
import {
    TopScorersContainer,
    FilterContainer,
    FilterSelect,
    PlayerCard,
    PlayerInfo,
    PlayerDetails,
    ClubLogo,
    PlayerStatsGrid,
    StatsColumn,
    StatsRow,
} from '../../styles/league/TopScorersStyles';

const TopScorers = ({ topScorers = [], isBettingSlipOpen }) => {
    const [selectedClub, setSelectedClub] = useState('');
    const [selectedNationality, setSelectedNationality] = useState('');
    const [selectedPosition, setSelectedPosition] = useState('');

    const sanitizedTopScorers = useMemo(() => {
        return topScorers.map((player) => ({
            ...player,
            shotsOnTarget: player.shotsOnTarget ?? 0,
            totalShots: player.totalShots ?? 0,
            penaltiesScored: player.penaltiesScored ?? 0,
            penaltiesMissed: player.penaltiesMissed ?? 0,
            duelsTotal: player.duelsTotal ?? 0,
            duelsWon: player.duelsWon ?? 0,
            goals: player.goals ?? 0,
            assists: player.assists ?? 0,
            appearances: player.appearances ?? 0,
            minutesPlayed: player.minutesPlayed ?? 0,
            keyPasses: player.keyPasses ?? 0,
        }));
    }, [topScorers]);

    const clubs = useMemo(() => [...new Set(sanitizedTopScorers.map((player) => player.clubName))], [sanitizedTopScorers]);
    const nationalities = useMemo(() => [...new Set(sanitizedTopScorers.map((player) => player.nationality))], [sanitizedTopScorers]);
    const positions = useMemo(() => [...new Set(sanitizedTopScorers.map((player) => player.position))], [sanitizedTopScorers]);

    const filteredScorers = useMemo(() => {
        return sanitizedTopScorers.filter((player) =>
            (!selectedClub || player.clubName === selectedClub) &&
            (!selectedNationality || player.nationality === selectedNationality) &&
            (!selectedPosition || player.position === selectedPosition)
        );
    }, [sanitizedTopScorers, selectedClub, selectedNationality, selectedPosition]);

    const handlePlayerClick = (playerId) => {
        window.location.href = `/player/${playerId}`;
    };

    if (!Array.isArray(topScorers) || topScorers.length === 0) {
        return <p>No top scorers available.</p>;
    }

    return (
        <TopScorersContainer $isBettingSlipOpen={isBettingSlipOpen}>
            <FilterContainer>
                <FilterSelect value={selectedClub} onChange={(e) => setSelectedClub(e.target.value)}>
                    <option value="">Club</option>
                    {clubs.map((club) => (
                        <option key={club} value={club}>
                            {club}
                        </option>
                    ))}
                </FilterSelect>
                <FilterSelect value={selectedNationality} onChange={(e) => setSelectedNationality(e.target.value)}>
                    <option value="">Nationality</option>
                    {nationalities.map((nat) => (
                        <option key={nat} value={nat}>
                            {nat}
                        </option>
                    ))}
                </FilterSelect>
                <FilterSelect value={selectedPosition} onChange={(e) => setSelectedPosition(e.target.value)}>
                    <option value="">Position</option>
                    {positions.map((pos) => (
                        <option key={pos} value={pos}>
                            {pos}
                        </option>
                    ))}
                </FilterSelect>
            </FilterContainer>
            {filteredScorers.map((player) => (
                <PlayerCard key={player.playerId} onClick={() => handlePlayerClick(player.playerId)}>
                    <PlayerInfo>
                        <LazyPlayerImage playerId={player.playerId} photoUrl={player.photo} alt={player.name} />
                        <PlayerDetails>
                            <span><strong>{player.name}</strong></span>
                            <span>
                                <ClubLogo src={player.clubLogo} alt={player.clubName} />
                                {player.clubName}
                            </span>
                            <span>{player.nationality}</span>
                        </PlayerDetails>
                    </PlayerInfo>
                    <PlayerStatsGrid>
                        <StatsColumn>
                            <StatsRow>Games: {player.appearances}</StatsRow>
                            <StatsRow>Goals: {player.goals}</StatsRow>
                            <StatsRow>Assists: {player.assists}</StatsRow>
                            <StatsRow>Penalties Scored: {player.penaltiesScored}</StatsRow>
                            <StatsRow>Penalties Missed: {player.penaltiesMissed}</StatsRow>
                        </StatsColumn>
                        <StatsColumn>
                            <StatsRow>Shots: {player.totalShots}</StatsRow>
                            <StatsRow>On Target: {player.shotsOnTarget}</StatsRow>
                            <StatsRow>Shot acc.: {player.totalShots > 0 ? ((player.shotsOnTarget / player.totalShots) * 100).toFixed(2) : '0.00'}%</StatsRow>
                            <StatsRow>Duels: {player.duelsWon} / {player.duelsTotal} ({player.duelsTotal > 0 ? ((player.duelsWon / player.duelsTotal) * 100).toFixed(2) : '0.00'}%)</StatsRow>
                            <StatsRow>Key Passes: {player.keyPasses}</StatsRow>
                        </StatsColumn>
                    </PlayerStatsGrid>
                </PlayerCard>
            ))}
        </TopScorersContainer>
    );
};

TopScorers.propTypes = {
    topScorers: PropTypes.arrayOf(
        PropTypes.shape({
            playerId: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            nationality: PropTypes.string.isRequired,
            photo: PropTypes.string.isRequired,
            clubName: PropTypes.string.isRequired,
            clubLogo: PropTypes.string.isRequired,
            position: PropTypes.string.isRequired,
            appearances: PropTypes.number,
            goals: PropTypes.number,
            assists: PropTypes.number,
            shotsOnTarget: PropTypes.number,
            totalShots: PropTypes.number,
            penaltiesScored: PropTypes.number,
            penaltiesMissed: PropTypes.number,
            keyPasses: PropTypes.number,
            duelsTotal: PropTypes.number,
            duelsWon: PropTypes.number,
        })
    ).isRequired,
    isBettingSlipOpen: PropTypes.bool,
};

export default TopScorers;
