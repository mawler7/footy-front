import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const LazyTeamImage = ({ teamId, logoUrl, alt = 'Team', defaultLogo = '/default-team-logo.png', style }) => {
    const [imageError, setImageError] = useState(false);

    const getCachedImage = (id, url) => {
        try {
            if (!url) return defaultLogo;
            const cacheKey = `teamImage_${id}`;
            const cachedUrl = localStorage.getItem(cacheKey);
            if (cachedUrl) return cachedUrl;

            localStorage.setItem(cacheKey, url);
            return url;
        } catch (error) {
            console.warn('Error accessing localStorage:', error);
            return url;
        }
    };

    const teamImage = getCachedImage(teamId, logoUrl);

    return (
        <LazyLoadImage
            src={imageError ? defaultLogo : teamImage}
            alt={alt}
            effect="blur"
            onError={() => {
                setImageError(true);
                try {
                    localStorage.removeItem(`teamImage_${teamId}`);
                } catch (error) {
                    console.warn('Error removing image from localStorage:', error);
                }
            }}
            style={{
                width: '22px',
                height: '22px',
                borderRadius: '4px',
                objectFit: 'contain',
                ...style,
            }}
        />
    );
};

export default LazyTeamImage;
