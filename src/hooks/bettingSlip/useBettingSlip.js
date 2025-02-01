import { useState, useCallback } from "react";
import { isDuplicateBet } from "../../utils/bettingSlipUtils";

export const useBettingSlip = (showBettingSlip, toggleBettingSlip) => {
    const [bettingSlip, setBettingSlip] = useState([]);

    const addToBettingSlip = useCallback(
        (newBet) => {
            setBettingSlip((prevSlip) => {
                if (isDuplicateBet(prevSlip, newBet)) {
                    alert(`You cannot add the same bet (${newBet.betName} - ${newBet.value}) twice for the same match.`);
                    return prevSlip;
                }

                const updatedSlip = [...prevSlip];
                const matchIndex = updatedSlip.findIndex(
                    (bet) => bet.matchInfo.id === newBet.matchInfo.id
                );

                if (matchIndex !== -1) {
                    updatedSlip[matchIndex].bets.push(newBet);
                } else {
                    updatedSlip.push({ matchInfo: newBet.matchInfo, bets: [newBet] });
                }

                return updatedSlip;
            });

            if (!showBettingSlip) toggleBettingSlip();
        },
        [showBettingSlip, toggleBettingSlip]
    );

    const removeFromBettingSlip = useCallback((matchIndex, betIndex) => {
        setBettingSlip((prevSlip) => {
            const updatedSlip = [...prevSlip];
            updatedSlip[matchIndex].bets.splice(betIndex, 1);
            if (updatedSlip[matchIndex].bets.length === 0) updatedSlip.splice(matchIndex, 1);
            return updatedSlip;
        });
    }, []);

    const clearBettingSlip = useCallback(() => {
        setBettingSlip([]);
    }, []);

    return { bettingSlip, addToBettingSlip, removeFromBettingSlip, clearBettingSlip, setBettingSlip };
};
