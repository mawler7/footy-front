import { useState, useRef, useEffect } from "react";

export const useTeamDropdown = () => {
    const [showDropdown, setShowDropdown] = useState(null);
    const ref = useRef(null);

    const toggleDropdown = (teamType) => {
        setShowDropdown((prev) => (prev === teamType ? null : teamType));
    };

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setShowDropdown(null);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return { showDropdown, toggleDropdown, ref };
};
