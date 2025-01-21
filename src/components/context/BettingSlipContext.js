import React, { createContext, useState, useCallback, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { calculateBalance, calculatePotentialWinnings, calculateTotalOdds } from "../../utils/bettingUtils";
import { loadFromLocalStorage, saveToLocalStorage } from "../../utils/localStorageUtils";
import { saveSlip } from "../../utils/bettingUtils";
export const BettingSlipContext = createContext();

export const BettingSlipProvider = ({ children }) => {
    const [bettingSlip, setBettingSlip] = useState([]);
    const [savedSlips, setSavedSlips] = useState([]);
    const [stake, setStake] = useState(0);
    const [bonus, setBonus] = useState(0);
    const [isFreeBet, setIsFreeBet] = useState(false);
    const [balance, setBalance] = useState(0);
    const [showBettingSlip, setShowBettingSlip] = useState(false);
    const [showSavedBets, setShowSavedBets] = useState(false);
    const [isAdminView, setIsAdminView] = useState(false);

    const toggleAdminView = useCallback(() => {
        setIsAdminView((prev) => !prev);
    }, []);

    useEffect(() => {
        const savedSlipsFromStorage = loadFromLocalStorage("savedBettingSlips");
        if (savedSlipsFromStorage && Array.isArray(savedSlipsFromStorage)) {
            setSavedSlips(savedSlipsFromStorage);
        }
    }, []);

    useEffect(() => {
        setBalance(calculateBalance(savedSlips));
    }, [savedSlips]);

    const isDuplicateBet = (prevSlip, newBet) => {
        const match = prevSlip.find((bet) => bet.matchInfo.id === newBet.matchInfo.id);
        if (!match) return false;
        return match.bets.some((bet) => bet.betName === newBet.betName);
    };

    const addToBettingSlip = useCallback((newBet) => {
        if (!newBet.matchInfo || !newBet.matchInfo.id) {
            console.error("Invalid matchInfo:", newBet.matchInfo);
            alert("Cannot add bet: match information is missing or incomplete.");
            return;
        }

        setBettingSlip((prevSlip) => {
            if (isDuplicateBet(prevSlip, newBet)) {
                alert(
                    `You cannot add the same bet (${newBet.betName} - ${newBet.value}) twice for the same match.`
                );
                return prevSlip;
            }

            const matchIndex = prevSlip.findIndex(
                (bet) => bet.matchInfo.id === newBet.matchInfo.id
            );

            if (matchIndex !== -1) {
                const existingMatch = prevSlip[matchIndex];
                const updatedMatch = {
                    ...existingMatch,
                    bets: [...existingMatch.bets, { betName: newBet.betName, value: newBet.value, odd: newBet.odd }],
                };

                const updatedSlip = [...prevSlip];
                updatedSlip[matchIndex] = updatedMatch;
                return updatedSlip;
            }

            return [
                ...prevSlip,
                {
                    matchInfo: newBet.matchInfo,
                    bets: [{ betName: newBet.betName, value: newBet.value, odd: newBet.odd }],
                },
            ];
        });

        setShowBettingSlip(true);
    }, []);

    const removeFromBettingSlip = useCallback((matchIndex, betIndex) => {
        setBettingSlip((prevSlip) => {
            const updatedSlip = [...prevSlip];
            const match = updatedSlip[matchIndex];

            match.bets.splice(betIndex, 1);

            if (match.bets.length === 0) {
                updatedSlip.splice(matchIndex, 1);
            }

            return updatedSlip;
        });
    }, []);

    const clearBettingSlip = useCallback(() => {
        setBettingSlip([]);
    }, []);

    const saveBettingSlip = useCallback(() => {
        if (!bettingSlip.length) {
            alert("No bets to save!");
            return;
        }

        const totalOdds = calculateTotalOdds(bettingSlip);
        const potentialWinnings = calculatePotentialWinnings(stake, totalOdds, bonus);

        const newSlip = {
            id: uuidv4(),
            bettingSlip,
            stake,
            bonus,
            isFreeBet,
            totalOdds,
            potentialWinnings,
        };

        const updatedSlips = saveSlip(savedSlips, newSlip);
        setSavedSlips(updatedSlips);
        setShowSavedBets(true);
        clearBettingSlip();
    }, [bettingSlip, stake, bonus, isFreeBet, savedSlips, clearBettingSlip]);

    const toggleBettingSlip = useCallback(() => {
        setShowBettingSlip((prev) => !prev);
    }, []);

    const handleWonToggle = useCallback((slipId) => {
        setSavedSlips((prevSlips) => {
            const updatedSlips = prevSlips.map((slip) =>
                slip.id === slipId ? { ...slip, isWon: !slip.isWon } : slip
            );

            saveToLocalStorage("savedBettingSlips", updatedSlips);
            return updatedSlips;
        });
    }, []);

    const toggleSavedSlips = useCallback(() => {
        setShowSavedBets((prev) => !prev);
    }, []);

    const loadSavedSlip = useCallback((savedSlip) => {
        setBettingSlip(savedSlip.bettingSlip || []);
        setStake(savedSlip.stake || 0);
        setBonus(savedSlip.bonus || 0);
        setIsFreeBet(savedSlip.isFreeBet || false);
        setShowSavedBets(false);
    }, []);

    const contextValue = useMemo(
        () => ({
            bettingSlip,
            setBettingSlip,
            savedSlips,
            stake,
            bonus,
            isFreeBet,
            balance,
            showBettingSlip,
            showSavedBets,
            addToBettingSlip,
            removeFromBettingSlip,
            clearBettingSlip,
            saveBettingSlip,
            handleWonToggle,
            toggleBettingSlip,
            toggleSavedSlips,
            loadSavedSlip,
            setStake,
            setBonus,
            setIsFreeBet,
            setSavedSlips,
            setShowSavedBets,
            isAdminView,
            toggleAdminView
        }),
        [
            bettingSlip,
            savedSlips,
            stake,
            bonus,
            isFreeBet,
            balance,
            showBettingSlip,
            showSavedBets,
            addToBettingSlip,
            removeFromBettingSlip,
            clearBettingSlip,
            saveBettingSlip,
            handleWonToggle,
            toggleBettingSlip,
            toggleSavedSlips,
            loadSavedSlip,
            setStake,
            setBonus,
            setIsFreeBet,
            setSavedSlips,
            setShowSavedBets,
            isAdminView,
            toggleAdminView
        ]
    );



    return (
        <BettingSlipContext.Provider value={contextValue}>
            {children}
        </BettingSlipContext.Provider>
    );
};
