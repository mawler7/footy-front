import { useState, useEffect } from 'react';
import axios from 'axios';


export const useFetchMatches = (selectedDate) => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatchesForDate = async () => {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            setLoading(true);
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    throw new Error("No auth token found.");
                }
                const response = await axios.get(`http://localhost:8080/fixture/${formattedDate}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });

                const matchesData = (response.data || []).filter(
                    (match) => match.leagueId && match.leagueName && match.leagueLogo
                );
                setMatches(matchesData);
                setError(null);
            } catch (error) {
                setError('Failed to fetch matches for the selected date.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (selectedDate) {
            fetchMatchesForDate();
        }
    }, [selectedDate]);


    return { matches, loading, error };
};

