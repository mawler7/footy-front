import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { useChartConfig } from '../../common/utils';
import { PredictionContainer, Title, ChartWrapper, AdviceText, StyledRadar, } from '../../../styles/match/PredictionStyles';
import 'react-toastify/dist/ReactToastify.css';
import usePredictionData from '../../../hooks/matches/usePredictionData';
import { PredictButton } from "../../../styles/buttons/buttons";
import { LoadingWrapper, Spinner } from '../../../styles/content/GlobalStyles';
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const Prediction = ({ prediction, isBettingSlipOpen }) => {
    const { loading, fetchPredictionData } = usePredictionData(prediction);
    const { chartData, chartOptions } = useChartConfig(prediction);

    const transformAdvice = (advice) => {
        if (!advice) return null;
        const prefixes = ["Double chance :", "Combo Double chance :", "Winner :", "Combo Winner :", "No predictions available"];
        const matchedPrefix = prefixes.find((prefix) => advice.startsWith(prefix));
        let cleanedAdvice = matchedPrefix ? advice.replace(matchedPrefix, "").trim() : advice;
        return cleanedAdvice.replace(/\bdraw\b/gi, "X").replace(/\band\b/gi, "&").replace(/\bgoals\b/gi, "").trim();
    };

    if (!prediction || loading) {
        return (
            <LoadingWrapper>
                <Spinner />
            </LoadingWrapper>
        );
    }

    return (
        <PredictionContainer>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar theme="dark" />
            <PredictButton onClick={fetchPredictionData} disabled={loading}>
                {loading ? (<><Spinner size="small" /> Generating...</>) : 'Generate'}
            </PredictButton>
            <Title>
                <AdviceText>{transformAdvice(prediction.advice)}</AdviceText>
                <ChartWrapper $isBettingSlipOpen={isBettingSlipOpen}>
                    <StyledRadar data={chartData} options={chartOptions} />
                </ChartWrapper>
            </Title>
        </PredictionContainer>
    );
};

export default Prediction;
