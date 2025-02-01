import { useState, useEffect, useCallback } from 'react';
import api from '../../utils/api';

export const useApiLimit = () => {
    const [limit, setLimit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLimit = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/req');
            setLimit(response.data);
        } catch (err) {
            console.error('Error fetching limit:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLimit();
    }, [fetchLimit]);

    return { limit, loading, error, refetch: fetchLimit };
};