export const loadFromLocalStorage = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error loading from localStorage:", error);
        return [];
    }
};

export const saveToLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
};
