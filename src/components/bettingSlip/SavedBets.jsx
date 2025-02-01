import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { BettingSlipContext } from "../context/BettingSlipContext";
import {
    SavedSlipsContainer,
    SavedSlipItem,
    SlipName,
    DeleteButton,
} from "../../styles/bettingSlip/BettingSlipStyles";

const SavedBets = () => {
    const { savedSlips, handleDelete, handleWonToggle, loadSavedSlip } = useContext(BettingSlipContext);

    if (!savedSlips || savedSlips.length === 0) {
        return;
    }

    return (
        <SavedSlipsContainer>
            {savedSlips.map((slip) => (
                <SavedSlipItem key={slip.id}>
                    <label>
                        <input
                            type="checkbox"
                            checked={slip.isWon || false}
                            onChange={() => handleWonToggle(slip.id)}
                        />
                        Won
                    </label>
                    <SlipName
                        title="Click to load and edit this bet"
                        onClick={() => loadSavedSlip(slip)}>
                        Bets: {slip.bettingSlip?.length} || Stake: {slip.stake} || Odds: {slip.totalOdds.toFixed(2)} <br />
                        Win: {slip.potentialWinnings.toFixed(2)}
                    </SlipName>
                    <DeleteButton onClick={() => handleDelete(slip.id)} title="Delete slip">
                        <FaTrash />
                    </DeleteButton>
                </SavedSlipItem>
            ))}
        </SavedSlipsContainer>
    );
};

export default SavedBets;
