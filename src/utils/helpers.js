export const calculateOdds = (bets) =>
    bets.reduce((acc, bet) => acc * (parseFloat(bet.odd) || 1), 1).toFixed(2);

export const calculatePotentialWinnings = (stake, bets, bonus) => {
    const odds = calculateOdds(bets);
    return (stake * odds * 0.88 * (1 + bonus / 100)).toFixed(2);
};

export const DEFAULT_PREFERENCES = {
    timezone: 'GMT+1',
    sortType: 'LEAGUE_NAME',
    darkMode: true,
};

export const YellowCardIcon = () => (
    <svg width="12" height="15" viewBox="0 0 20 20" fill="yellow">
        <rect width="16" height="20" rx="2" ry="2" />
    </svg>
);

export const RedCardIcon = () => (
    <svg width="12" height="15" viewBox="0 0 20 20" fill="red">
        <rect width="16" height="20" rx="2" ry="2" />
    </svg>
);

export const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${day}.${month}. ${time}`;
};

export const getResultIndicator = (homeScore, awayScore, isHomeTeam) => {
    if (homeScore === awayScore) return 'D';
    return isHomeTeam ? (homeScore > awayScore ? 'W' : 'L') : (awayScore > homeScore ? 'W' : 'L');
};

export const TIMEZONES = [...Array.from({ length: 27 }, (_, i) => `GMT${i - 12 > 0 ? '+' : ''}${i - 12}:00`)];

