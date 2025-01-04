import { useState, useEffect } from 'react';
import axios from 'axios';

const useTeamData = (teamId) => {
    const [team, setTeam] = useState(null);
    const [teamResults, setTeamResults] = useState([]);
    const [leagues, setLeagues] = useState([]);
    const [leagueId, setLeagueId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('authToken');

    useEffect(() => {
        if (!teamId) {
            setError('Invalid team ID');
            setLoading(false);
            return;
        }

        const fetchTeamData = async () => {
            try {
                setLoading(true);
                const [teamResponse, fixturesResponse] = await Promise.all([
                    axios.get(`http://localhost:8080/team/${teamId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get(`http://localhost:8080/fixture/team/id/${teamId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                const teamData = teamResponse.data;
                console.log('Team data: ', teamData);
                console.log('Fixtures data: ', fixturesResponse);

                setTeam(teamData);
                const mappedLeagues = teamData.map(data => data.league);
                setLeagues(mappedLeagues);

                if (mappedLeagues.length > 0) {
                    setLeagueId(mappedLeagues[0].id);
                }

                setTeamResults(fixturesResponse.data);
            } catch (error) {
                setError('Failed to load team data');
            } finally {
                setLoading(false);
            }
        };

        fetchTeamData();
    }, [teamId]);

    return { team, teamResults, leagues, leagueId, setLeagueId, loading, error };
};

export default useTeamData;
