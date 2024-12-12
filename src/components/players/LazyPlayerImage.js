import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const LazyPlayerImage = ({ playerId, photoUrl, alt = 'Player', defaultPhoto = '/default-player-photo.png' }) => {
    const [imageError, setImageError] = useState(false);

    const getCachedImage = (id, url) => {
        const cacheKey = `playerImage_${id}`;
        const cachedUrl = localStorage.getItem(cacheKey);
        if (cachedUrl) return cachedUrl;

        localStorage.setItem(cacheKey, url);
        return url;
    };

    const playerImage = getCachedImage(playerId, photoUrl);

    return (
        <LazyLoadImage
            src={imageError ? defaultPhoto : playerImage}
            alt={alt}
            effect="blur"
            onError={() => setImageError(true)}
            style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                objectFit: 'cover',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            }}
        />
    );
};

export default LazyPlayerImage;
