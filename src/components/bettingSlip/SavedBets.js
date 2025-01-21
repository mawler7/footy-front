import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import {
    SavedSlipsContainer,
    SavedSlipItem,
    SlipName,
    DeleteButton,
} from "../../styles/bettingSlip/BettingSlipStyles";
import { BettingSlipContext } from "../context/BettingSlipContext";

const SavedBets = () => {
    const { savedSlips, handleWonToggle, loadSavedSlip, setSavedSlips } = useContext(BettingSlipContext);

    if (!savedSlips || savedSlips.length === 0) {
        return;
    }

    const handleDelete = (slipId) => {
        const updatedSlips = savedSlips.filter((s) => s.id !== slipId);
        setSavedSlips(updatedSlips);
        localStorage.setItem("savedBettingSlips", JSON.stringify(updatedSlips));
    };

    console.log(savedSlips);

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
                    <SlipName onClick={() => loadSavedSlip(slip)}>
                        Bets: {slip.bettingSlip?.length} <tb />
                        || Stake: {slip.stake} <tb />
                        || Odds: {slip.totalOdds} <br />
                        Win: {slip.potentialWinnings}
                    </SlipName>
                    <DeleteButton onClick={() => handleDelete(slip.id)}>
                        <FaTrash />
                    </DeleteButton>
                </SavedSlipItem>
            ))}
        </SavedSlipsContainer>
    );
};

export default SavedBets;
