export const breakpoints = {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
};

export const media = {
    mobile: `@media (max-width: ${breakpoints.mobile})`,
    tablet: `@media (max-width: ${breakpoints.tablet})`,
    desktop: `@media (min-width: ${breakpoints.desktop})`,
};

export const sharedColors = {
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    info: '#007bff',
};

export const theme = {
    borderRadius: '8px',
    spacing: {
        xsmall: '2px',
        small: '4px',
        medium: '16px',
        large: '24px',
        xlarge: '32px',
    },
    fontSizes: {
        xxsmall: '0.7rem',
        xsmall: '0.75rem',
        small: '0.875rem',
        medium: '1rem',
        large: '1.25rem',
        xlarge: '1.75rem',
    },
    sizes: {
        navbarHeight: '60px',
        spinner: '40px',
    },
    shadows: {
        default: '0 4px 10px rgba(0, 0, 0, 0.3)',
        accent: 'rgba(13, 110, 253, 0.4)',
        light: 'rgba(0, 0, 0, 0.2)',
    },
    colors: sharedColors,
    media,
};

export const lightTheme = {
    ...theme,
    mode: 'light',
    colors: {
        ...sharedColors,
        primary: '#f0f0f0',
        secondary: '#ffffff',
        accent: '#007bff',
        accentHover: '#0056b3',
        text: '#212529',
        textSecondary: '#6c757d',
        divider: '#dee2e6',
        backgroundSecondary: '#f8f9fa',
    },
};

export const darkTheme = {
    ...theme,
    mode: 'dark',
    colors: {
        ...sharedColors,
        primary: '#121212',
        secondary: '#1e1e1e',
        accent: '#0d6efd',
        accentHover: '#084298',
        text: '#e9ecef',
        textSecondary: '#ced4da',
        divider: '#495057',
        backgroundSecondary: '#2c2c2c',
    },
};
