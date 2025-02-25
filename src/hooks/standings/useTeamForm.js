import { useCallback } from 'react';

export const useTeamForm = (fixtures) => {
    const calculateForm = useCallback((teamName, matchesPlayed, filterType = 'total') => {
        if (!fixtures || !Array.isArray(fixtures) || !teamName || typeof teamName !== 'string') {
            return { form: [], formPoints: 0 };
        }

        const isValidDate = (date) => !isNaN(new Date(date).getTime());
        const currentDate = new Date();
        const validMatchesPlayed = Math.max(matchesPlayed || 5, 1);

        const teamFixtures = fixtures.filter((match) => {
            if (!isValidDate(match.date)) return false;

            const isHome = match.homeTeamName === teamName;
            const isAway = match.awayTeamName === teamName;

            if (filterType === 'home') return isHome;
            if (filterType === 'away') return isAway;
            return isHome || isAway;
        });

        const nextMatch = teamFixtures.find((match) => new Date(match.date) > currentDate);
        const pastMatches = teamFixtures
            .filter((match) => new Date(match.date) < currentDate)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, Math.min(validMatchesPlayed, 5));

        const form = [];
        let formPoints = 0;

        if (nextMatch) {
            form.push({
                result: '?',
                color: '#d3d3d3',
                tooltip: `${nextMatch.homeTeamName} vs ${nextMatch.awayTeamName}\n${new Date(
                    nextMatch.date
                ).toLocaleString()}`,
                matchId: nextMatch.id,
            });
        }

        pastMatches.forEach((match) => {
            const isHome = match.homeTeamName === teamName;
            const teamGoals = isHome ? match.matchScore.fullTimeHome : match.matchScore.fullTimeAway;
            const opponentGoals = isHome ? match.matchScore.fullTimeAway : match.matchScore.fullTimeHome;
            const result = teamGoals > opponentGoals ? 'W' : teamGoals === opponentGoals ? 'D' : 'L';
            const color = result === 'W' ? '#27ae60' : result === 'D' ? '#f39c12' : '#e74c3c';
            const tooltip = `${match.homeTeamName} ${match.matchScore.fullTimeHome} - ${match.matchScore.fullTimeAway} ${match.awayTeamName}\n${new Date(match.date).toLocaleTimeString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`;

            formPoints += result === 'W' ? 3 : result === 'D' ? 1 : 0;

            form.push({
                result,
                color,
                tooltip,
                matchId: match.id,
            });
        });

        return { form: form.slice(0, validMatchesPlayed + 1), formPoints };
    }, [fixtures]);

    return { calculateForm };
};

export default useTeamForm;
