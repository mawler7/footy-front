import React, { useMemo } from 'react';
import PlayerIconComponent from './PlayerIconComponent';
import { getHorizontalPosition, getVerticalPosition } from '../../../../utils/positionUtils';

const FormationRenderer = ({
    team,
    isHome,
    isAway,
    pitchDimensions,
    $isVertical,
    playerPhotos,
    onPlayerClick,
    playersWithEvents,
    players,
}) => {
    const highestRatedPlayerId = useMemo(() => {
        const ratings = playersWithEvents
            .filter((p) => p?.stats?.[0]?.games?.rating)
            .map((p) => ({
                id: p.id,
                rating: parseFloat(p.stats[0].games.rating),
            }));
        if (!ratings.length) return null;
        return ratings.reduce((highest, current) =>
            current.rating > highest.rating ? current : highest
        ).id;
    }, [playersWithEvents]);

    const goalkeeper = useMemo(
        () => team.startXI.find((player) => player?.player?.grid?.startsWith('1')),
        [team.startXI]
    );

    const lines = useMemo(
        () =>
            team.formation?.split('-').map((_, lineIndex) =>
                team.startXI
                    .filter((player) => {
                        const gridLine = parseInt(player?.player?.grid?.split(':')[0], 10);
                        return gridLine === lineIndex + 2;
                    })
                    .filter((player, index, self) =>
                        self.findIndex((p) => p.player.id === player.player.id) === index
                    )
            ),
        [team.startXI, team.formation]
    );

    if (!team?.startXI || !team?.formation) return null;

    const renderGoalkeeper = () => {
        if (!goalkeeper || !goalkeeper.player || !goalkeeper.player.id) return null;
        const posX = $isVertical
            ? pitchDimensions.width / 2
            : isAway
                ? pitchDimensions.width * 0.94
                : pitchDimensions.width * 0.06;
        const posY = $isVertical
            ? isHome
                ? pitchDimensions.height * 0.05
                : pitchDimensions.height * 0.95
            : pitchDimensions.height / 2;
        const playerEvents = playersWithEvents.find(
            (p) => p.id === goalkeeper.player.id || p.name === goalkeeper.player.name
        )?.events || [];
        return (
            <PlayerIconComponent
                key={goalkeeper.player.id || goalkeeper.player.name}
                playerData={goalkeeper}
                posX={posX}
                posY={posY - 50}
                onClick={onPlayerClick}
                playerPhotos={playerPhotos}
                playerEvents={playerEvents}
                players={players}
                isHighestRated={goalkeeper.player.id === highestRatedPlayerId}
            />
        );
    };

    const renderPlayers = () =>
        lines.map((line, lineIndex) =>
            line.map((playerData, playerIndex) => {
                const uniqueKey = `${playerData.player.id}-${lineIndex}-${playerIndex}`;
                const posX = getHorizontalPosition(lineIndex, lines.length, pitchDimensions.width, isAway, $isVertical);
                const posY = getVerticalPosition(playerIndex, line.length, pitchDimensions.height, $isVertical, isAway);
                return (
                    <PlayerIconComponent
                        key={uniqueKey}
                        playerData={playerData}
                        posX={posX}
                        posY={posY - 50}
                        onClick={onPlayerClick}
                        playerPhotos={playerPhotos}
                        playerEvents={playersWithEvents.find(
                            (p) => p.id === playerData.player.id || p.name === playerData.player.name
                        )?.events || []}
                        players={players}
                        $isHighestRated={playerData.player.id === highestRatedPlayerId}
                    />
                );
            })
        );

    return (
        <>
            {renderGoalkeeper()}
            {renderPlayers()}
        </>
    );
};

export default FormationRenderer;
