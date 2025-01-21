import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Leagues from '../leagues/Leagues';
import RoutesConfig from './RoutesConfig';
import { AppLayout, VideoBackground, MainContentWrapper } from '../../styles/content/AppContentStyles';
import videoSrc from '../../icons/mp5.mp4';
import { BettingSlipContext } from './BettingSlipContext';
import BettingSlip from '../bettingSlip/BettingSlip';
import { BettingSlipWrapper } from '../../styles/bettingSlip/BettingSlipStyles';

const AppContent = () => {
    const location = useLocation();
    const { showBettingSlip, toggleBettingSlip, toggleAdminView } = useContext(BettingSlipContext);
    const isLoginPage = location.pathname === '/login';

    if (isLoginPage) return <RoutesConfig />;

    return (
        <AppLayout>

            <Navbar toggleBettingSlip={toggleBettingSlip} showBubble={showBettingSlip} toggleAdminView={toggleAdminView} />
            <MainContentWrapper $isBettingSlipOpen={showBettingSlip}>
                <Leagues />
                <RoutesConfig toggleBettingSlip={toggleBettingSlip} showBubble={showBettingSlip} />
            </MainContentWrapper>
            {showBettingSlip && (
                <BettingSlipWrapper>
                    <BettingSlip />
                </BettingSlipWrapper>
            )}
        </AppLayout>
    );
};

export default AppContent;
