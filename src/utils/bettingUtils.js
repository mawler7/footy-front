export const calculateTotalOdds = (bettingSlip) => {
    return bettingSlip.reduce(
        (acc, match) =>
            acc *
            match.bets.reduce((matchAcc, bet) => matchAcc * (parseFloat(bet.odd) || 1), 1),
        1
    ).toFixed(2);
};

export const calculatePotentialWinnings = (stake, odds, bonus) => {
    return (stake * odds * 0.88 * (1 + bonus / 100)).toFixed(2);
};

export const calculateBalance = (savedSlips) => {
    const winnings = savedSlips.reduce(
        (total, slip) => (slip.isWon ? total + parseFloat(slip.potentialWinnings || 0) : total),
        0
    );

    const stakes = savedSlips.reduce(
        (total, slip) => (slip.isFreeBet ? total : total + parseFloat(slip.stake || 0)),
        0
    );

    return (winnings - stakes).toFixed(2);
};

export const calculateMatchOdds = (bets) =>
    bets.reduce((total, bet) => total * (parseFloat(bet?.odd) || 1), 1);

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

export const saveSlip = (savedSlips, newSlip) => {
    const updatedSlips = [...savedSlips, newSlip];
    localStorage.setItem("savedBettingSlips", JSON.stringify(updatedSlips));
    return updatedSlips;
};

export const deleteSlip = (savedSlips, slipId) => {
    const updatedSlips = savedSlips.filter((s) => s.id !== slipId);
    localStorage.setItem("savedBettingSlips", JSON.stringify(updatedSlips));
    return updatedSlips;
};

