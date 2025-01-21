import React, { useRef } from 'react';
import { FaTimes, FaMoneyBill } from 'react-icons/fa';
import { FloatingNavbarButton } from '../../styles/buttons/buttons';
import useOutsideClick from '../../hooks/navbar/handleOutsideClick';

const BetButton = ({ toggleBettingSlip, showBubble }) => {
    const buttonRef = useRef(null);
    const menuRef = useRef(null);

    useOutsideClick(
        menuRef,
        () => {
            if (showBubble) toggleBettingSlip();
        },
        showBubble,
        [buttonRef]
    );


    return (
        <FloatingNavbarButton
            ref={buttonRef}
            onClick={(event) => {
                event.stopPropagation();
                toggleBettingSlip();
            }}
            style={{
            }}
            title={

                'Open betting slip'
            }
        >
            {showBubble ? <FaTimes size={20} /> : <FaMoneyBill size={20} />}
        </FloatingNavbarButton>
    );
};

export default BetButton;
