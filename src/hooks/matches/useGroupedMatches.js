import { useMemo } from "react";

export const useGroupedMatches = (matches = [], filterCondition) => {
    return useMemo(() => {
        if (!matches || !Array.isArray(matches)) return {};

        const filteredMatches = matches.filter(filterCondition);

        return filteredMatches.reduce((acc, match) => {
            const leagueId = match.leagueId;
            if (!leagueId) {
                console.warn("Match is missing leagueId:", match);
                return acc;
            }

            if (!acc[leagueId]) {
                acc[leagueId] = {
                    league: {
                        id: leagueId,
                        name: match.leagueName,
                        logo: match.leagueLogo,
                    },
                    matches: [],
                };
            }

            acc[leagueId].matches.push(match);
            return acc;
        }, {});
    }, [matches, filterCondition]);
};
