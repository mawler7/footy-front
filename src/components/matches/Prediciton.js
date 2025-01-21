import React, { useMemo } from "react";
import { PredictionText, PredictionContainer } from "../../styles/match/MatchComponentStyles";
import {
    cleanAdvice,
    validateAdvice,
    validateAwayPrediction,
    validateHomePrediction,
    validateUnderOver
} from "../../utils/predictionsValidator";

const processPredictions = (advice, homePrediction, awayPrediction, underOver, homeTeam, home, away, awayTeam, status) => [
    {
        text: advice ? cleanAdvice(advice) : null,
        isValid: validateAdvice(advice, home, away, homeTeam, awayTeam, status),
    },
    {
        text: homePrediction ? `${homeTeam}: ${homePrediction}` : null,
        isValid: validateHomePrediction(homePrediction, home, status),
    },
    {
        text: awayPrediction ? `${awayTeam}: ${awayPrediction}` : null,
        isValid: validateAwayPrediction(awayPrediction, away, status),
    },
    {
        text: underOver ? `Over/Under: ${underOver}` : null,
        isValid: validateUnderOver(underOver, home, away, status),
    },
].filter(({ text }) => text !== null);

const Prediction = ({
    advice,
    homePrediction,
    awayPrediction,
    underOver,
    homeTeam,
    home,
    away,
    awayTeam,
    status,
}) => {
    const filteredPredictions = useMemo(
        () => (advice || homePrediction || awayPrediction || underOver)
            ? processPredictions(advice, homePrediction, awayPrediction, underOver, homeTeam, home, away, awayTeam, status)
            : [],
        [advice, homePrediction, awayPrediction, underOver, home, away, homeTeam, awayTeam, status]
    );

    if (!filteredPredictions.length) return null;

    return (
        <PredictionContainer>
            {filteredPredictions.length > 0 ? (
                filteredPredictions.map(({ text, isValid }, index) => (
                    <PredictionText key={index} className={isValid ? "valid" : "invalid"}>
                        {text}
                    </PredictionText>
                ))
            ) : (
                <PredictionText></PredictionText>
            )}
        </PredictionContainer>
    );
};

export default Prediction;
