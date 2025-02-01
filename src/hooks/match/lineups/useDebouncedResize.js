import { useState, useEffect } from 'react';

export const useDebouncedResize = (debounceTime = 100) => {
    const [isVertical, setIsVertical] = useState(window.innerWidth < 480);

    useEffect(() => {
        let timeout;
        const handleResize = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setIsVertical(window.innerWidth < 480);
            }, debounceTime);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [debounceTime]);

    return isVertical;
};
