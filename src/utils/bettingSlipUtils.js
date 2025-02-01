import { saveToLocalStorage } from "./localStorageUtils";

export const safeParseFloat = (value) => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
};

export const calculateBalance = (savedSlips = []) =>
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