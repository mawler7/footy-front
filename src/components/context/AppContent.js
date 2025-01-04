import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import RoutesConfig from '../context/RoutesConfig';
import Navbar from '../navbar/Navbar';
import LeaguesContainer from '../leagues/LeaguesContainer';
import BettingSlipBubble from '../bettingSlip/BettingSlipBubble';
import { VideoBackground, BettingSlipWrapper, AppLayout } from '../../styles/content/AppContentStyles';
import { FloatingButton } from '../../styles/buttons/buttons';
import videoSrc from '../../icons/mp5.mp4';

const AppContent = () => {
    const location = useLocation();
    const { isLoggedIn } = useContext(AuthContext);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [bettingSlip, setBettingSlip] = useState([]);
    const [showBubble, setShowBubble] = useState(false);

    const isLoginPage = location.pathname === '/login';

    if (!isLoggedIn && !isLoginPage) {
        return <RoutesConfig />;
    }

    const toggleBettingSlip = () => {
        setShowBubble((prev) => !prev);
    }

    return isLoginPage ? (
        <RoutesConfig />
    ) : (
        <AppLayout>

            < VideoBackground autoPlay loop muted playsInline >
                <source src={videoSrc} type="video/mp4" />
            </VideoBackground >

            <Navbar />

            <FloatingButton onClick={toggleBettingSlip}>
                {showBubble ? 'Close' : 'Bet'}
            </FloatingButton>

            <LeaguesContainer />

            <RoutesConfig
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                bettingSlip={bettingSlip}
                setBettingSlip={setBettingSlip}
                setShowBubble={setShowBubble}
            />

            <BettingSlipWrapper isBettingSlipOpen={showBubble}>
                <BettingSlipBubble
                    bettingSlip={bettingSlip}
                    setBettingSlip={setBettingSlip}
                    showBubble={showBubble}
                    setShowBubble={setShowBubble}
                />
            </BettingSlipWrapper>

        </AppLayout>
    );
};

export default AppContent;