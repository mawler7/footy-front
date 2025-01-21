export const calculateOdds = (bets) =>
    bets.reduce((acc, bet) => acc * (parseFloat(bet.odd) || 1), 1).toFixed(2);

export const calculatePotentialWinnings = (stake, bets, bonus) => {
    const odds = calculateOdds(bets);
    return (stake * odds * 0.88 * (1 + bonus / 100)).toFixed(2);
};


