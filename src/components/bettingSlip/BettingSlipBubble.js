import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaTrashAlt, FaTimes } from "react-icons/fa";
import {
    BonusInput, BubbleButtonGroup, BubbleContainer, BubbleContent, BubbleHeader,
    BubbleItem, BubbleRowWrapper, EditableInput,
    EditableRow, Label, OddsInput, PotentialWinnings, SavedSlipItem, SavedSlipsContainer,
    StakeInput, TeamNames, TotalOdds, BubbleContainerWrapper
} from "../../styles/bettingSlip/BettingSlipStyles";
import { ActionButton, CloseButton, DeleteBetButton, DeleteButton, SavedSlipsToggleButton } from "../../styles/buttons/buttons";

const BettingSlipBubble = ({ bettingSlip = [], setBettingSlip, showBubble, setShowBubble }) => {
    const [stake, setStake] = useState(0);
    const [bonus, setBonus] = useState(0);
    const [savedSlips, setSavedSlips] = useState([]);
    const [isSavedSlipsOpen, setIsSavedSlipsOpen] = useState(false);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const savedSlipsFromStorage = localStorage.getItem("savedBettingSlips");
        if (savedSlipsFromStorage) {
            const parsedSlips = JSON.parse(savedSlipsFromStorage).map((slip) => ({
                ...slip,
                isWon: slip.isWon || false,
            }));
            setSavedSlips(parsedSlips);
        }
    }, []);

    const calculateTotalOdds = () => {
        if (!bettingSlip.length) return "1.00";

        const totalOdds = bettingSlip.reduce((acc, bet) => acc * (parseFloat(bet.odd) || 1), 1);
        return totalOdds.toFixed(2);
    };

    const calculatePotentialWinnings = () => {
        if (stake <= 0) return "0.00";
        const totalOdds = parseFloat(calculateTotalOdds());
        const potentialWinnings = stake * totalOdds * 0.88 * (1 + bonus / 100);
        return potentialWinnings.toFixed(2);
    };

    const calculateBalance = () => {
        let winnings = 0;
        let totalStake = 0;

        bettingSlip.forEach((bet) => {
            if (bet.isWon) {
                const totalOdds = parseFloat(bet.odd || 1);
                winnings += bet.stake * totalOdds * 0.88 * (1 + bonus / 100);
            }
            totalStake += bet.stake || 0;
        });

        savedSlips.forEach((slip) => {
            if (slip.isWon) {
                winnings += parseFloat(slip.potentialWinnings) || 0;
            }
            totalStake += parseFloat(slip.stake) || 0;
        });

        return (winnings - totalStake).toFixed(2);
    };

    useEffect(() => {
        setBalance(calculateBalance());
    }, [bettingSlip, savedSlips]);

    const handleRemoveBet = (index) => {
        const updatedSlip = bettingSlip.filter((_, i) => i !== index);
        setBettingSlip(updatedSlip);
    };

    const saveBettingSlip = () => {
        if (!bettingSlip.length) {
            alert("Cannot save an empty betting slip.");
            return;
        }

        const slipName = `${new Date().toISOString().split("T")[0]} - Odds: ${calculateTotalOdds()}, Stake: ${stake} PLN, Winnings: ${calculatePotentialWinnings()} PLN`;
        const newSlip = {
            id: new Date().getTime(),
            name: slipName,
            bettingSlip: bettingSlip.map((bet) => ({
                ...bet,
                isWon: bet.isWon || false,
                stake: stake,
                potentialWinnings: calculatePotentialWinnings(),
            })),
            stake,
            totalOdds: calculateTotalOdds(),
            potentialWinnings: calculatePotentialWinnings(),
        };

        const updatedSlips = [...savedSlips, newSlip];
        setSavedSlips(updatedSlips);
        localStorage.setItem("savedBettingSlips", JSON.stringify(updatedSlips));

        setBettingSlip([]);
        setStake(0);
        setBonus(0);

        alert("Betting slip saved and cleared!");
    };

    const handleWonToggle = (slipId) => {
        const updatedSlips = savedSlips.map((slip) =>
            slip.id === slipId
                ? { ...slip, isWon: !slip.isWon }
                : slip
        );
        setSavedSlips(updatedSlips);
        localStorage.setItem("savedBettingSlips", JSON.stringify(updatedSlips));
        setBalance(calculateBalance());
    };

    return (
        <BubbleContainerWrapper>
            {showBubble && (
                <BubbleContainer>
                    <BubbleHeader>
                        <div>
                            <strong> </strong> {balance} PLN
                        </div>
                        <SavedSlipsToggleButton onClick={() => setIsSavedSlipsOpen(!isSavedSlipsOpen)}>
                            {isSavedSlipsOpen ? <FaChevronUp /> : <FaChevronDown />}
                            <span style={{ marginLeft: "8px" }}>My Bets</span>
                        </SavedSlipsToggleButton>
                        <CloseButton onClick={() => setShowBubble(false)}>X</CloseButton>
                    </BubbleHeader>
                    {isSavedSlipsOpen && savedSlips.length > 0 && (
                        <SavedSlipsContainer>
                            {savedSlips.map((slip) => (
                                <SavedSlipItem key={slip.id}>
                                    <label style={{ marginRight: "8px" }}>
                                        <input
                                            type="checkbox"
                                            checked={slip.isWon}
                                            onChange={() => handleWonToggle(slip.id)}
                                        />
                                        Won
                                    </label>
                                    <span>{slip.name}</span>
                                    <DeleteButton
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const filteredSlips = savedSlips.filter((s) => s.id !== slip.id);
                                            setSavedSlips(filteredSlips);
                                            localStorage.setItem("savedBettingSlips", JSON.stringify(filteredSlips));
                                        }}
                                    >
                                        <FaTrashAlt />
                                    </DeleteButton>
                                </SavedSlipItem>
                            ))}
                        </SavedSlipsContainer>
                    )}
                    <BubbleContent>
                        {bettingSlip.map((bet, index) => (
                            <BubbleItem key={index}>
                                <DeleteBetButton onClick={() => handleRemoveBet(index)}>
                                    <FaTimes size={10} />
                                </DeleteBetButton>
                                <TeamNames>
                                    {bet.matchInfo
                                        ? `${bet.matchInfo.homeTeamName} vs ${bet.matchInfo.awayTeamName}`
                                        : "Unknown Team"}
                                </TeamNames>
                                <EditableRow>
                                    <EditableInput
                                        type="text"
                                        value={bet.betName || ""}
                                        onChange={(e) => {
                                            const updatedSlip = [...bettingSlip];
                                            updatedSlip[index] = { ...updatedSlip[index], betName: e.target.value };
                                            setBettingSlip(updatedSlip);
                                        }}
                                    />
                                    <EditableInput
                                        type="text"
                                        value={bet.value || ""}
                                        onChange={(e) => {
                                            const updatedSlip = [...bettingSlip];
                                            updatedSlip[index] = { ...updatedSlip[index], value: e.target.value };
                                            setBettingSlip(updatedSlip);
                                        }}
                                    />
                                </EditableRow>
                                <OddsInput
                                    type="number"
                                    step="0.01"
                                    value={bet.odd || 1}
                                    onChange={(e) => {
                                        const updatedSlip = [...bettingSlip];
                                        updatedSlip[index] = { ...updatedSlip[index], odd: parseFloat(e.target.value) || 1 };
                                        setBettingSlip(updatedSlip);
                                    }}
                                />
                            </BubbleItem>
                        ))}
                        <BubbleRowWrapper>
                            <BubbleItem>
                                <Label>Bonus:</Label>
                                <BonusInput
                                    type="number"
                                    value={bonus}
                                    onChange={(e) => setBonus(Math.max(0, parseFloat(e.target.value) || 0))}
                                />
                            </BubbleItem>
                            <BubbleItem>
                                <Label>Stake:</Label>
                                <StakeInput
                                    type="number"
                                    step="10"
                                    value={stake}
                                    onChange={(e) => setStake(Math.max(0, parseFloat(e.target.value) || 0))}
                                />
                            </BubbleItem>
                        </BubbleRowWrapper>
                        <TotalOdds>Total Odds: {calculateTotalOdds()}</TotalOdds>
                        <PotentialWinnings>
                            Potential Winnings: {calculatePotentialWinnings()} PLN
                        </PotentialWinnings>
                        <BubbleButtonGroup>
                            <ActionButton onClick={() => setBettingSlip([])}>Clear</ActionButton>
                            <ActionButton onClick={saveBettingSlip} disabled={!bettingSlip.length}>
                                Save
                            </ActionButton>
                        </BubbleButtonGroup>
                    </BubbleContent>
                </BubbleContainer>
            )}
        </BubbleContainerWrapper>
    );
};

export default BettingSlipBubble;
