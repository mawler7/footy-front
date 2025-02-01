import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../context/useAuth';

const useTopScorers = (leagueId) => {
    const { isLoggedIn } = useAuth();
    const [topScorers, setTopScorers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isLoggedIn || !leagueId) return;

        const fetchTopScorers = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('authToken');
                const { data } = await axios.get(
                    `http://localhost:8080/player/top-scorers?leagueId=${leagueId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true,
                    }
                );
                if (Array.isArray(data)) {
                    setTopScorers(data);
                } else {
                    console.error('Invalid data format: expected an array', data);
                    setTopScorers([]);
                }
            } catch (err) {
                console.error('Error fetching top scorers:', err);
                setError(err.message || 'Failed to fetch top scorers');
            } finally {
                setLoading(false);
            }
        };

        fetchTopScorers();
    }, [isLoggedIn, leagueId]);

    return { topScorers, loading, error };
};

export default useTopScorers;
