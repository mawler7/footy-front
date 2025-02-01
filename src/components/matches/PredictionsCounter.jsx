import React from "react";
import { PredictionsCounterWrapper } from "../../styles/content/AppContentStyles";

const PredictionsCounter = ({ truePredictions, totalPredictions }) => {
    const percentage = totalPredictions ? ((truePredictions / totalPredictions) * 100).toFixed(2) : 0;

    return (
        <PredictionsCounterWrapper>
            {truePredictions}/{totalPredictions} ({percentage}%)
        </PredictionsCounterWrapper>
    );
};

export default PredictionsCounter;
