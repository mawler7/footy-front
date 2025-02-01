import React, { useContext, useRef } from 'react';
import { FaTimes, FaMoneyBill } from 'react-icons/fa';
import { FloatingNavbarButton } from '../../../styles/buttons/buttons';
import useOutsideClick from '../../../hooks/navbar/handleOutsideClick';
import { BettingSlipContext } from '../../context/BettingSlipContext';

const BetButton = () => {
    const { toggleBettingSlip, showBettingSlip } = useContext(BettingSlipContext);
    const buttonRef = useRef(null);
    const menuRef = useRef(null);

    useOutsideClick(
        menuRef,
        () => {
            if (showBettingSlip) toggleBettingSlip();
        },
        showBettingSlip,
        [buttonRef]
    );

    return (
        <FloatingNavbarButton
            ref={buttonRef}
            onClick={(event) => {
                event.stopPropagation();
                toggleBettingSlip();
            }}
            title="Open betting slip"
        >
            {showBettingSlip ? <FaTimes size={20} /> : <FaMoneyBill size={20} />}
        </FloatingNavbarButton>
    );
};

export default BetButton;
