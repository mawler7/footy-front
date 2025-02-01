// src/components/bettingSlip/BettingSlipActions.jsx
import React, { useContext, useMemo, useCallback } from "react";
import {
    BubbleRowWrapper,
    BetRow,
    StakeInput,
    BonusInput,
    TotalOdds,
    PotentialWinnings,
} from "../../styles/bettingSlip/BettingSlipStyles";
import { Label } from "../../styles/shared/SharedStyles";
import { ActionButton } from "../../styles/buttons/buttons";
import { FaSave } from "react-icons/fa";
import { BettingSlipContext } from "../context/BettingSlipContext";

const BettingSlipActions = React.memo(() => {
    const {
        stake,
        setStake,
        bonus,
        setBonus,
        isFreeBet,
        setIsFreeBet,
        calculateTotalOdds,
        calculatePotentialWinnings,
        saveBettingSlip,
        bettingSlip,
    } = useContext(BettingSlipContext);

    const totalOdds = useMemo(() => calculateTotalOdds(), [calculateTotalOdds]);
    const potentialWinnings = useMemo(() => calculatePotentialWinnings(), [calculatePotentialWinnings]);

    const onSave = useCallback(() => {
        if (!stake || stake <= 0) {
            alert("Please enter a valid stake.");
            return;
        }
        const newSlip = {
            id: bettingSlip[0]?.id || Date.now(),
            bettingSlip,
            stake,
            bonus,
            totalOdds,
            potentialWinnings,
        };
        saveBettingSlip(newSlip);
    }, [bettingSlip, bonus, potentialWinnings, saveBettingSlip, stake, totalOdds]);

    return (
        <>
            <BubbleRowWrapper>
                <BetRow>
                    <Label>Free</Label>
                    <input
                        type="checkbox"
                        checked={isFreeBet}
                        onChange={(e) => setIsFreeBet(e.target.checked)}
                    />
                    <Label>Bonus</Label>
                    <BonusInput
                        type="number"
                        step="1"
                        value={bonus}
                        onChange={(e) => setBonus(Math.max(0, parseFloat(e.target.value) || 0))}
                    />
                    <span>Stake:</span>
                    <StakeInput
                        type="number"
                        value={stake}
                        onChange={(e) => setStake(parseFloat(e.target.value) || 0)}
                    />
                </BetRow>
            </BubbleRowWrapper>
            <TotalOdds>
                Total Odds: <span>{totalOdds.toFixed(2)}</span>
            </TotalOdds>
            <PotentialWinnings>
                Potential Winnings: <span>{potentialWinnings.toFixed(2)} PLN</span>
            </PotentialWinnings>
            <ActionButton onClick={onSave} title="Save betting slip">
                <FaSave size={16} />
            </ActionButton>
        </>
    );
});

export default BettingSlipActions;
