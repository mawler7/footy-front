import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const LazyPlayerImage = ({ playerId, photoUrl, alt = 'Player', defaultPhoto = '/default-player-photo.png', style }) => {
    const [imageError, setImageError] = useState(false);

    const getCachedImage = (id, url) => {
        try {
            if (!url) return defaultPhoto;
            const cacheKey = `playerImage_${id}`;
            const cachedUrl = localStorage.getItem(cacheKey);
            if (cachedUrl) return cachedUrl;

            localStorage.setItem(cacheKey, url);
            return url;
        } catch (error) {
            console.warn('Error accessing localStorage:', error);
            return url;
        }
    };

    const playerImage = getCachedImage(playerId, photoUrl);

    return (
        <LazyLoadImage
            src={imageError ? defaultPhoto : playerImage}
            alt={alt}
            effect="blur"
            onError={() => {
                setImageError(true);
                try {
                    localStorage.removeItem(`playerImage_${playerId}`);
                } catch (error) {
                    console.warn('Error removing image from localStorage:', error);
                }
            }}
            style={{
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                objectFit: 'cover',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                ...style,
            }}
        />
    );
};

export default LazyPlayerImage;
