import { useLocalStorage } from './useLocalStorage';

export const useFavorites = () => {
    const [favorites, setFavorites] = useLocalStorage('favoriteMatches', []);

    const toggleFavorite = (matches) => {
        const matchesToToggle = Array.isArray(matches) ? matches : [matches];

        const updatedFavorites = matchesToToggle.reduce((acc, match) => {
            const isFavorite = acc.some((fav) => fav.id === match.id);
            return isFavorite
                ? acc.filter((fav) => fav.id !== match.id)
                : [...acc, match];
        }, favorites);

        setFavorites(updatedFavorites);
    };

    return { favorites, toggleFavorite };
};
