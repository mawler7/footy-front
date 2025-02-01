import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { tokenManager } from "./tokenManager";

const useAuth = () => {
    const navigate = useNavigate();
    const [authState, setAuthState] = useState({
        isLoggedIn: !!tokenManager.getToken(),
        isLoading: true,
    });

    const saveToken = useCallback((token) => {
        if (!token) {
            console.error("No token provided.");
            return;
        }
        tokenManager.setToken(token);
        setAuthState({ isLoggedIn: true, isLoading: false });
    }, []);

    const handleLogout = useCallback(() => {
        tokenManager.clearToken();
        setAuthState({ isLoggedIn: false, isLoading: false });
        navigate("/login");
    }, [navigate]);

    const verifyToken = useCallback(async () => {
        const token = tokenManager.getToken();
        if (!token) {
            handleLogout();
            return;
        }

        try {
            await axios.get("http://localhost:8080/auth/verify", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAuthState({ isLoggedIn: true, isLoading: false });
        } catch (error) {
            console.error("Token verification failed:", error.response?.data || error.message);
            handleLogout();
        }
    }, [handleLogout]);

    useEffect(() => {
        const initializeAuth = async () => {
            const tokenFromUrl = new URLSearchParams(window.location.search).get("token");

            if (tokenFromUrl) {
                saveToken(tokenFromUrl);
                navigate("/");
                return;
            }

            await verifyToken();
        };

        initializeAuth();
    }, [navigate, saveToken, verifyToken]);

    return {
        isLoggedIn: authState.isLoggedIn,
        isLoading: authState.isLoading,
        saveToken,
        handleLogout,
    };
};

export default useAuth;