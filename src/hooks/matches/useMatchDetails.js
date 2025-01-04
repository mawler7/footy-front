import { useState, useEffect } from 'react';
import axios from 'axios';

const useMatchDetails = (id, isLoggedIn) => {
    const [match, setMatch] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatchDetails = async () => {
            if (!isLoggedIn) return;

            setIsLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get(`http://localhost:8080/fixture/id/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });
                setMatch(response.data);
            } catch (err) {
                setError(err.message || "Failed to fetch match details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchMatchDetails();
    }, [id, isLoggedIn]);

    return { match, isLoading, error };
};

export default useMatchDetails;
