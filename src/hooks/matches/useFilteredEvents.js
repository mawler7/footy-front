import { useMemo } from 'react';

const useFilteredEvents = (events = []) => {
    const uniqueEvents = useMemo(() => {
        const seen = new Set();
        return events.filter((event) => {
            const key = `${event.type}-${event.detail}-${event.time.elapsed}-${event.time.extra || 0}-${event.player?.id || ''}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }, [events]);

    const sortEventsByTime = (events) => {
        return events.slice().sort((a, b) => {
            const timeA = a.time.elapsed + (a.time.extra ? a.time.extra / 100 : 0);
            const timeB = b.time.elapsed + (b.time.extra ? a.time.extra / 100 : 0);
            return timeA - timeB;
        });
    };

    return useMemo(() => {
        const firstHalf = uniqueEvents.filter((event) => event.time.elapsed <= 45 && event.type !== 'Penalty');
        const secondHalf = uniqueEvents.filter((event) => event.time.elapsed > 45 && event.time.elapsed <= 90 && event.type !== 'Penalty');
        const extraTime = uniqueEvents.filter((event) => event.time.elapsed > 90 && event.type !== 'Penalty');
        const penalties = uniqueEvents.filter((event) => event.type === 'Penalty');

        return {
            firstHalf: sortEventsByTime(firstHalf),
            secondHalf: sortEventsByTime(secondHalf),
            extraTime: sortEventsByTime(extraTime),
            penalties: sortEventsByTime(penalties),
        };
    }, [uniqueEvents]);
};

export default useFilteredEvents;
