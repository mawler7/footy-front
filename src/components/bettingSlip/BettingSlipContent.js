import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { BettingSlipContext } from "../context/BettingSlipContext";
import BettingSlipSummary from "./BettingSlipSummary";
import BettingSlipActions from "./BettingSlipActions";
import {
    BettingSlipWrapper,
    BubbleContent,
} from "../../styles/bettingSlip/BettingSlipStyles";
import { ActionButton } from "../../styles/buttons/buttons";

const BettingSlipContent = () => {
    const {
        bettingSlip = [],
        setBettingSlip,
        removeFromBettingSlip,
        clearBettingSlip,
        stake,
        setStake,
        bonus,
        setBonus,
        isFreeBet,
        setIsFreeBet,
        saveBettingSlip,
    } = useContext(BettingSlipContext);

    const handleOddsChange = (matchIndex, betIndex, newOdd) => {
        const updatedSlip = [...bettingSlip];
        updatedSlip[matchIndex].bets[betIndex].odd = parseFloat(newOdd) || 1;
        setBettingSlip(updatedSlip);
    };

    const handleRemoveBet = (matchIndex, betIndex) => {
        const updatedSlip = [...bettingSlip];
        updatedSlip[matchIndex].bets.splice(betIndex, 1);

        if (updatedSlip[matchIndex].bets.length === 0) {
            updatedSlip.splice(matchIndex, 1);
        }

        setBettingSlip(updatedSlip);
    };


    return (
        <BettingSlipWrapper>
            {bettingSlip.length > 0 && (
                <ActionButton
                    onClick={clearBettingSlip}
                    title="Clear all bets"
                    style={{ marginLeft: "10px", marginTop: "5px" }}
                >
                    <FaTrash size={15} />
                </ActionButton>
            )}

            <BubbleContent>
                <BettingSlipSummary
                    bettingSlip={bettingSlip}
                    setBettingSlip={setBettingSlip}
                    handleRemoveBet={handleRemoveBet}
                    handleOddsChange={handleOddsChange}
                    calculateMatchOdds={(bets) =>
                        bets.reduce(
                            (total, bet) => total * (parseFloat(bet.odd) || 1),
                            1
                        )
                    }
                    removeFromBettingSlip={removeFromBettingSlip}
                />

                {bettingSlip.length > 0 && (
                    <BettingSlipActions
                        stake={stake}
                        setStake={setStake}
                        bonus={bonus}
                        setBonus={setBonus}
                        isFreeBet={isFreeBet}
                        setIsFreeBet={setIsFreeBet}
                        saveBettingSlip={saveBettingSlip}
                        totalOdds={bettingSlip.reduce(
                            (total, match) =>
                                total *
                                match.bets.reduce(
                                    (betTotal, bet) =>
                                        betTotal * (parseFloat(bet.odd) || 1),
                                    1
                                ),
                            1
                        ).toFixed(2)}
                        potentialWinnings={(
                            stake *
                            bettingSlip.reduce(
                                (total, match) =>
                                    total *
                                    match.bets.reduce(
                                        (betTotal, bet) =>
                                            betTotal * (parseFloat(bet.odd) || 1),
                                        1
                                    ),
                                1
                            ) *
                            0.88 *
                            (1 + bonus / 100)
                        ).toFixed(2)}
                        safeParseFloat={(value) =>
                            isNaN(parseFloat(value)) ? 1 : parseFloat(value)
                        }
                    />
                )}

            </BubbleContent>
        </BettingSlipWrapper>
    );
};

export default BettingSlipContent;
