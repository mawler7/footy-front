import { useMemo } from 'react';

export const useSortedMatches = (matches, favorites) => {
    const sortedFavorites = useMemo(
        () =>
            matches
                .filter((match) => favorites.some((fav) => fav.id === match.id))
                .sort((a, b) => new Date(a.date) - new Date(b.date)),
        [matches, favorites]
    );

    const scheduledMatches = useMemo(
        () =>
            matches
                .filter(
                    (match) =>
                        !favorites.some((fav) => fav.id === match.id) &&
                        ['NS'].includes(match.status)
                )
                .sort((a, b) => new Date(a.date) - new Date(b.date)),
        [matches, favorites]
    );

    const finishedMatches = useMemo(
        () =>
            matches
                .filter(
                    (match) =>
                        !favorites.some((fav) => fav.id === match.id) &&
                        ['FT', 'AET', 'PEN'].includes(match.status)
                )
                .sort((a, b) => new Date(a.date) - new Date(b.date)),
        [matches, favorites]
    );

    return { sortedFavorites, scheduledMatches, finishedMatches };
};
