import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingWrapper, Spinner } from "../../styles/content/GlobalStyles";
import { MainContentWrapper } from "../../styles/content/AppContentStyles";
import AdminView from "../navbar/AdminView";

const Player = lazy(() => import("../players/Player"));
const Team = lazy(() => import("../../components/team/Team"));
const LoginPage = lazy(() => import("../../components/login/LoginPage"));
const League = lazy(() => import("../../components/league/League"));
const Matches = lazy(() => import("../../components/matches/Matches"));
const Match = lazy(() => import("../../components/match/Match"));

const RoutesConfig = ({ showBubble, toggleBettingSlip }) => (
    <MainContentWrapper>
        <Suspense fallback={<LoadingWrapper><Spinner /></LoadingWrapper>}>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminView />} />
                <Route path="/" element={<Matches toggleBettingSlip={toggleBettingSlip} showBubble={showBubble} />} />
                <Route path="/fixture/id/:id" element={<Match toggleBettingSlip={toggleBettingSlip} showBubble={showBubble} />} />
                <Route path="/league/:leagueId" element={<League />} />
                <Route path="/player/:playerId" element={<Player />} />
                <Route path="/team/:id" element={<Team />} />
            </Routes>
        </Suspense>
    </MainContentWrapper>
);

export default RoutesConfig;
