import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MatchesWrapper from '../components/matches/matchesList/matchesWrapper/MatchesWrapper';
import LeagueDetails from '../components/leagues/LeagueDetails';
import FixtureDetails from '../components/matches/match/FixtureDetails';
import PlayerDetails from '../components/players/PlayerDetails';
import TeamDetails from '../components/team/TeamDetails';
import LoginPage from '../components/home/LoginPage';

const RoutesConfig = ({ selectedDate, setSelectedDate, bettingSlip, setBettingSlip, setShowBubble }) => (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
            path="/"
            element={
                <MatchesWrapper
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    bettingSlip={bettingSlip}
                    setBettingSlip={setBettingSlip}
                    setShowBubble={setShowBubble}
                />
            }
        />
        <Route path="/league/:leagueId" element={<LeagueDetails />} />
        <Route
            path="/fixture/id/:id"
            element={
                <FixtureDetails
                    bettingSlip={bettingSlip}
                    setBettingSlip={setBettingSlip}
                    setShowBubble={setShowBubble}
                />
            }
        />
        <Route path="/player/:playerId" element={<PlayerDetails />} />
        <Route path="/team/:id" element={<TeamDetails />} />
    </Routes>
);

export default RoutesConfig;
