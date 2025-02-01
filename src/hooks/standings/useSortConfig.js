import { useState } from 'react';

export const useSortConfig = (defaultKey = 'points', defaultDirection = 'desc') => {
    const [sortConfig, setSortConfig] = useState({ key: defaultKey, direction: defaultDirection });

    const handleSort = (key) => {
        setSortConfig((prevState) => ({
            key,
            direction: prevState.key === key && prevState.direction === 'desc' ? 'asc' : 'desc',
        }));
    };

    const sortedTeams = (teams) => {
        return [...teams].sort((a, b) => {
            const getValue = (team, key) => {
                if (key === 'team.name') return team.team.name.toLowerCase();
                if (key === 'formPoints') return team.formPoints;
                return key.split('.').reduce((obj, k) => (obj ? obj[k] : undefined), team);
            };

            const valueA = getValue(a, sortConfig.key);
            const valueB = getValue(b, sortConfig.key);

            if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
            if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    };
    return { sortConfig, handleSort, sortedTeams };
};

export default useSortConfig;