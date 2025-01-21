import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useFetchStandings = (leagueId, filterType) => {
    const [groupedStandings, setGroupedStandings] = useState({});
    const [fixtures, setFixtures] = useState([]);

    const fetchStandings = useCallback(async () => {
        if (!leagueId) return;

        try {
            const token = localStorage.getItem('authToken');
            const { data } = await axios.get(`http://localhost:8080/leagues/${leagueId}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });

            const groupedData = Array.isArray(data.standings)
                ? groupAndSortTeams(data.standings, filterType) // Dla grup
                : processLeagueStandings(data.standings, filterType); // Dla ligi

            setGroupedStandings(groupedData);
            setFixtures(data.fixtures || []);
        } catch (error) {
            console.error('Error fetching standings:', error.message);
        }
    }, [leagueId, filterType]);

    useEffect(() => {
        fetchStandings();
    }, [fetchStandings]);

    const groupAndSortTeams = (teams, filter) => {
        return teams.reduce((acc, team) => {
            const groupName = team.group || 'Unknown Group';
            const filteredData = filter === 'home' ? team.home : filter === 'away' ? team.away : team.all;
            const points = (filteredData.win || 0) * 3 + (filteredData.draw || 0);

            acc[groupName] = acc[groupName] || [];
            acc[groupName].push({ ...team, filteredData, points });
            return acc;
        }, {});
    };

    const processLeagueStandings = (standings, filter) => {
        // Obsługa pojedynczego obiektu standings dla ligi
        const teams = Object.values(standings || {}).flat(); // Pobranie drużyn jako tablicy
        const filteredData = teams.map((team) => {
            const data = filter === 'home' ? team.home : filter === 'away' ? team.away : team.all;
            const points = (data.win || 0) * 3 + (data.draw || 0);
            return { ...team, filteredData: data, points };
        });

        return {
            League: filteredData.sort((a, b) => b.points - a.points), // Sortowanie po punktach
        };
    };

    return { groupedStandings, fixtures };
};

export default useFetchStandings;
