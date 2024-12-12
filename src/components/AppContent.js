import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import { AuthContext } from '../components/context/AuthContext';
import RoutesConfig from './RoutesConfig';
import { AppLayout, VideoBackground, MainContainer, LeaguesWrapper, ContentWrapper, BettingSlipWrapper, FloatingButton } from '../styles/GlobalStyles';
import LeaguesContainer from '../components/leagues/LeaguesContainer';
import BettingSlipBubble from '../components/bettingSlip/BettingSlipBubble';
import videoSrc from '../icons/mp5.mp4';

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

    return isLoginPage ? (
        <RoutesConfig />
    ) : (
        <AppLayout>
            <Navbar />
            <VideoBackground autoPlay loop muted playsInline>
                <source src={videoSrc} type="video/mp4" />
            </VideoBackground>
            <MainContainer>
                <LeaguesWrapper>
                    <LeaguesContainer />
                </LeaguesWrapper>
                <ContentWrapper>
                    <RoutesConfig
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        bettingSlip={bettingSlip}
                        setBettingSlip={setBettingSlip}
                        setShowBubble={setShowBubble}
                    />
                </ContentWrapper>
                <BettingSlipWrapper>
                    <BettingSlipBubble
                        bettingSlip={bettingSlip}
                        setBettingSlip={setBettingSlip}
                        showBubble={showBubble}
                        setShowBubble={setShowBubble}
                    />
                    <FloatingButton onClick={() => setShowBubble(!showBubble)}>
                        {showBubble ? 'Close' : 'Bet'}
                    </FloatingButton>
                </BettingSlipWrapper>
            </MainContainer>
        </AppLayout>
    );
};

export default AppContent;