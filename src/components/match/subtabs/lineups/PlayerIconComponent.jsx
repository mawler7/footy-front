import React, { useMemo } from 'react';
import {
    PlayerIcon,
    PlayerDetailsWrapper,
    RatingLabel,
    PlayerText,
    EventIconWrapper,
} from '../../../../styles/match/LineupsStyles';
import LazyPlayerImage from '../../../players/LazyPlayerImage';
import { getEventIcon } from '../../../../utils/iconUtils';

const PlayerIconComponent = ({
    playerData,
    posX,
    posY,
    onClick,
    playerPhotos,
    playerEvents,
    players,
    isHighestRated,
}) => {
    const player = playerData?.player;
    const validPlayer = player && player.id;

    const getPlayerRating = useMemo(() => {
        if (!validPlayer) return 0;
        const found = players.find((p) => p.player.id === player.id);
        return found?.stats?.[0]?.games?.rating || 0;
    }, [players, validPlayer ? player.id : null]);

    if (!validPlayer) {
        console.warn('Invalid player data:', playerData);
        return null;
    }

    const photoUrl = playerPhotos[player.id] || 'https://via.placeholder.com/50';
    const rating = parseFloat(getPlayerRating).toFixed(1);
    const truncatedName = player.name?.split(' ').slice(-1)[0]?.slice(0, 10) || 'Unknown';

    const getEventPositionStyle = (eventType, index) => {
        const spacing = 8;
        switch (eventType) {
            case 'goal':
                return { bottom: 50, right: 10 + index * spacing };
            case 'subst':
                return { bottom: 25, right: 20 };
            case 'card':
                return { bottom: 50, left: 10 + index * spacing };
            case 'missed':
                return { bottom: 50, left: 10 + index * spacing };
            default:
                return { bottom: 20, left: 10 + index * spacing };
        }
    };

    return (
        <PlayerIcon
            photoUrl={photoUrl}
            style={{
                top: `${posY}px`,
                left: `${posX}px`,
                position: 'absolute',
                zIndex: 10,
            }}
            onClick={() => onClick(player.id)}
        >
            <LazyPlayerImage playerId={player.id} photoUrl={photoUrl} />
            {rating && (
                <RatingLabel rating={rating} isHighestRated={isHighestRated}>
                    {rating}
                </RatingLabel>
            )}
            <PlayerDetailsWrapper>
                <PlayerText>
                    {player.number} {truncatedName}
                </PlayerText>
                <EventIconWrapper>
                    {playerEvents
                        .filter((event) => {
                            const isAssistEvent = event.assist?.id === player.id;
                            const isSubstitutionEvent = event.type.toLowerCase() === 'subst';
                            return isSubstitutionEvent || !isAssistEvent;
                        })
                        .map((event, index) => (
                            <div
                                key={`${player.id}-${event.type}-${event.detail}-${event.time.elapsed}-${index}`}
                                style={{
                                    position: 'absolute',
                                    ...getEventPositionStyle(event.type.toLowerCase(), index),
                                }}
                            >
                                {getEventIcon(event)}
                            </div>
                        ))}
                </EventIconWrapper>
            </PlayerDetailsWrapper>
        </PlayerIcon>
    );
};

export default React.memo(PlayerIconComponent);
