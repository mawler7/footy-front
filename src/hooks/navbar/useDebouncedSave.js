import { useRef } from 'react';
import { debounce } from 'lodash';

const useDebouncedSave = (saveFunction, delay = 300) => {
    const debouncedFunction = useRef(debounce(saveFunction, delay)).current;

    return debouncedFunction;
};

export default useDebouncedSave;
