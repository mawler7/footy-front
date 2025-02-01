import React, { Suspense, useContext } from 'react';
import Navbar from '../navbar/Navbar';
import Leagues from '../leagues/Leagues';
import RoutesConfig from './routing/RoutesConfig';
import { AppLayout, MainContentWrapper } from '../../styles/content/AppContentStyles';
import BettingSlip from '../bettingSlip/BettingSlip';
import { BettingSlipWrapper } from '../../styles/bettingSlip/BettingSlipStyles';
import { BettingSlipContext } from './BettingSlipContext';

const AppContent = () => {

    const { showBettingSlip } = useContext(BettingSlipContext);

    return (
        <AppLayout>
            <Navbar />
            <Suspense fallback={<div>Loading...</div>}>
                <MainContentWrapper $isBettingSlipOpen={showBettingSlip}>
                    <Leagues />
                    <RoutesConfig />
                </MainContentWrapper>
                {showBettingSlip && (
                    <BettingSlipWrapper>
                        <BettingSlip />
                    </BettingSlipWrapper>
                )}
            </Suspense>
        </AppLayout>
    );
};

export default AppContent;
