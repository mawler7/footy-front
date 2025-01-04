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

export const sharedTheme = {
    borderRadius: '8px',
    navbarHeight: '50px',
    spacing: {
        xsmall: '2px',
        small: '4px',
        medium: '16px',
        large: '24px',
        xlarge: '32px',
    },
    fontSizes: {
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
    media,
};

export const lightTheme = {
    ...sharedTheme,
    mode: 'light',
    colors: {
        primary: '#f0f0f0', // Background
        secondary: '#ffffff', // Card/Container Background
        accent: '#007bff', // Primary Button/Link
        accentHover: '#0056b3', // Hover State for Accent
        accentActive: '#003a80', // Active State for Accent
        success: '#28a745', // Success State
        warning: '#ffc107', // Warning State
        error: '#dc3545', // Error State
        text: '#212529', // Primary Text
        textSecondary: '#6c757d', // Secondary Text
        mutedText: '#adb5bd', // Muted/Disabled Text
        divider: '#dee2e6', // Borders and Dividers
        backgroundOverlay: 'rgba(255, 255, 255, 0.85)', // Overlay for modals
        backgroundSecondary: '#f8f9fa', // Lighter background
        buttonHover: '#e2e6ea', // Button Hover Background
        buttonActive: '#28a745', // Active State for Button
        focus: 'rgba(0, 123, 255, 0.5)', // Focus Outline
        datePickerBackground: '#e9ecef', // Background for Date Picker
        datePickerHover: '#ced4da', // Hover State for Date Picker
        noDataText: '#6c757d', // Text color for no data messages
    },
};

export const darkTheme = {
    ...sharedTheme,
    mode: 'dark',
    colors: {
        primary: '#121212', // Background
        secondary: '#1e1e1e', // Card/Container Background
        accent: '#0d6efd', // Primary Button/Link
        accentHover: '#084298', // Hover State for Accent
        accentActive: '#052f6d', // Active State for Accent
        success: '#28a745', // Success State
        warning: '#ffc107', // Warning State
        error: '#dc3545', // Error State
        text: '#e9ecef', // Primary Text
        textSecondary: '#ced4da', // Secondary Text
        mutedText: '#6c757d', // Muted/Disabled Text
        divider: '#495057', // Borders and Dividers
        backgroundOverlay: 'rgba(0, 0, 0, 0.85)', // Overlay for modals
        backgroundSecondary: '#2c2c2c', // Darker background
        buttonHover: '#343a40', // Button Hover Background
        buttonActive: '#1a7f37', // Active State for Button
        focus: 'rgba(13, 110, 253, 0.5)', // Focus Outline
        datePickerBackground: '#212529', // Background for Date Picker
        datePickerHover: '#343a40', // Hover State for Date Picker
        noDataText: '#ced4da', // Text color for no data messages
    },
};
