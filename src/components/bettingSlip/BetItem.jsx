import React, { useCallback } from "react";
import { FaTimes } from "react-icons/fa";
import {
    BetRow,
    BetNameLabel,
    BetValueLabel,
    OddsLabel,
    EditableInput,
} from "../../styles/bettingSlip/BettingSlipStyles";

const BetItem = React.memo(({ match, matchIndex, removeBetFromBettingSlip, handleOddsChange }) => {
    const onRemove = useCallback(
        () => removeBetFromBettingSlip(matchIndex),
        [matchIndex, removeBetFromBettingSlip]
    );
    const onOddsChange = useCallback(
        (e) => handleOddsChange(matchIndex, e.target.value),
        [matchIndex, handleOddsChange]
    );

    return (
        <>
            {match.bets.map((bet, betIndex) => (
                <React.Fragment key={betIndex}>
                    <BetRow>
                        {match.bets.length > 1 && (
                            <FaTimes
                                size={10}
                                style={{ cursor: "pointer", marginRight: "8px", color: "red" }}
                                onClick={onRemove}
                                title="Remove this bet"
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
                                onChange={onOddsChange}
                            />
                        </OddsLabel>
                    </BetRow>
                </React.Fragment>
            ))}
        </>
    );
});

export default BetItem;
