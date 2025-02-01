import { useEffect } from 'react';

const useOutsideClick = (ref, callback, active, ignoredRefs = []) => {
    useEffect(() => {
        if (!active) return;

        const handleClickOutside = (event) => {
            const isIgnored = ignoredRefs.some(
                (ignoredRef) => ignoredRef.current && ignoredRef.current.contains(event.target)
            );

            if (!isIgnored && ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [ref, callback, active, ignoredRefs]);
};

export default useOutsideClick;
