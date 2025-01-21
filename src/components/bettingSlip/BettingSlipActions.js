import React from "react";
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

const BettingSlipActions = ({
    stake,
    setStake,
    bonus,
    setBonus,
    isFreeBet,
    setIsFreeBet,
    saveBettingSlip,
    totalOdds,
    potentialWinnings,
    safeParseFloat,
}) => (
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
                    onChange={(e) =>
                        setBonus(Math.max(0, safeParseFloat(e.target.value)))
                    }
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
            Total Odds: <span>{totalOdds}</span>
        </TotalOdds>

        <PotentialWinnings>
            Potential Winnings: <span>{potentialWinnings} PLN</span>
        </PotentialWinnings>

        <ActionButton onClick={saveBettingSlip} title="Save betting slip">
            <FaSave size={16} />
        </ActionButton>
    </>
);

export default BettingSlipActions;
