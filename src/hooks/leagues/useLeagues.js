import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useLeagues = (isLoggedIn, initialOrder = []) => {
    const [leagues, setLeagues] = useState([]);
    const [leagueOrder, setLeagueOrder] = useState(() => {
        const savedOrder = localStorage.getItem('leagueOrder');
        return savedOrder ? JSON.parse(savedOrder) : initialOrder;
    });

    useEffect(() => {
        if (!isLoggedIn) return;

        const fetchLeagues = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const { data } = await axios.get('http://localhost:8080/leagues/current', {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });

                const orderedLeagues = reorderLeagues(leagueOrder, data);
                setLeagues(orderedLeagues);
                setLeagueOrder(orderedLeagues.map(({ id }) => id));
            } catch (error) {
                console.error('Error fetching leagues:', error);
            }
        };

        fetchLeagues();
    }, [isLoggedIn, leagueOrder]);

    const reorderLeagues = (order, leagues) =>
        order.length
            ? order.map((id) => leagues.find((league) => league.id === id)).filter(Boolean)
            : leagues;

    const onDragEnd = useCallback(
        ({ source, destination }) => {
            if (!destination) return;

            const updatedLeagues = Array.from(leagues);
            const [movedLeague] = updatedLeagues.splice(source.index, 1);
            updatedLeagues.splice(destination.index, 0, movedLeague);

            setLeagues(updatedLeagues);
            const newOrder = updatedLeagues.map((league) => league.id);
            setLeagueOrder(newOrder);
            localStorage.setItem('leagueOrder', JSON.stringify(newOrder));
        },
        [leagues]
    );

    return { leagues, setLeagues, leagueOrder, setLeagueOrder, onDragEnd };
};
