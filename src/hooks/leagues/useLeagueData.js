import { useState, useEffect } from 'react';
import axios from 'axios';

const useLeagueData = (leagueId) => {
    const [leagueInfo, setLeagueInfo] = useState(null);
    const [completedMatches, setCompletedMatches] = useState([]);
    const [upcomingMatches, setUpcomingMatches] = useState([]);
    const [topScorers, setTopScorers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!leagueId) return;

        const fetchLeagueData = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('authToken');

                const leagueResponse = await axios.get(`http://localhost:8080/leagues/${leagueId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });

                const { standings = [], fixtures = [] } = leagueResponse.data || {};

                setLeagueInfo({
                    ...leagueResponse.data,
                    hasStandings: standings.length > 0,
                    hasFixtures: fixtures.length > 0,
                });

                setCompletedMatches(
                    fixtures.filter(({ status }) => ['FT', 'AET', 'PEN'].includes(status))
                );
                setUpcomingMatches(
                    fixtures.filter(({ status }) => ['NS', 'TBD'].includes(status))
                );
                console.log(leagueResponse);
                const scorersResponse = await axios.get(
                    `http://localhost:8080/player/top-scorers?leagueId=${leagueId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true,
                    }
                );
                setTopScorers(Array.isArray(scorersResponse.data) ? scorersResponse.data : []);
            } catch (error) {
                console.error(`Error fetching league data: ${error.message}`);
                setError(error.message || 'Failed to fetch league data');
                setLeagueInfo(null);
            } finally {
                setLoading(false);
            }
        };

        fetchLeagueData();
    }, [leagueId]);


    return {
        leagueInfo,
        completedMatches,
        upcomingMatches,
        topScorers,
        loading,
        error,
    };
};

export default useLeagueData;
