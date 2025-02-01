import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const usePredictionData = (prediction) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPredictionData = async () => {
        if (!prediction) return;

        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('Authentication token is missing.');
            }

            const response = await axios.get(
                `http://localhost:8080/fixture/id/info/${prediction.id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );

            const predictionData = response.data;

            const saveData = {
                homeTeamName: predictionData.homeTeamName || prediction.homeTeamName,
                awayTeamName: predictionData.awayTeamName || prediction.awayTeamName,
                ...predictionData,
            };

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

            toast.success('File generated successfully!', { position: 'top-center' });
        } catch (err) {
            console.error('Error in fetchPredictionData:', err);
            setError(err.response?.data || 'Failed to fetch or save prediction data. Please try again.');
            toast.error('Error generating file. Please try again.', { position: 'top-center' });
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, fetchPredictionData };
};

export default usePredictionData;
