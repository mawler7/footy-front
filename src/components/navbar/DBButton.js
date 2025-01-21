import React, { } from 'react';
import { FloatingNavbarButton } from '../../styles/buttons/buttons';
import { useNavigate } from 'react-router-dom';
import { FaDatabase } from 'react-icons/fa';

const DBButton = ({ isDBView, showBubble }) => {
    const navigate = useNavigate();

    const handleClick = () => {

        navigate('/');

    };

    return (
        <FloatingNavbarButton onClick={handleClick}>
            <FaDatabase size={20} />
        </FloatingNavbarButton>
    );
};

export default DBButton;
