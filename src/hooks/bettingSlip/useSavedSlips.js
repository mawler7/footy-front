import { useState, useEffect, useCallback } from "react";
import { loadFromLocalStorage, saveToLocalStorage } from "../../utils/localStorageUtils";
import { saveSlip, calculateBalance } from "../../utils/bettingSlipUtils";

export const useSavedSlips = () => {
    const [savedSlips, setSavedSlips] = useState(() => {
        const saved = loadFromLocalStorage("savedBettingSlips") || [];
        return saved;
    });

    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const savedSlipsFromStorage = loadFromLocalStorage("savedBettingSlips") || [];
        setSavedSlips(savedSlipsFromStorage);
        setBalance(calculateBalance(savedSlipsFromStorage));
    }, []);

    useEffect(() => {
        setBalance(calculateBalance(savedSlips));
    }, [savedSlips]);

    const saveBettingSlip = useCallback((newSlip) => {
        const updatedSlips = saveSlip(savedSlips, newSlip);
        setSavedSlips(updatedSlips);
        saveToLocalStorage("savedBettingSlips", updatedSlips);
    }, [savedSlips]);

    const handleWonToggle = useCallback(
        (slipId) => {
            setSavedSlips((prevSlips) => {
                const updatedSlips = prevSlips.map((slip) => {
                    if (slip.id === slipId) {
                        return { ...slip, isWon: !slip.isWon };
                    }
                    return slip;
                });

                saveToLocalStorage("savedBettingSlips", updatedSlips);
                setBalance(calculateBalance(updatedSlips));
                return updatedSlips;
            });
        },
        [setSavedSlips]
    );

    return {
        savedSlips,
        setSavedSlips, // Upewnij się, że funkcja jest zwracana
        saveBettingSlip,
        handleWonToggle,
        balance,
    };
};
