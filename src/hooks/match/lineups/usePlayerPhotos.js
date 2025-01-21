import { useMemo } from 'react';

export const usePlayerPhotos = (players = []) => {
    return useMemo(() => {
        if (!Array.isArray(players)) {
            console.warn('Players data is not an array:', players); // Debug
            return {};
        }

        return players.reduce((map, playerData) => {
            const player = playerData?.player;
            if (player?.id) {
                map[player.id] = player.photo || '/default-player-photo.png';
            }
            return map;
        }, {});
    }, [players]);
};
