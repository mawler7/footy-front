import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { useChartConfig } from '../common/utils';
import { PredictionContainer, Title, ChartWrapper, AdviceText, StyledRadar, } from '../../styles/match/PredictionStyles';
import 'react-toastify/dist/ReactToastify.css';
import usePredictionData from '../../hooks/matches/usePredictionData';
import { PredictButton } from "../../styles/buttons/buttons";
import { LoadingWrapper, Spinner } from '../../styles/GlobalStyles';
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const Prediction = ({ prediction, isBettingSlipOpen }) => {
    const { loading, fetchPredictionData } = usePredictionData(prediction);
    const { chartData, chartOptions } = useChartConfig(prediction);

    if (!prediction || loading) {
        return (
            <LoadingWrapper>
                <Spinner />
            </LoadingWrapper>
        );
    }

    return (
        <PredictionContainer >
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                theme="dark"
            />
            <PredictButton onClick={fetchPredictionData} disabled={loading}>
                {loading ? (
                    <>
                        <Spinner size="small" /> Generating...
                    </>
                ) : (
                    'Generate'
                )}
            </PredictButton>
            <Title>
                <AdviceText>{prediction.advice}</AdviceText>
            </Title>
            <ChartWrapper isBettingSlipOpen={isBettingSlipOpen}   >
                <StyledRadar data={chartData} options={chartOptions} />
            </ChartWrapper>
        </PredictionContainer >
    );
};

export default Prediction;
