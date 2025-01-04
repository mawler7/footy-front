import React, { useState, useCallback, useMemo } from 'react';
import { getEventIcon } from '../../utils/iconUtils';
import { useNavigate } from 'react-router-dom';
import {
    PitchWrapper,
    PitchContainer,
    RatingLabel,
    CoachContainer,
    CoachName,
    PlayerList,
    PlayerListItem,
    PlayerListText,
    FormationHeader,
    FormationText,
    PlayerDetailsWrapper,
    SectionHeader,
    TeamContainer,
    TeamSection,
    PlayerIcon,
    EventIconWrapper,
    PlayerText,
    EventIcon,
    PlayerNumber,
} from '../../styles/match/LineupsStyles';

export const getVerticalPosition = (index, totalPlayers, pitchHeight) => {
    return ((index + 1) / (totalPlayers + 1)) * pitchHeight - 35;
};

export const getHorizontalPosition = (lineIndex, totalLines, halfPitchWidth, isAway) => {
    const posX = ((lineIndex + 1) / (totalLines + 1)) * halfPitchWidth;
    return isAway ? halfPitchWidth * 2 - posX - 60 : posX + 10;
};

const getFormattedData = {
    playerRating: (playerId, players) => {
        const playerData = players?.find(player => player.player.id === playerId);
        return playerData?.stats?.[0]?.games?.rating || null;
    },
    formattedName: name => {
        const parts = name.split(' ');
        return parts.length > 1 ? parts.slice(1).join(' ') : name;
    },
};

const Lineups = ({ match }) => {
    const { lineups, players, events } = match || {};

    const playerPhotos = useMemo(() => {
        return players?.reduce((map, playerData) => {
            const { id, photo } = playerData.player;
            map[id] = photo || 'default-icon-url.jpg';
            return map;
        }, {}) || {};
    }, [players]);

    const playerEvents = useMemo(() => {
        const mappedEvents = {};
        events?.forEach(event => {
            const playerId = event.player?.id;
            if (!playerId) return;

            const icon = getEventIcon(event);
            if (!icon) return;

            if (!mappedEvents[playerId]) {
                mappedEvents[playerId] = [];
            }

            mappedEvents[playerId].push({
                type: event.type || 'Unknown',
                detail: event.detail || 'No Detail',
                icon,
            });
        });

        return mappedEvents;
    }, [events]);
    const navigate = useNavigate();
    const [isVertical, setIsVertical] = useState(window.innerWidth < 768);

    const handlePlayerClick = useCallback(
        playerId => navigate(`/player/${playerId}`),
        [navigate]
    );

    const filterValidEvents = (events) => {

        const filtered = events?.filter(event => {
            const icon = getEventIcon(event);
            if (!icon) {
                console.warn('Filtered out event (no icon):', event); // Loguj odrzucone zdarzenia
                return false;
            }
            return true;
        }) || [];

        return filtered;
    };

    const getSafeIconType = (event) => {
        try {
            return getEventIcon(event);
        } catch (error) {
            return null;
        }
    };

    const renderPlayerIcons = (playerId) => {
        const events = playerEvents?.[playerId];

        if (!events || events.length === 0) return null;

        const validEvents = filterValidEvents(events);
        return (
            <EventIconWrapper>
                {validEvents.map((event, index) => {
                    const icon = getSafeIconType(event);
                    if (!icon) {
                        console.warn('Missing icon for event:', event);
                        return null;
                    }

                    const positionStyles = getIconPositionStyles(event.type?.toLowerCase());
                    return (
                        <EventIcon
                            key={`${playerId}-${event.type}-${event.detail}-${index}`}
                            src={icon.props.src}
                            alt={event.type}
                            positionStyles={positionStyles}
                            style={{
                                transform: `translateX(${index * 10}px)`,
                            }}
                        />
                    );
                })}
            </EventIconWrapper>
        );
    };

    const getIconPositionStyles = (eventType) => {
        switch (eventType) {
            case 'goal':
                return { top: '-50px', right: '5px' };
            case 'card':
                return { top: '-50px', left: '5px' };
            case 'substitution':
                return { top: '-20px', left: '10px' };
            default:
                return { top: '-50px', left: '25px' };
        };
    }

    const renderPlayer = (playerData, isHome, posX, posY) => {
        const { player } = playerData;
        const photoUrl = playerPhotos[player.id] || 'default-icon-url.jpg';
        const playerRating = getFormattedData.playerRating(player.id, players);

        return (
            <PlayerIcon
                key={player.id}
                photoUrl={photoUrl}
                style={{
                    top: `${posY}px`,
                    left: `${posX}px`,
                }}
                $isHome={isHome}
                onClick={() => handlePlayerClick(player.id)}
            >
                {renderPlayerIcons(player.id)}

                <PlayerDetailsWrapper>
                    {playerRating && (
                        <RatingLabel rating={parseFloat(playerRating)}>
                            {parseFloat(playerRating).toFixed(1)}
                        </RatingLabel>
                    )}
                    <PlayerText>
                        {`${player.number} ${getFormattedData.formattedName(player.name)}`}
                    </PlayerText>
                </PlayerDetailsWrapper>
            </PlayerIcon>
        );
    };

    const renderFormation = (lineupPlayers, isHome, formation) => {
        if (!lineupPlayers || !formation) return null;

        const lines = formation.split('-').map((_, lineIndex) =>
            lineupPlayers.filter(player => player?.player?.grid?.startsWith(`${lineIndex + 2}`))
        );

        return lines.map((line, lineIndex) =>
            line.map((playerData, playerIndex) => {
                const player = playerData?.player;
                if (!player) return null;

                const posX = getHorizontalPosition(lineIndex, lines.length, 374, !isHome);
                const posY = getVerticalPosition(playerIndex, line.length, 570);

                return renderPlayer(playerData, isHome, posX, posY);
            })
        );
    };

    const renderGoalkeeper = (goalkeeper, isHome) => {
        if (!goalkeeper?.player) return null;

        const posY = isVertical ? 10 : 250;
        const posX = isVertical ? (isHome ? 40 : 590) : isHome ? 15 : 670
        return renderPlayer(goalkeeper, isHome, posX, posY);
    };

    if (!lineups || lineups.length === 0) return null;

    return (
        <>
            <PitchWrapper>
                <FormationHeader>
                    <SectionHeader>Starting XI</SectionHeader>
                </FormationHeader>

                <PitchContainer>
                    {renderGoalkeeper(lineups[0]?.startXI.find(p => p.player.pos === 'G'), true)}
                    {renderFormation(lineups[0]?.startXI, true, lineups[0]?.formation)}
                    {renderGoalkeeper(lineups[1]?.startXI.find(p => p.player.pos === 'G'), false)}
                    {renderFormation(lineups[1]?.startXI, false, lineups[1]?.formation)}
                </PitchContainer>

                <SectionHeader>Substitutes</SectionHeader>

                <FormationHeader>
                    <FormationText align="left">{lineups[0]?.formation}</FormationText>
                    <FormationText align="right">{lineups[1]?.formation}</FormationText>
                </FormationHeader>

                <TeamContainer>
                    <TeamSection isHome={true}>
                        <PlayerList>
                            {lineups[0]?.substitutes.map(playerData => (
                                <PlayerListItem
                                    key={playerData.player.id}
                                    isHome={true}
                                    onClick={() => handlePlayerClick(playerData.player.id)}
                                >
                                    <PlayerNumber>
                                        <PlayerListText>{playerData.player.number}</PlayerListText>
                                    </PlayerNumber>
                                    <PlayerListText>{playerData.player.name}</PlayerListText>
                                </PlayerListItem>
                            ))}
                        </PlayerList>
                    </TeamSection>
                    <TeamSection isHome={false}>

                        <PlayerList>
                            {lineups[0]?.substitutes.map(playerData => (
                                <PlayerListItem
                                    key={playerData.player.id}
                                    isHome={true}
                                    onClick={() => handlePlayerClick(playerData.player.id)}
                                >
                                    <PlayerNumber>
                                        <PlayerListText>{playerData.player.number}</PlayerListText>
                                    </PlayerNumber>
                                    <PlayerListText>{playerData.player.name}</PlayerListText>
                                </PlayerListItem>
                            ))}
                        </PlayerList>
                    </TeamSection>

                    <CoachContainer isHome={true}>
                        <CoachName>{lineups[0]?.coach?.name || 'Unknown Coach'}</CoachName>
                    </CoachContainer>
                    <CoachContainer isHome={false} >
                        <CoachName>{lineups[1]?.coach?.name || 'Unknown Coach'}</CoachName>
                    </CoachContainer>
                </TeamContainer>
            </PitchWrapper>
        </>
    );
};

export default Lineups;
