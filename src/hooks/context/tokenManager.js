import axios from "axios";

export const tokenManager = {
    getToken: () => localStorage.getItem("authToken"),
    setToken: (token) => {
        if (token) {
            localStorage.setItem("authToken", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
    },
    clearToken: () => {
        localStorage.removeItem("authToken");
        delete axios.defaults.headers.common["Authorization"];
    },
};
