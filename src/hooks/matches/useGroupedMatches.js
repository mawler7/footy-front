import { useMemo } from 'react';

export const useGroupedMatches = (matches) => {
    return useMemo(() => {
        if (!matches || matches.length === 0) return {};

        const sortedMatches = matches.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        );

        return sortedMatches.reduce((acc, match) => {
            if (!acc[match.leagueId]) {
                acc[match.leagueId] = {
                    league: {
                        id: match.leagueId,
                        name: match.leagueName,
                        logo: match.leagueLogo,
                    },
                    matches: [],
                };
            }

            acc[match.leagueId].matches.push(match);

            acc[match.leagueId].matches.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );

            return acc;
        }, {});
    }, [matches]);
};
