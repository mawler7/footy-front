import React, { useContext } from "react";
import BettingSlipSummary from "./BettingSlipSummary";
import BettingSlipActions from "./BettingSlipActions";
import { BettingSlipContext } from "../context/BettingSlipContext";
import {
    BettingSlipWrapper,
    BubbleContent,
} from "../../styles/bettingSlip/BettingSlipStyles";
import { ActionButton } from "../../styles/buttons/buttons";
import { FaTrash } from "react-icons/fa";

const BettingSlipContent = () => {
    const {
        bettingSlip = [],
        clearBettingSlip,
        removeBetFromBettingSlip,
        removeMatchFromBettingSlip,
        handleOddsChange,
        setBettingSlip,
    } = useContext(BettingSlipContext);

    if (!bettingSlip || bettingSlip.length === 0) return null;

    return (
        <BettingSlipWrapper>
            <ActionButton onClick={clearBettingSlip} title="Clear all bets">
                <FaTrash size={15} />
            </ActionButton>
            <BubbleContent>
                <BettingSlipSummary
                    bettingSlip={bettingSlip}
                    setBettingSlip={setBettingSlip}
                    handleOddsChange={handleOddsChange}
                    removeBetFromBettingSlip={removeBetFromBettingSlip}
                    removeMatchFromBettingSlip={removeMatchFromBettingSlip}
                />
                <BettingSlipActions />
            </BubbleContent>
        </BettingSlipWrapper>
    );
};

export default React.memo(BettingSlipContent);
