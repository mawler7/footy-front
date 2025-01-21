import React, { useContext } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
    BalanceInfo,
    CompactHeaderContainer,
    CompactSavedSlipsToggleButton,
} from "../../styles/bettingSlip/BettingSlipStyles";
import { BettingSlipContext } from "../context/BettingSlipContext";

const BettingHeader = () => {
    const { balance, showSavedBets, toggleSavedSlips } = useContext(BettingSlipContext);

    return (
        <CompactHeaderContainer>
            <BalanceInfo>
                <strong>Balance:</strong>
                <span>{balance} PLN</span>
            </BalanceInfo>
            <CompactSavedSlipsToggleButton onClick={toggleSavedSlips}>
                {showSavedBets ? <FaChevronUp /> : <FaChevronDown />}
                <span>My Bets</span>
            </CompactSavedSlipsToggleButton>
        </CompactHeaderContainer>
    );
};

export default BettingHeader;
