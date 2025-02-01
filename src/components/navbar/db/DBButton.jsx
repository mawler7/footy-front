import React, { useCallback } from 'react';
import { FloatingNavbarButton } from '../../../styles/buttons/buttons';
import { useNavigate } from 'react-router-dom';
import { FaDatabase } from 'react-icons/fa';

const DBButton = () => {
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate("/db");
    }, [navigate]);

    return (
        <FloatingNavbarButton onClick={handleClick} aria-label="Database">
            <FaDatabase size={20} />
        </FloatingNavbarButton>
    );
};

export default DBButton;
