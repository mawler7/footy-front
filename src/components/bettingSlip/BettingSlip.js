import React, { useContext } from "react";
import {
    BubbleContainerWrapper,
    BubbleContainer,
    BettingSlipContentWrapper,
} from "../../styles/bettingSlip/BettingSlipStyles";
import BettingHeader from "./BettingHeader";
import BettingSlipContent from "./BettingSlipContent";
import SavedBets from "./SavedBets";
import { BettingSlipContext } from "../context/BettingSlipContext";

const BettingSlip = () => {
    const { showBettingSlip, showSavedBets } = useContext(BettingSlipContext);

    if (!showBettingSlip) return null;

    return (
        <BubbleContainerWrapper show={showBettingSlip}>
            <BubbleContainer>
                <BettingHeader />
                {showSavedBets && <SavedBets />}
                <BettingSlipContentWrapper>
                    <BettingSlipContent />
                </BettingSlipContentWrapper>
            </BubbleContainer>
        </BubbleContainerWrapper>
    );
};

export default BettingSlip;
