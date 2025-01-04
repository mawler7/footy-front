import { useMemo } from 'react';

export const useDescriptionColors = (groupedStandings) => {
    return useMemo(() => {
        const uniqueDescriptions = [...new Set(
            Object.values(groupedStandings).flat().map((team) => team.description).filter(Boolean)
        )].sort();

        const colorPalette = ['#27ae60', '#f39c12', '#8e44ad', '#2980b9'];
        return uniqueDescriptions.reduce((acc, desc, index) => {
            acc[desc] = desc.toLowerCase().includes('relegation') ? '#e74c3c' : colorPalette[index % colorPalette.length];
            return acc;
        }, {});
    }, [groupedStandings]);
};

export default useDescriptionColors;