// import { useState } from "react";

import { useState, useEffect } from "react";

const useSavedBets = () => {
    const [savedSlips, setSavedSlips] = useState([]);

    useEffect(() => {
        const savedSlipsFromStorage = localStorage.getItem("savedBettingSlips");
        if (savedSlipsFromStorage) {
            try {
                setSavedSlips(JSON.parse(savedSlipsFromStorage));
            } catch (error) {
                console.error("Error parsing saved slips from localStorage:", error);
            }
        }
    }, []);

    const saveSlip = (newSlip) => {
        const updatedSlips = [...savedSlips, newSlip];
        setSavedSlips(updatedSlips);
        localStorage.setItem("savedBettingSlips", JSON.stringify(updatedSlips));
    };

    const deleteSlip = (slipId) => {
        const updatedSlips = savedSlips.filter((slip) => slip.id !== slipId);
        setSavedSlips(updatedSlips);
        localStorage.setItem("savedBettingSlips", JSON.stringify(updatedSlips));
    };

    return { savedSlips, saveSlip, deleteSlip };
};

export default useSavedBets;


// const useSavedBets = (savedSlips, defaultPage = 1) => {
//     const [currentPage, setCurrentPage] = useState(defaultPage);
//     const itemsPerPage = 5;

//     const totalPages = Math.ceil(savedSlips.length / itemsPerPage);
//     const paginatedSlips = savedSlips.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//     );

//     return { paginatedSlips, totalPages, currentPage, setCurrentPage };
// };

// export default useSavedBets;
