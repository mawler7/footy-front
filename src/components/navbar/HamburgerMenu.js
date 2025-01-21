import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { SettingsDropdownMenu } from '../../styles/navbar/navbarStyles';
import { HamburgerButton } from '../../styles/buttons/buttons';
import SettingsMenu from './SettingsMenu';
import useOutsideClick from '../../hooks/navbar/handleOutsideClick';

const HamburgerMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    useOutsideClick(menuRef, () => setIsMenuOpen(false), isMenuOpen, [buttonRef]);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <>
            <HamburgerButton
                ref={buttonRef}
                onClick={toggleMenu}
            >
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="2x" />
            </HamburgerButton>

            {isMenuOpen && (
                <SettingsDropdownMenu ref={menuRef}>
                    <SettingsMenu />
                </SettingsDropdownMenu>
            )}
        </>
    );
};

export default HamburgerMenu;
