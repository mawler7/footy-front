import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
    const [isLoading, setIsLoading] = useState(true);

    const saveToken = useCallback((token) => {
        if (!token) {
            console.error('No token provided.');
            return;
        }
        localStorage.setItem('authToken', token);
        setIsLoggedIn(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        delete axios.defaults.headers.common['Authorization'];
        navigate('/login');
    }, [navigate]);

    const verifyToken = useCallback(async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            setIsLoggedIn(false);
            setIsLoading(false);
            navigate('/login');
            return;
        }
        try {
            await axios.get('http://localhost:8080/auth/verify', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Token verification failed:', error);
            handleLogout();
        } finally {
            setIsLoading(false);
        }
    }, [handleLogout, navigate]);

    useEffect(() => {
        const tokenFromUrl = new URLSearchParams(window.location.search).get('token');
        if (tokenFromUrl) {
            saveToken(tokenFromUrl);
            navigate('/');
        }
    }, [navigate, saveToken]);

    useEffect(() => {
        verifyToken();
    }, [verifyToken]);

    return { isLoggedIn, isLoading, saveToken, handleLogout };
};

export default useAuth;