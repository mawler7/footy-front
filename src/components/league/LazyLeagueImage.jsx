import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const LazyLeagueImage = ({ leagueId, logoUrl, alt = 'League', defaultLogo = '/default-league-logo.png', style }) => {
    const [imageError, setImageError] = useState(false);

    const getCachedImage = (id, url) => {
        try {
            if (!url) return defaultLogo;
            const cacheKey = `leagueImage_${id}`;
            const cachedUrl = localStorage.getItem(cacheKey);
            if (cachedUrl) return cachedUrl;

            localStorage.setItem(cacheKey, url);
            return url;
        } catch (error) {
            console.warn('Error accessing localStorage:', error);
            return url;
        }
    };

    const leagueImage = getCachedImage(leagueId, logoUrl);

    return (
        <LazyLoadImage
            src={imageError ? defaultLogo : leagueImage}
            alt={alt}
            effect="blur"
            onError={() => {
                setImageError(true);
                try {
                    localStorage.removeItem(`leagueImage_${leagueId}`);
                } catch (error) {
                    console.warn('Error removing image from localStorage:', error);
                }
            }}
            style={{
                width: '22px',
                height: '22px',
                objectFit: 'contain',
                borderRadius: '4px',
                ...style,
            }}
        />
    );
};

export default LazyLeagueImage;
