import { useMemo } from 'react';

export const usePlayerEvents = (lineups, events) => {
    return useMemo(() => {
        const playerEventsMap = {};

        if (!Array.isArray(events)) {
            console.warn('Invalid events array:', events);
            return [];
        }

        events.forEach((event) => {
            const playerId = event?.player?.id;
            if (!playerId) {
                console.warn('Event without valid player ID:', event);
                return;
            }

            if (!playerEventsMap[playerId]) {
                playerEventsMap[playerId] = [];
            }
            playerEventsMap[playerId].push(event);
        });

        if (!Array.isArray(lineups)) {
            console.warn('Invalid lineups array:', lineups);
            return [];
        }

        const playersWithEvents = lineups.flatMap((team) => {
            if (!team?.startXI || !Array.isArray(team.startXI)) {
                console.warn('Invalid team or startXI:', team);
                return [];
            }

            return team.startXI.map((player) => {
                if (!player?.player?.id) {
                    console.warn('Player without ID:', player);
                    return null;
                }

                return {
                    ...player,
                    events: playerEventsMap[player?.player.id] || [],
                };
            }).filter(Boolean);
        });

        return playersWithEvents;
    }, [lineups, events]);
};

export default usePlayerEvents;
