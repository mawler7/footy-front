import { useState } from "react";

const useAppContentState = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [bettingSlip, setBettingSlip] = useState([]);
    const [showBubble, setShowBubble] = useState(false);
    const [isAdminView, setIsAdminView] = useState(false);

    const toggleBettingSlip = () => setShowBubble((prev) => !prev);
    const toggleAdminView = () => setIsAdminView((prev) => !prev);

    return {
        selectedDate,
        bettingSlip,
        showBubble,
        isAdminView,
        toggleBettingSlip,
        toggleAdminView,
        setSelectedDate,
        setBettingSlip,
        setShowBubble,
    };
};

export default useAppContentState;
