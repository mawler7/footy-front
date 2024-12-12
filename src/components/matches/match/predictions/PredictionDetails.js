import React, { useState } from 'react';
import axios from 'axios';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';
import BaseButton from '../../../common/BaseButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const parsePercentage = (value) => {
    if (typeof value === 'string' && value.includes('%')) {
        const parsedValue = parseFloat(value.replace('%', '').trim());
        return isNaN(parsedValue) ? 0 : parsedValue;
    }
    return parseFloat(value) || 0;
};

const PredictionDetails = ({ prediction }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fetchedPrediction, setFetchedPrediction] = useState(null);


    const fetchPredictionData = async () => {
        if (!prediction) return;
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('authToken');

            // Fetch prediction data
            const response = await axios.get(
                `http://localhost:8080/fixture/id/info/${prediction.id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );

            const predictionData = response.data;

            // Ensure required fields are included in the payload
            const saveData = {
                homeTeamName: predictionData.homeTeamName || prediction.homeTeamName,
                awayTeamName: predictionData.awayTeamName || prediction.awayTeamName,
                ...predictionData,
            };

            // Save prediction data
            await axios.post(
                `http://localhost:8080/fixture/savePrediction`,
                saveData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            // Show success notification
            toast.success('File generated successfully!', {
                position: 'top-center',
            });
        } catch (err) {
            console.error('Error fetching or saving prediction data:', err);
            setError(err.response?.data || 'Failed to fetch or save prediction data. Please try again.');
            toast.error('Error generating file. Please try again.', {
                position: 'top-center',
            });
        } finally {
            setLoading(false);
        }
    };


    if (!prediction) return null;

    const homeData = [
        parsePercentage(prediction.homeForm),
        parsePercentage(prediction.homeAtt),
        parsePercentage(prediction.homeDef),
        parsePercentage(prediction.homeGoalsComparison),
        parsePercentage(prediction.homeTotalComparison),
    ];

    const awayData = [
        parsePercentage(prediction.awayForm),
        parsePercentage(prediction.awayAtt),
        parsePercentage(prediction.awayDef),
        parsePercentage(prediction.awayGoalsComparison),
        parsePercentage(prediction.awayTotalComparison),
    ];

    const data = {
        labels: ['Form', 'Attack', 'Defense', 'Goals Comparison', 'Total Comparison'],
        datasets: [
            {
                label: prediction.homeTeamName,
                data: homeData,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
            },
            {
                label: prediction.awayTeamName,
                data: awayData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`,
                },
            },
            legend: {
                display: true,
                labels: {
                    color: '#ffffff',
                    font: { size: 14 },
                },
            },
        },
        scales: {
            r: {
                angleLines: { color: '#34495e' },
                grid: { color: '#2e2e2e' },
                ticks: {
                    beginAtZero: true,
                    max: 100,
                    stepSize: 20,
                    color: '#ffffff',
                },
                pointLabels: {
                    color: '#b5b5b5',
                    font: { size: 12 },
                },
            },
        },
    };

    return (
        <PredictionContainer>
            <ToastContainer />
            <ButtonGroup>
                <PredictButton onClick={fetchPredictionData} disabled={loading}>
                    Generate
                </PredictButton>
            </ButtonGroup>
            <Title><AdviceText>{prediction.advice}</AdviceText></Title>
            <ChartWrapper>
                <Radar data={data} options={options} />
            </ChartWrapper>
        </PredictionContainer>
    );
};

export default PredictionDetails;


export const PredictButton = styled(BaseButton)`
  background: ${({ $isActive }) => ($isActive ? 'rgb(45, 50, 52)' : 'rgba(68, 76, 78, 0.7)')};
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#d0d4d6')};
  border: ${({ $isActive }) => ($isActive ? '2px solid rgb(35, 40, 42)' : '1px solid rgba(68, 76, 78, 0.5)')};
  border-radius: 6px;
  width: 122px;
  height: 26px;
  padding: 6px 14px;
 font-weight: 600;
  font-size: 0.67rem;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.2s ease;
  box-shadow: ${({ $isActive }) => ($isActive ? '0 4px 8px rgba(35, 40, 42, 0.5)' : 'none')};

  &:hover {
    background: ${({ $isActive }) => ($isActive ? 'rgb(85, 94, 97)' : 'rgb(58, 63, 65)')};
    color: #ffffff;
    box-shadow: ${({ $isActive }) => ($isActive ? '0 4px 8px rgba(85, 94, 97, 0.54)' : '0 3px 6px rgba(68, 76, 78, 0.75)')};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(85, 94, 97, 0.6);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const ButtonGroup = styled.div`
        display: flex;
 gap: 2px;
         margin-bottom: 10px;
      `;

const PredictionContainer = styled.div`
    padding: 20px;
  background-color: rgba(28, 30, 36, 0.85);
   border-radius: 10px;
    color: #ffffff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    margin-top: 20px;
 
 
    width: 100%;
    height: 100%;
    max-width: 650px;
`;

const ChartWrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 600px;
    height: 440px; /* Możesz dostosować wysokość według potrzeb */
    margin: 0 auto;
`;

const Title = styled.h3`
    text-align: center;
    color: #ffffff;
    font-size: 18px;
    margin-bottom: 15px;
`;

const AdviceText = styled.span`
    display: block;
    font-size: 14px;
    color: #f0f0f0;
    font-weight: bold;
    margin-top: 5px;
`;