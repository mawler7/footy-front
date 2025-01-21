import { useState, useCallback } from 'react';

export const usePitchDimensions = (initialDimensions = { width: 494, height: 290 }) => {
    const [pitchDimensions, setPitchDimensions] = useState(initialDimensions);
    const [scaleFactor, setScaleFactor] = useState(1);

    const updatePitchDimensions = useCallback((pitchElement) => {
        if (pitchElement) {
            const { offsetWidth } = pitchElement;
            const scale = offsetWidth / initialDimensions.width;

            const newWidth = initialDimensions.width * scale;
            const newHeight = initialDimensions.height * scale;

            if (
                scaleFactor !== scale ||
                pitchDimensions.width !== newWidth ||
                pitchDimensions.height !== newHeight
            ) {
                setScaleFactor(scale);
                setPitchDimensions({
                    width: newWidth,
                    height: newHeight,
                });
            }
        }
    }, [pitchDimensions, scaleFactor, initialDimensions]);

    return { pitchDimensions, scaleFactor, updatePitchDimensions };
};
