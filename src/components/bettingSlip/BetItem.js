import React from "react";
import { FaTimes } from "react-icons/fa";
import {
    BetRow,
    BetNameLabel,
    BetValueLabel,
    OddsLabel,
    EditableInput,
} from "../../styles/bettingSlip/BettingSlipStyles";

const BetItem = ({ match, matchIndex, handleRemoveBet, handleOddsChange, setBettingSlip }) => (
    <>
        {match.bets.map((bet, betIndex) => (
            <React.Fragment key={betIndex}>
                <BetRow>
                    {match.bets.length > 1 && (
                        <FaTimes
                            size={10}
                            style={{ cursor: "pointer", marginRight: "8px", color: "red" }}
                            onClick={() => handleRemoveBet(matchIndex, betIndex)}
                            title="Remove bet"
                        />
                    )}
                    <BetNameLabel>{bet.betName}</BetNameLabel>
                </BetRow>
                <BetRow>
                    <BetValueLabel>{bet.value}</BetValueLabel>
                </BetRow>
                <BetRow>
                    <OddsLabel>
                        <EditableInput
                            type="number"
                            step="0.01"
                            value={bet.odd || ""}
                            onChange={(e) => handleOddsChange(matchIndex, betIndex, e.target.value, setBettingSlip)}
                        />
                    </OddsLabel>
                </BetRow>
            </React.Fragment>
        ))}
    </>
);

export default BetItem;
