import React, { useContext, useCallback } from "react";
import { FaTimes } from "react-icons/fa";
import { BetDetails, TotalOdds } from "../../styles/bettingSlip/BettingSlipStyles";
import { DeleteBetButton } from "../../styles/buttons/buttons";
import { BettingSlipContext } from "../context/BettingSlipContext";

const BettingSlipMatch = React.memo(({ match, matchIndex }) => {
    const { removeFromBettingSlip, calculateMatchOdds } = useContext(BettingSlipContext);

    const onRemove = useCallback(() => removeFromBettingSlip(matchIndex), [matchIndex, removeFromBettingSlip]);

    return (
        <>
            <BetDetails>
                <div>
                    {match?.matchInfo?.homeTeamName || "Home"} vs {match?.matchInfo?.awayTeamName || "Away"}
                </div>
                {match.bets.length > 1 && (
                    <TotalOdds>
                        Odds: <span>{calculateMatchOdds(match.bets).toFixed(2)}</span>
                    </TotalOdds>
                )}
            </BetDetails>
            <DeleteBetButton onClick={onRemove} title="Remove this match">
                <FaTimes size={10} />
            </DeleteBetButton>
        </>
    );
});

export default BettingSlipMatch;
