import { useMemo, useContext } from 'react';
import { AuthContext } from '../components/context/AuthContext';

export const useSortedMatches = (matches, leagueOrder) => {

    const sortType = useContext(AuthContext).userPreferences.sortType;
    console.log('Use sorted Matches hook sort type: ', sortType)
    console.log('Matches retrieved: ', matches)
    return useMemo(() => {
        console.log('Before sorting: ', matches)
        if (sortType === 'LEAGUE_NAME') {

            return matches
                .filter((match) => match.leagueId && match.leagueName && match.leagueLogo)
                .sort((a, b) => {
                    const leagueIndexA = leagueOrder.indexOf(a.leagueId);
                    const leagueIndexB = leagueOrder.indexOf(b.leagueId);

                    const orderA = leagueIndexA === -1 ? Infinity : leagueIndexA;
                    const orderB = leagueIndexB === -1 ? Infinity : leagueIndexB;


                    return orderA - orderB || new Date(a.date) - new Date(b.date);
                });
        }

        return matches
            .filter((match) => match.leagueId && match.leagueName && match.leagueLogo)
            .sort((a, b) => new Date(a.date) - new Date(b.date));

    }, [matches, leagueOrder]);
};