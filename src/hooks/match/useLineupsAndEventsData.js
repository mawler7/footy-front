import { useMemo } from 'react';

export const useLineupsAndEventsData = (match) => {
    const { events = [], lineups = [], players = [] } = match || {};

    // Filtrowanie wydarzeń
    const filteredEvents = useMemo(() => {
        const firstHalf = events.filter(event => event.time.elapsed <= 45);
        const secondHalf = events.filter(event => event.time.elapsed > 45 && event.time.elapsed <= 90);
        const extraTime = events.filter(event => event.time.elapsed > 90);
        const penalties = events.filter(event => event.type === 'penalty');
        return { firstHalf, secondHalf, extraTime, penalties };
    }, [events]);

    const playerEvents = useMemo(() => {
        return events.reduce((acc, event) => {
            if (event.player?.id) {
                acc[event.player.id] = acc[event.player.id] || [];
                acc[event.player.id].push(event);
            }
            return acc;
        }, {});
    }, [events]);

    const formattedLineups = useMemo(() => {
        return lineups.map(team => ({
            ...team,
            startXI: team.startXI.map(player => ({
                ...player,
                events: playerEvents[player.player.id] || [],
            })),
        }));
    }, [lineups, playerEvents]);

    return {
        lineups: formattedLineups,
        players,
        filteredEvents,
        playerEvents,
    };
};

export default useLineupsAndEventsData;
