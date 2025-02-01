import { useMemo } from 'react';
import { useGroupedMatches } from './useGroupedMatches';

export const useMatchesGrouping = (matches, favorites) => {
    const groupedFavorites = useGroupedMatches(matches, (match) =>
        favorites.some((fav) => fav.id === match.id)
    );

    const remainingAfterFavorites = useMemo(() => {
        return matches.filter((match) => !favorites.some((fav) => fav.id === match.id));
    }, [matches, favorites]);

    const groupedLive = useGroupedMatches(
        remainingAfterFavorites,
        (match) => ["1H", "2H", "HT", "ET", "BT"].includes(match.status)
    );

    const remainingAfterLive = useMemo(() => {
        return remainingAfterFavorites.filter(
            (match) => !["1H", "2H", "HT", "ET", "BT"].includes(match.status)
        );
    }, [remainingAfterFavorites]);

    const groupedScheduled = useGroupedMatches(
        remainingAfterLive,
        (match) => !["FT", "AET", "PEN"].includes(match.status)
    );

    const groupedFinished = useGroupedMatches(
        remainingAfterLive,
        (match) => ["FT", "AET", "PEN"].includes(match.status)
    );

    return {
        groupedFavorites,
        groupedLive,
        groupedScheduled,
        groupedFinished,
    };
};
