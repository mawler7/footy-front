import React, { useMemo } from "react";
import { PredictionText, PredictionContainer } from "../../styles/match/MatchComponentStyles";
import { processPredictions } from "../../utils/predictionsUtils";

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
                    <PredictionText key={index} className={isValid ? "valid" : ""}>
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
