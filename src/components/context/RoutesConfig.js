import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadingWrapper, Spinner } from '../../styles/GlobalStyles';

const MatchesWrapper = lazy(() => import('../../components/matches/MatchesWrapper'));
const League = lazy(() => import('../../components/league/League'));
const Match = lazy(() => import('./../match/Match'));
const PlayerDetails = lazy(() => import('../../components/players/PlayerDetails'));
const Team = lazy(() => import('../../components/team/Team'));
const LoginPage = lazy(() => import('../../components/home/LoginPage'));

const RoutesConfig = ({
    selectedDate,
    setSelectedDate,
    bettingSlip,
    setBettingSlip,
    setShowBubble,
}) => (
    <Suspense
        fallback={
            <LoadingWrapper>
                <Spinner />
            </LoadingWrapper>
        }
    >
        <Routes>
            <Route
                path="/"
                element={
                    <MatchesWrapper
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        bettingSlip={bettingSlip}
                        setBettingSlip={setBettingSlip}
                        setShowBubble={setShowBubble}
                        isBettingSlipOpen={setShowBubble}
                    />
                }
            />

            <Route
                path="/fixture/id/:id"
                element={
                    <Match
                        setBettingSlip={setBettingSlip}
                        setShowBubble={setShowBubble}
                        isBettingSlipOpen={setShowBubble}
                    />
                }
            />
            <Route path="/league/:leagueId" element={<League isBettingSlipOpen={setShowBubble} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/player/:playerId" element={<PlayerDetails isBettingSlipOpen={setShowBubble} />} />
            <Route path="/team/:id" element={<Team isBettingSlipOpen={setShowBubble} />} />
        </Routes>
    </Suspense>
);

export default RoutesConfig;
