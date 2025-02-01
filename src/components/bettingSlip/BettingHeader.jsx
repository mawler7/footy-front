import React, { useContext } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
    BalanceInfo,
    CompactHeaderContainer,
    CompactSavedSlipsToggleButton,
} from "../../styles/bettingSlip/BettingSlipStyles";
import { BettingSlipContext } from "../context/BettingSlipContext";

const BettingHeader = React.memo(() => {
    const { balance, showSavedBets, toggleSavedBets } = useContext(BettingSlipContext);

    return (
        <CompactHeaderContainer>
            <BalanceInfo>
                <strong>Balance:</strong>
                <span>{balance} PLN</span>
            </BalanceInfo>
            <CompactSavedSlipsToggleButton onClick={toggleSavedBets} title="Toggle My Bets">
                {showSavedBets ? <FaChevronUp /> : <FaChevronDown />}
                <span>My Bets</span>
            </CompactSavedSlipsToggleButton>
        </CompactHeaderContainer>
    );
});

export default BettingHeader;
