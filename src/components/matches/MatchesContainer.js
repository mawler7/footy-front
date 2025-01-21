import React, { useState } from "react";
import MatchComponent from "./MatchComponent";

const MatchesContainer = ({ matches, handleMatchClick, toggleFavorite, favorites }) => {
    const [totalPredictions, setTotalPredictions] = useState(0);
    const [correctPredictions, setCorrectPredictions] = useState(0);

    const handlePredictionValidation = (isValid) => {
        setTotalPredictions((prev) => prev + 1);
        if (isValid) setCorrectPredictions((prev) => prev + 1);
    };

    return (
        <div>
            <div>
                Total Predictions: {totalPredictions} | Correct Predictions: {correctPredictions}
            </div>

            {matches.map((match) => (
                <MatchComponent
                    key={match.id}
                    match={match}
                    handleMatchClick={handleMatchClick}
                    toggleFavorite={toggleFavorite}
                    favorites={favorites}
                    onPredictionValidation={handlePredictionValidation}
                />
            ))}
        </div>
    );
};

export default MatchesContainer;
