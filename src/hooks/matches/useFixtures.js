import { useState, useEffect } from "react";
import axios from "axios";

const ITEMS_PER_PAGE = 25;

export const useFixtures = (filters, currentPage) => {
    const [fixtures, setFixtures] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchFixturesByFilters = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("authToken");
                if (!token) throw new Error("Token is missing");

                let url = `http://localhost:8080/fixture?page=${currentPage - 1}&size=${ITEMS_PER_PAGE}`;
                const params = new URLSearchParams();

                Object.entries(filters).forEach(([key, value]) => {
                    if (value.trim()) params.append(key, value);
                });

                if (params.toString()) {
                    url += `&${params.toString()}`;
                }

                const { data } = await axios.get(url, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });

                setFixtures(data.content || []);
                setTotalPages(data.totalPages || 1);
                setError(null);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching fixtures:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFixturesByFilters();
    }, [filters, currentPage]);

    return { fixtures, loading, error, totalPages };
};
