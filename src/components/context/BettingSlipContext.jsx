import React, { createContext, useMemo, useState, useEffect, useCallback } from "react";


export const safeParseFloat = (value) => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
};

export const calculateBalance = (savedSlips) =>
    savedSlips.reduce((total, slip) => (slip.isWon ? total + parseFloat(slip.potentialWinnings || 0) : total), 0);

export const calculateMatchOdds = (bets) =>
    bets.reduce((total, bet) => total * (parseFloat(bet?.odd) || 1), 1);

export const calculateTotalOdds = (bettingSlip) =>
    bettingSlip.reduce(
        (total, match) => total * match.bets.reduce((subtotal, bet) => subtotal * (parseFloat(bet.odd) || 1), 1),
        1
    );

export const calculatePotentialWinnings = (stake = 0, totalOdds = 1, bonus = 0, isFreeBet = false) => {
    const multiplier = isFreeBet ? 1 : 0.88;
    if (isNaN(stake) || isNaN(totalOdds) || isNaN(bonus)) return 0;
    return Math.round(stake * totalOdds * (1 + bonus / 100) * multiplier);
};

export const isDuplicateBet = (prevSlip, newBet) => {
    const match = prevSlip.find((bet) => bet.matchInfo.id === newBet.matchInfo.id);
    if (!match) return false;
    return match.bets.some((bet) => bet.betName === newBet.betName);
};

export const saveSlip = (savedSlips, newSlip) => {
    const updatedSlips = [...savedSlips, newSlip];
    saveToLocalStorage("savedBettingSlips", updatedSlips);
    return updatedSlips;
};

export const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const loadFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};

export const betGroups = {
    main: [
        "Match Winner",
        "Total - Home",
        "Results/Both Teams Score",
        "To Score In Both Halves By Teams",
        "Team To Score First",
        "Home win both halves",
        "Away win both halves",
        "Win to Nil - Home",
        "Win to Nil - Away",
        "Win Both Halves",
        "Home team will score in both halves",
        "Away team will score in both halves",
    ],
    secondary: [
        "Double Chance",
        "Total - Away",
        "First Half Winner",
        "Second Half Winner",
        "Home Win/Under",
        "Away Win/Under",
        "Result/Total Goals",
    ],
    score: [
        "Both Teams Score",
        "Goals Over/Under",
        "Exact Score",
        "Anytime Goal Scorer",
        "Correct Score - First Half",
        "Correct Score - Second Half",
    ],
};

export const BettingSlipContext = createContext();

export const BettingSlipProvider = ({ children }) => {
    const [bettingSlip, setBettingSlip] = useState([]);
    const [savedSlips, setSavedSlips] = useState(() => loadFromLocalStorage("savedBettingSlips") || []);
    const [showBettingSlip, setShowBettingSlip] = useState(false);
    const [stake, setStake] = useState(0);
    const [bonus, setBonus] = useState(0);
    const [isFreeBet, setIsFreeBet] = useState(false);
    const [balance, setBalance] = useState(() => {
        return loadFromLocalStorage("balance") || calculateBalance(loadFromLocalStorage("savedBettingSlips") || []);
    });

    useEffect(() => {
        saveToLocalStorage("balance", balance);
    }, [balance]);
    const [showSavedBets, setShowSavedBets] = useState(false);

    const toggleSavedBets = useCallback(() => {
        setShowSavedBets((prev) => !prev);
    }, []);

    const loadSavedSlip = useCallback((slip) => {
        setBettingSlip(
            slip.bettingSlip.map((match) => ({
                ...match,
                bets: match.bets.map((bet) => ({
                    betName: bet.betName || "Unknown Bet",
                    value: bet.value || "Unknown Value",
                    odd: bet.odd || 1,
                })),
            }))
        );
        setStake(slip.stake || 0);
        setBonus(slip.bonus || 0);
        setIsFreeBet(false);
        setShowBettingSlip(true);
    }, []);

    useEffect(() => {
        if (savedSlips.some((slip) => slip.isWon)) {
            setBalance(calculateBalance(savedSlips));
        }
    }, [savedSlips]);

    const toggleBettingSlip = useCallback(() => {
        setShowBettingSlip((prev) => !prev);
    }, []);

    const addToBettingSlip = useCallback(
        (newBet) => {
            setBettingSlip((prevSlip) => {
                if (isDuplicateBet(prevSlip, newBet)) {
                    alert(`You cannot add the same bet (${newBet.betName} - ${newBet.value}) twice for the same match.`);
                    return prevSlip;
                }
                const updatedSlip = [...prevSlip];
                const matchIndex = updatedSlip.findIndex((bet) => bet.matchInfo.id === newBet.matchInfo.id);
                if (matchIndex !== -1) {
                    updatedSlip[matchIndex].bets.push(newBet);
                } else {
                    updatedSlip.push({
                        matchInfo: newBet.matchInfo,
                        bets: [
                            {
                                betName: newBet.betName,
                                value: newBet.value,
                                odd: newBet.odd,
                            },
                        ],
                    });
                }
                return updatedSlip;
            });
            if (!showBettingSlip) toggleBettingSlip();
        },
        [showBettingSlip, toggleBettingSlip]
    );

    const removeMatchFromBettingSlip = useCallback((matchIndex) => {
        setBettingSlip((prevSlip) => {
            const updatedSlip = [...prevSlip];
            updatedSlip.splice(matchIndex, 1);
            return updatedSlip;
        });
    }, []);

    const removeBetFromBettingSlip = useCallback((matchIndex, betIndex) => {
        setBettingSlip((prevSlip) => {
            const updatedSlip = [...prevSlip];
            const match = updatedSlip[matchIndex];

            if (match && match.bets.length > betIndex) {
                match.bets.splice(betIndex, 1);
            }

            if (match.bets.length === 0) {
                updatedSlip.splice(matchIndex, 1);
            }
            return updatedSlip;
        });
    }, []);


    const clearBettingSlip = useCallback(() => {
        setBettingSlip([]);
    }, []);

    const saveBettingSlip = useCallback(
        (newSlip) => {


            if (!isFreeBet) {
                setBalance((prevBalance) => prevBalance - safeParseFloat(stake));
            }

            setSavedSlips((prevSlips) => {
                const updatedSlips = [...prevSlips, newSlip];
                saveToLocalStorage("savedBettingSlips", updatedSlips);
                return updatedSlips;
            });

            clearBettingSlip();
            toggleSavedBets();
        },
        [clearBettingSlip, toggleSavedBets, isFreeBet, stake, balance]
    );

    const handleWonToggle = useCallback(
        (slipId) => {
            setSavedSlips((prevSlips) => {
                const updatedSlips = prevSlips.map((slip) =>
                    slip.id === slipId ? { ...slip, isWon: !slip.isWon } : slip
                );

                saveToLocalStorage("savedBettingSlips", updatedSlips);

                const toggledSlip = prevSlips.find((slip) => slip.id === slipId);

                if (!toggledSlip) return updatedSlips;

                setBalance((prevBalance) => {
                    let newBalance = prevBalance;

                    if (!toggledSlip.isWon) {
                        newBalance += safeParseFloat(toggledSlip.potentialWinnings) + safeParseFloat(toggledSlip.stake);
                    } else {
                        newBalance -= safeParseFloat(toggledSlip.potentialWinnings) + safeParseFloat(toggledSlip.stake);
                    }

                    return newBalance;
                });

                return updatedSlips;
            });
        },
        []
    );


    useEffect(() => {
        saveToLocalStorage("balance", balance);
    }, [balance]);


    const handleDelete = useCallback(
        (slipId) => {
            setSavedSlips((prevSlips) => {
                const updatedSlips = prevSlips.filter((slip) => slip.id !== slipId);
                saveToLocalStorage("savedBettingSlips", updatedSlips);
                setBalance(calculateBalance(updatedSlips));
                return updatedSlips;
            });
        },
        []
    );



    const handleOddsChange = useCallback(
        (matchIndex, betIndex, newOdd) => {
            setBettingSlip((prevSlip) => {
                const updatedSlip = [...prevSlip];
                if (!updatedSlip[matchIndex] || !updatedSlip[matchIndex].bets[betIndex]) {
                    console.error("Invalid match or bet index.");
                    return prevSlip;
                }
                updatedSlip[matchIndex].bets[betIndex].odd = parseFloat(newOdd) || 1;
                return updatedSlip;
            });
        },
        []
    );

    const contextValue = useMemo(() => ({
        showSavedBets,
        toggleSavedBets,
        bettingSlip,
        savedSlips,
        addToBettingSlip,
        removeMatchFromBettingSlip,
        removeBetFromBettingSlip,
        clearBettingSlip,
        saveBettingSlip,
        handleWonToggle,
        handleDelete,
        setBettingSlip,
        setSavedSlips,
        stake,
        setStake,
        bonus,
        setBonus,
        isFreeBet,
        setIsFreeBet,
        balance,
        showBettingSlip,
        toggleBettingSlip,
        handleOddsChange,
        loadSavedSlip,
        calculateTotalOdds: () => calculateTotalOdds(bettingSlip),
        calculatePotentialWinnings: () =>
            calculatePotentialWinnings(stake, calculateTotalOdds(bettingSlip), bonus, isFreeBet),
    }), [
        bettingSlip,
        savedSlips,
        showSavedBets,
        stake,
        bonus,
        isFreeBet,
        balance,
        showBettingSlip,
        addToBettingSlip,
        removeBetFromBettingSlip,
        removeMatchFromBettingSlip,
        clearBettingSlip,
        saveBettingSlip,
        handleWonToggle,
        handleDelete,
        toggleBettingSlip,
        handleOddsChange,
        loadSavedSlip,
        toggleSavedBets
    ]);

    return <BettingSlipContext.Provider value={contextValue}>{children}</BettingSlipContext.Provider>;
};
