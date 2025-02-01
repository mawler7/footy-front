import React from "react";
import BetItem from "./BetItem";
import { BetDetails, BubbleItem, TotalOdds } from "../../styles/bettingSlip/BettingSlipStyles";
import { DeleteBetButton } from "../../styles/buttons/buttons";
import { FaTimes } from "react-icons/fa";
import { calculateMatchOdds } from "../../utils/bettingSlipUtils";

const BettingSlipSummary = ({ bettingSlip, setBettingSlip, handleOddsChange, removeMatchFromBettingSlip, removeBetFromBettingSlip }) => (
    <>
        {bettingSlip.map((match, matchIndex) => (
            <BubbleItem key={matchIndex}>
                <BetDetails>
                    <div>
                        {match?.matchInfo?.homeTeamName || "Home"} vs {match?.matchInfo?.awayTeamName || "Away"}
                    </div>
                    <BetItem
                        match={match}
                        matchIndex={matchIndex}
                        removeBetFromBettingSlip={removeBetFromBettingSlip}
                        handleOddsChange={handleOddsChange}
                        setBettingSlip={setBettingSlip}
                    />
                    {match.bets.length > 1 && (
                        <TotalOdds>
                            Odds: <span>{calculateMatchOdds(match.bets).toFixed(2)}</span>
                        </TotalOdds>
                    )}
                </BetDetails>
                <DeleteBetButton onClick={() => removeMatchFromBettingSlip(matchIndex)} title="Remove this match">
                    <FaTimes size={10} />
                </DeleteBetButton>
            </BubbleItem>
        ))}
    </>
);

export default React.memo(BettingSlipSummary);