export const cleanAdvice = (advice) => {
    if (!advice) return null;

    const prefixes = [
        "Double chance :",
        "Combo Double chance :",
        "Winner :",
        "Combo Winner :",
        "No predictions available",
    ];

    const matchedPrefix = prefixes.find((prefix) => advice.startsWith(prefix));
    let cleanedAdvice = matchedPrefix
        ? advice.replace(matchedPrefix, "").trim()
        : advice;

    cleanedAdvice = cleanedAdvice
        .replace(/\bdraw\b/gi, "X")
        .replace(/\band\b/gi, "&")
        .replace(/\bgoals\b/gi, "");

    return cleanedAdvice.trim();
};

export const validateHomePrediction = (homePrediction, home, status) => {
    if (!homePrediction || status !== "FT") return false;

    const isOver = homePrediction.startsWith("+");
    const isUnder = homePrediction.startsWith("-");
    const threshold = parseFloat(homePrediction.substring(1));
    const maxGoals = isUnder ? Math.floor(threshold) : Math.ceil(threshold);

    return isOver ? home >= maxGoals : home <= maxGoals;
};

export const validateAwayPrediction = (awayPrediction, away, status) => {
    if (!awayPrediction || status !== "FT") return false;

    const isOver = awayPrediction.startsWith("+");
    const isUnder = awayPrediction.startsWith("-");
    const threshold = parseFloat(awayPrediction.substring(1));
    const maxGoals = isUnder ? Math.floor(threshold) : Math.ceil(threshold);
    return isOver ? away >= maxGoals : away <= maxGoals;
};

export const validateUnderOver = (underOver, home, away, status) => {
    if (!underOver || status !== "FT") return false;

    const totalGoals = home + away;
    const threshold = parseFloat(underOver.substring(1));
    const roundedThreshold = underOver.startsWith("-") ? Math.floor(threshold) : Math.ceil(threshold);


    return (
        (underOver.startsWith("+") && totalGoals >= roundedThreshold) ||
        (underOver.startsWith("-") && totalGoals <= roundedThreshold)
    );
};

export const validateAdvice = (advice, home, away, homeTeamName, awayTeamName, status) => {
    if (!advice || home === null || away === null || status !== 'FT') {
        return false;
    }

    const isDraw = home === away;

    if (advice.startsWith("Winner :")) {
        const [, winnerTeam] = advice.split(":").map((str) => str.trim());
        return (
            (winnerTeam === homeTeamName && home > away) ||
            (winnerTeam === awayTeamName && away > home)
        );
    }

    if (advice.startsWith("Double chance :")) {
        const [, options] = advice.split(":").map((str) => str.trim());
        const [team1, team2] = options.split(" or ").map((str) => str.trim());

        return (
            (team1 === "draw" ? isDraw : team1 === homeTeamName && home >= away) ||
            (team2 === "draw" ? isDraw : team2 === awayTeamName && away >= home)
        );
    }

    if (advice.startsWith("Combo Double chance")) {
        const [, conditions] = advice.split(":").map((str) => str.trim());
        const [mainCondition, goalCondition] = conditions.split("and").map((str) => str.trim());

        const isMainConditionValid = validateAdvice(
            `Double chance : ${mainCondition}`,
            home,
            away,
            homeTeamName,
            awayTeamName,
            status
        );

        const isGoalConditionValid = validateUnderOver(goalCondition, home, away, status);

        return isMainConditionValid && isGoalConditionValid;
    }

    if (advice.startsWith("Combo Winner :")) {
        const [, conditions] = advice.split(":").map((str) => str.trim());
        const [winnerTeam, goalCondition] = conditions.split("and").map((str) => str.trim());

        const isWinnerValid = validateAdvice(
            `Winner : ${winnerTeam}`,
            home,
            away,
            homeTeamName,
            awayTeamName,
            status
        );

        const isGoalConditionValid = validateUnderOver(goalCondition, home, away, status);

        return isWinnerValid && isGoalConditionValid;
    }

    return false;
};