import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
    withCredentials: true,
});

export default api;
