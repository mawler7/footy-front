import React, { useContext, useCallback } from "react";
import { FaTrash } from "react-icons/fa";
import {
    SavedSlipsContainer,
    SavedSlipItem,
    SlipName,
    DeleteButton,
} from "../../styles/bettingSlip/BettingSlipStyles";
import { BettingSlipContext } from "../context/BettingSlipContext";

const SavedBetItem = React.memo(({ slip }) => {
    const { handleWonToggle, loadSavedSlip, handleDelete } = useContext(BettingSlipContext);

    const onToggleWon = useCallback(() => {
        handleWonToggle(slip.id);
    }, [handleWonToggle, slip.id]);

    const onLoadSlip = useCallback(() => {
        loadSavedSlip(slip);
    }, [loadSavedSlip, slip]);

    const onDelete = useCallback(() => {
        handleDelete(slip.id);
    }, [handleDelete, slip.id]);

    return (
        <SavedSlipItem>
            <label>
                <input
                    type="checkbox"
                    checked={slip.isWon || false}
                    onChange={onToggleWon}
                />
                Won
            </label>
            <SlipName onClick={onLoadSlip} title="Click to load and edit this bet">
                Bets: {slip.bettingSlip?.length} || Stake: {slip.stake} || Odds: {slip.totalOdds.toFixed(2)} <br />
                Win: {slip.potentialWinnings.toFixed(2)}
            </SlipName>
            <DeleteButton onClick={onDelete} title="Delete slip">
                <FaTrash size={10} />
            </DeleteButton>
        </SavedSlipItem>
    );
});

const SavedBets = React.memo(() => {
    const { savedSlips } = useContext(BettingSlipContext);
    if (!savedSlips || savedSlips.length === 0) return null;
    return (
        <SavedSlipsContainer>
            {savedSlips.map((slip) => (
                <SavedBetItem key={slip.id} slip={slip} />
            ))}
        </SavedSlipsContainer>
    );
});

export default SavedBets;
