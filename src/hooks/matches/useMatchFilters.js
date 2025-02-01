import { useMemo } from "react";
import { useFilteredMatches } from "../../hooks/matches/useFilteredMatches";

export const useMatchFilters = (matches, activeFilters, sortedFavorites, liveMatches, scheduledMatches, finishedMatches, favorites = []) => {
    const filteredMatches = useFilteredMatches(
        matches || [],
        activeFilters || [],
        sortedFavorites || [],
        liveMatches || [],
        scheduledMatches || [],
        finishedMatches || []
    );

    return useMemo(() => ({
        groupedFavorites: (filteredMatches || []).filter((match) =>
            Array.isArray(favorites) && favorites.some((fav) => fav?.id === match?.id)
        ),
        groupedLive: (filteredMatches || []).filter(
            (match) =>
                Array.isArray(favorites) &&
                !favorites.some((fav) => fav?.id === match?.id) &&
                ["1H", "2H", "HT", "ET", "BT"].includes(match?.status)
        ),
        groupedScheduled: (filteredMatches || []).filter(
            (match) =>
                Array.isArray(favorites) &&
                !favorites.some((fav) => fav?.id === match?.id) &&
                !["FT", "AET", "PEN", "1H", "2H", "HT", "ET", "BT"].includes(match?.status)
        ),
        groupedFinished: (filteredMatches || []).filter(
            (match) =>
                Array.isArray(favorites) &&
                !favorites.some((fav) => fav?.id === match?.id) &&
                ["FT", "AET", "PEN"].includes(match?.status)
        ),
    }), [filteredMatches, favorites]);
};
