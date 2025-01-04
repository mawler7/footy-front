import { useMemo } from 'react';

export const useFilteredMatches = (
    matches,
    activeFilters,
    sortedFavorites,
    liveMatches
) => {
    return useMemo(() => {
        if (activeFilters.includes('Favorites') && activeFilters.includes('Live')) {
            return sortedFavorites.filter((match) =>
                liveMatches.some((live) => live.id === match.id)
            );
        }
        if (activeFilters.includes('Favorites')) {
            return sortedFavorites;
        }
        if (activeFilters.includes('Live')) {
            return liveMatches;
        }
        if (activeFilters.includes('Scheduled')) {
            return matches.filter(
                (match) =>
                    ['NS'].includes(match.status)
            );
        }
        if (activeFilters.includes('Finished')) {
            return matches.filter((match) => ['FT', 'AET', 'PEN'].includes(match.status));
        }
        return matches;
    }, [matches, activeFilters, sortedFavorites, liveMatches]);
};
