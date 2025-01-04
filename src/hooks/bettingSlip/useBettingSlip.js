export const useBettingSlip = (setBettingSlip, setShowBubble) => {
    const handleAddToSlip = ({ betName, value, odd, matchInfo }) => {
        const { id, homeTeamName, awayTeamName, date, leagueName } = matchInfo;


        setBettingSlip((prev) => {
            const isBetAlreadyAdded = prev.some(
                (bet) => bet.betName === betName && bet.matchInfo.id === id
            );

            if (isBetAlreadyAdded) {
                alert(
                    `Bet "${betName}" for the match "${homeTeamName} vs ${awayTeamName}" is already added to the slip. Remove it first to add another.`
                );
                return prev;
            }

            const newBet = {
                betName: betName || 'Unknown Bet',
                value: value || 'Unknown Value',
                odd: odd || '0.00',
                matchInfo: { id, homeTeamName, awayTeamName, date, leagueName },
            };

            setShowBubble(true);
            return [...prev, newBet];
        });
    };

    return handleAddToSlip;
};

export default useBettingSlip;