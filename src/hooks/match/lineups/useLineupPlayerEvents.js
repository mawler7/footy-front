import { useMemo } from "react";

const useLineupPlayerEvents = (events) => {
    return useMemo(() => {
        if (!events || !Array.isArray(events)) return {};

        return events.reduce((acc, event) => {
            const playerId = event?.player?.id;
            if (playerId) {
                acc[playerId] = acc[playerId] || [];
                acc[playerId].push(event);
            }
            return acc;
        }, {});
    }, [events]);
};

export default useLineupPlayerEvents;
