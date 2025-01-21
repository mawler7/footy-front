export const mapPlayersWithEvents = (lineups = [], events = []) => {
    const playersWithEvents = {};

    events.forEach((event) => {
        const { player, type } = event;
        if (player?.id) {
            if (!playersWithEvents[player.id]) {
                playersWithEvents[player.id] = [];
            }
            playersWithEvents[player.id].push({
                type: type.toLowerCase(),
                detail: event.detail,
                time: event.time?.elapsed,
            });
        }
    });

    const playersWithPositions = lineups.flatMap((team) =>
        team.startXI.map((playerData) => ({
            ...playerData.player,
            grid: playerData.player.grid,
            events: playersWithEvents[playerData.player.id] || [],
        }))
    );

    return playersWithPositions;
};

export default mapPlayersWithEvents;