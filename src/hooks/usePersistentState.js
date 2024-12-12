import { useState, useEffect } from 'react';

export const usePersistentState = (key, initialValue) => {
    const [state, setState] = useState(() => {
        const storedValue = localStorage.getItem(key);
        console.log(`usePersistentState - key: ${key}, value: ${storedValue}`);

        return storedValue ? JSON.parse(storedValue) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state, key]);

    return [state, setState];
};

export default usePersistentState;