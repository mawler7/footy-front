import { useState, useEffect } from 'react';
import axios from 'axios';

const useLeagueData = (leagueId) => {
    const [leagueInfo, setLeagueInfo] = useState(null);
    const [completedMatches, setCompletedMatches] = useState([]);
    const [upcomingMatches, setUpcomingMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!leagueId) return;

        const fetchLeagueData = async () => {
            setLoading(true);
            setLeagueInfo(null);
            setCompletedMatches([]);
            setUpcomingMatches([]);
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get(`http://localhost:8080/leagues/${leagueId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const { standings, fixtures } = response.data;

                setLeagueInfo({ ...response.data, hasStandings: standings?.length > 0 });
                setCompletedMatches(fixtures.filter(({ status }) => ['FT', 'AET', 'PEN'].includes(status)));
                setUpcomingMatches(fixtures.filter(({ status }) => ['NS', 'TBD'].includes(status)));
            } catch (error) {
                console.error('Error fetching league data:', error.message);
                setLeagueInfo(null);
            } finally {
                setLoading(false);
            }
        };

        fetchLeagueData();
    }, [leagueId]);

    return { leagueInfo, completedMatches, upcomingMatches, loading };
};



export default useLeagueData;
