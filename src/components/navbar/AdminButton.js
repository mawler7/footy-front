import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingNavbarButton } from '../../styles/buttons/buttons';
import { FaHome, FaUserShield } from 'react-icons/fa';

const AdminButton = ({ isAdminView, toggleAdminView }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (isAdminView) {
            toggleAdminView(false);
            navigate('/');
        } else {
            toggleAdminView(true);
            navigate('/admin');
        }
    };

    return (
        <FloatingNavbarButton onClick={handleClick}>
            {isAdminView ? <FaHome size={20} /> : <FaUserShield size={20} />}
        </FloatingNavbarButton>
    );
};

export default AdminButton;
