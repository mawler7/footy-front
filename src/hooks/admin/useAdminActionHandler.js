import { useState, useCallback } from 'react';
import api from '../../utils/api';

export const useAdminActionHandler = (refetch) => {
    const [statusMessage, setStatusMessage] = useState('');

    const executeAction = useCallback(async (action, params) => {
        let url = action.endpoint;
        action.params?.forEach((param) => {
            url = url.replace(`{${param}}`, params[param] || '');
        });

        try {
            setStatusMessage(`Executing: ${action.name}`);
            await api({
                method: action.method,
                url,
            });
            setStatusMessage(`Success: ${action.name}`);
            refetch();
        } catch (err) {
            console.error(err);
            setStatusMessage(`Error: ${action.name} - ${err.message}`);
        }
    }, [refetch]);

    return { executeAction, statusMessage };
};
