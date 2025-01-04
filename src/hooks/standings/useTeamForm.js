import { useCallback } from 'react';

export const useTeamForm = (fixtures) => {

    const calculateForm = useCallback((teamName, matchesPlayed) => {
        if (!fixtures || !Array.isArray(fixtures) || !teamName || typeof teamName !== 'string') {
            return [];
        }

        const isValidDate = (date) => !isNaN(new Date(date).getTime());
        const currentDate = new Date();
        const validMatchesPlayed = Math.max(matchesPlayed || 5, 1);

        const teamFixtures = fixtures.filter(
            (match) =>
                match &&
                isValidDate(match.date) &&
                (match.homeTeamName === teamName || match.awayTeamName === teamName)
        );

        const nextMatch = teamFixtures.find((match) => new Date(match.date) > currentDate);
        const pastMatches = teamFixtures
            .filter((match) => new Date(match.date) < currentDate)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, Math.min(validMatchesPlayed, 5));

        const form = [];

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
            const teamGoals = isHome ? match.fullTimeHome : match.fullTimeAway;
            const opponentGoals = isHome ? match.fullTimeAway : match.fullTimeHome;
            const result = teamGoals > opponentGoals ? 'W' : teamGoals === opponentGoals ? 'D' : 'L';
            const color = result === 'W' ? '#27ae60' : result === 'D' ? '#f39c12' : '#e74c3c';
            const tooltip = `${match.homeTeamName} ${match.fullTimeHome} - ${match.fullTimeAway} ${match.awayTeamName}\n${new Date(match.date).toLocaleString()}`;

            form.push({
                result,
                color,
                tooltip,
                matchId: match.id,
            });
        });

        return form.slice(0, validMatchesPlayed + 1);
    }, [fixtures]);

    return { calculateForm };
};

export default useTeamForm;