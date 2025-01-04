import { useState, useEffect } from 'react';
import axios from 'axios';

const useH2HData = (homeTeamId, awayTeamId) => {
    const [h2hData, setH2HData] = useState({ lastHomeMatches: [], lastAwayMatches: [], headToHeadMatches: [] });
    const [isLoading, setIsLoading] = useState(true); // Default to true
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!homeTeamId || !awayTeamId) return; // Avoid fetching if IDs are missing

        const fetchH2HData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get(
                    `http://localhost:8080/fixture/h2h/${homeTeamId}/${awayTeamId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true,
                    }
                );

                setH2HData(response.data || { lastHomeMatches: [], lastAwayMatches: [], headToHeadMatches: [] });
            } catch (err) {
                setError(err.message || 'Failed to fetch H2H data.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchH2HData();
    }, [homeTeamId, awayTeamId]);

    return { h2hData, isLoading, error };
};

export default useH2HData;
