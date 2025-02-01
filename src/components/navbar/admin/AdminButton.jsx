import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FloatingNavbarButton } from '../../../styles/buttons/buttons';
import { FaHome, FaUserShield } from 'react-icons/fa';

const AdminButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isAdmin = location.pathname === '/admin';

    const handleClick = useCallback(() => {
        navigate(isAdmin ? '/' : '/admin');
    }, [isAdmin, navigate]);

    return (
        <FloatingNavbarButton onClick={handleClick}>
            {isAdmin ? <FaHome size={20} /> : <FaUserShield size={20} />}
        </FloatingNavbarButton>
    );
};

export default AdminButton;
