import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { loadFromLocalStorage } from '../../utils/localStorageUtils';
import useAuth from '../context/useAuth';

export const useLeagues = (initialOrder = []) => {
    const { isLoggedIn } = useAuth();
    const [leagues, setLeagues] = useState([]);
    const [leagueOrder, setLeagueOrder] = useState(() =>
        loadFromLocalStorage('leagueOrder', initialOrder)
    );

    useEffect(() => {
        if (!isLoggedIn) return;

        const fetchLeagues = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const { data } = await axios.get('http://localhost:8080/leagues/current', {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });

                if (leagueOrder.length === 0) {
                    const orderedLeagues = data.map((league) => league.id);
                    setLeagueOrder(orderedLeagues);
                    localStorage.setItem('leagueOrder', JSON.stringify(orderedLeagues));
                }

                setLeagues(reorderLeagues(leagueOrder, data));
            } catch (error) {
                console.error('Error fetching leagues:', error);
            }
        };

        fetchLeagues();
    }, [isLoggedIn, leagueOrder]);

    const reorderLeagues = (order, leagues) =>
        order.map((id) => leagues.find((league) => league.id === id)).filter(Boolean);

    const onDragEnd = useCallback(
        ({ source, destination }) => {
            if (!destination) return;

            const updatedLeagues = Array.from(leagues);
            const [movedLeague] = updatedLeagues.splice(source.index, 1);
            updatedLeagues.splice(destination.index, 0, movedLeague);

            setLeagues(updatedLeagues);
            setLeagueOrder(updatedLeagues.map((league) => league.id));
            localStorage.setItem('leagueOrder', JSON.stringify(updatedLeagues.map((league) => league.id)));
        },
        [leagues]
    );

    return { leagues, onDragEnd };
};
