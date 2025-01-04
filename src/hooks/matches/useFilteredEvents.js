import { useMemo } from 'react';

const useFilteredEvents = (events = []) => {
    const sortEventsByTime = (events) => {
        return events.slice().sort((a, b) => {
            const timeA = a.time.elapsed + (a.time.extra ? a.time.extra / 100 : 0);
            const timeB = b.time.elapsed + (b.time.extra ? b.time.extra / 100 : 0);
            return timeA - timeB;
        });
    };

    return useMemo(() => {
        const firstHalf = events.filter((event) => event.time.elapsed <= 45 && event.type !== 'Penalty');
        const secondHalf = events.filter((event) => event.time.elapsed > 45 && event.time.elapsed <= 90 && event.type !== 'Penalty');
        const extraTime = events.filter((event) => event.time.elapsed > 90 && event.type !== 'Penalty');
        const penalties = events.filter((event) => event.type === 'Penalty');



        return {
            firstHalf: sortEventsByTime(firstHalf),
            secondHalf: sortEventsByTime(secondHalf),
            extraTime: sortEventsByTime(extraTime),
            penalties: sortEventsByTime(penalties),
        };
    }, [events]);
};

export default useFilteredEvents;
