// utils/cache.js

/**
 * Retrieves data from the cache.
 * @param {string} key - The cache key.
 * @returns {any|null} - The cached data or null if not found or expired.
 */
export const getFromCache = (key) => {
    const cachedData = localStorage.getItem(key);

    if (!cachedData) {
        return null;
    }

    try {
        const { data, expiry } = JSON.parse(cachedData);
        if (new Date().getTime() > expiry) {
            localStorage.removeItem(key); // Remove expired cache
            return null;
        }
        return data;
    } catch (error) {
        console.error('Failed to parse cached data:', error);
        localStorage.removeItem(key);
        return null;
    }
};

/**
 * Saves data to the cache with an expiry time.
 * @param {string} key - The cache key.
 * @param {any} data - The data to cache.
 * @param {number} ttl - Time to live in milliseconds.
 */
export const saveToCache = (key, data, ttl) => {
    const expiry = new Date().getTime() + ttl;
    const cachedData = { data, expiry };

    try {
        localStorage.setItem(key, JSON.stringify(cachedData));
    } catch (error) {
        console.error('Failed to save data to cache:', error);
    }
};
