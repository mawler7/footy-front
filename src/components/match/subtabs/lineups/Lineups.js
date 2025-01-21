import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    PitchWrapper,
    PitchContainer,
    SectionHeader,
    TeamContainer,
    CoachContainer,
    CoachName,
    PlayerList,
    PlayerListItem,
    SubstitutesEventIconWrapper,
} from '../../../../styles/match/LineupsStyles';
import { usePlayerPhotos } from '../../../../hooks/match/lineups/usePlayerPhotos';
import { usePitchDimensions } from '../../../../hooks/match/lineups/usePitchDimensions';
import FormationRenderer from './FormationRenderer';
import { getEventIcon } from '../../../../utils/iconUtils';

const Lineups = ({ lineups = [], events = [], players = [], isBettingSlipOpen }) => {
    const [isVertical, setIsVertical] = useState(window.innerWidth < 480);
    const pitchRef = useRef(null);
    const navigate = useNavigate();
    const { pitchDimensions, updatePitchDimensions } = usePitchDimensions();
    const playerPhotos = usePlayerPhotos(players);

    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    const handlePlayerClick = (playerId) => navigate(`/player/${playerId}`);

    const getPlayersWithEvents = (lineupPlayers, teamId) => {
        const uniquePlayers = new Set();
        return lineupPlayers
            .map((lineupPlayer) => {
                if (!lineupPlayer || uniquePlayers.has(lineupPlayer.id)) return null;
                uniquePlayers.add(lineupPlayer.id);

                const playerEvents = events.filter((event) => {
                    const isSameTeam = event.team?.id === teamId;
                    const matchesById = event.player?.id === lineupPlayer.id || event.assist?.id === lineupPlayer.id;
                    const matchesByName = event.player?.name?.toLowerCase() === lineupPlayer.name?.toLowerCase();
                    return isSameTeam && (matchesById || matchesByName);
                });
                return { ...lineupPlayer, events: playerEvents };
            })
            .filter(Boolean);
    };

    useEffect(() => {
        const handleResize = () => {
            updatePitchDimensions(pitchRef.current);
            setIsVertical(window.innerWidth < 480);
        };

        const debouncedResize = debounce(handleResize, 100);

        window.addEventListener('resize', debouncedResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', debouncedResize);
        };
    }, [updatePitchDimensions]);

    useLayoutEffect(() => {
        updatePitchDimensions(pitchRef.current);
    }, [isBettingSlipOpen, updatePitchDimensions]);

    if (!lineups) {
        console.error('No lineups available');
        return <div>No lineups available</div>;
    }

    return (
        <>
            <SectionHeader>Starting XI</SectionHeader>

            <PitchWrapper $isBettingSlipOpen={isBettingSlipOpen}>
                <PitchContainer ref={pitchRef} $isVertical={isVertical}>
                    {lineups.map((team) => {
                        const playersWithEvents = getPlayersWithEvents(
                            team.startXI.map((p) => p.player),
                            team.team.id
                        );

                        return (
                            <FormationRenderer
                                key={`formation-${team.team.id}-${team.formation}`}
                                team={team}
                                playersWithEvents={playersWithEvents}
                                playerPhotos={playerPhotos}
                                pitchDimensions={pitchDimensions}
                                isHome={team.team.id === lineups[0]?.team?.id}
                                isAway={team.team.id !== lineups[0]?.team?.id}
                                $isVertical={isVertical}
                                onPlayerClick={handlePlayerClick}
                                players={players}
                                $isBettingSlipOpen={isBettingSlipOpen}
                            />
                        );
                    })}
                </PitchContainer>
            </PitchWrapper>

            <SectionHeader>Substitutes</SectionHeader>
            <TeamContainer>
                <CoachContainer isHome={true}>
                    <CoachName>{lineups[0]?.formation}</CoachName>
                </CoachContainer>
                <CoachContainer isHome={false}>
                    <CoachName>{lineups[1]?.formation}</CoachName>
                </CoachContainer>
                {lineups.map((team) => (
                    <div key={team.team.id}>
                        <PlayerList>
                            {team.substitutes.map((sub) => {
                                const playerEvents = events.filter(
                                    (event) =>
                                        event.player?.id === sub.player.id ||
                                        event.assist?.id === sub.player.id
                                );

                                return (
                                    <PlayerListItem
                                        key={sub.player.id}
                                        isHome={team.team.id === lineups[0]?.team?.id}
                                        onClick={() => handlePlayerClick(sub.player.id)}
                                    >
                                        {team.team.id === lineups[0]?.team?.id ? (
                                            <>
                                                <span>{sub.player.number}</span> {sub.player.name}
                                                {playerEvents.length > 0 && (
                                                    <SubstitutesEventIconWrapper>
                                                        {playerEvents.map((event, index) => (
                                                            <div
                                                                key={`${sub.player.id}-${event.type}-${index}`}
                                                                style={{ marginLeft: 5 }}
                                                            >
                                                                {getEventIcon(event)}
                                                            </div>
                                                        ))}
                                                    </SubstitutesEventIconWrapper>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                {playerEvents.length > 0 && (
                                                    <SubstitutesEventIconWrapper>
                                                        {playerEvents.map((event, index) => (
                                                            <div
                                                                key={`${sub.player.id}-${event.type}-${index}`}
                                                                style={{ marginRight: 5 }}
                                                            >
                                                                {getEventIcon(event)}
                                                            </div>
                                                        ))}
                                                    </SubstitutesEventIconWrapper>
                                                )}
                                                {sub.player.name} <span>{sub.player.number}</span>
                                            </>
                                        )}
                                    </PlayerListItem>
                                );
                            })}
                        </PlayerList>

                        <CoachContainer>
                            <CoachName>{team.coach?.name || 'Unknown Coach'}</CoachName>
                        </CoachContainer>
                    </div>
                ))}

            </TeamContainer>
        </>
    );
};

export default Lineups;
