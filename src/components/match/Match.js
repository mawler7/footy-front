import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useMatchDetails from '../../hooks/matches/useMatchDetails';
import LeagueHeader from './headers/LeagueHeader';
import MatchHeader from './headers/MatchHeader';
import MatchTabs from './tabs/MatchTabs';
import { LoadingWrapper, Spinner } from '../../styles/content/GlobalStyles';
import { MatchContent } from '../../styles/content/AppContentStyles';

const useTabs = (initialTab = 'Match', defaultSubTabs = { Match: 'Predictions', Standings: 'Table' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeSubTab, setActiveSubTab] = useState(defaultSubTabs[initialTab] || '');

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setActiveSubTab(defaultSubTabs[tab] || '');
  }, [defaultSubTabs]);

  return { activeTab, activeSubTab, setActiveSubTab, handleTabChange };
};

const Match = ({ toggleBettingSlip, showBubble }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const { match, isLoading } = useMatchDetails(id, isLoggedIn);
  const { activeTab, activeSubTab, setActiveSubTab, handleTabChange } = useTabs();
  const [isVertical, setIsVertical] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 480 : false
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => setIsVertical(window.innerWidth < 480);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return (
      <LoadingWrapper>
        <Spinner />
      </LoadingWrapper>
    );
  }

  if (!match || !match.leagueId || !match.date || !match.leagueLogo) {
    return <div>Error: Match data is incomplete or missing.</div>;
  }

  return (
    <MatchContent $isBettingSlipOpen={showBubble}>

      <LeagueHeader
        $isVertical={isVertical}
        leagueLogo={match.leagueLogo}
        leagueName={match.leagueName}
        round={match.round}
        onLeagueClick={(e) => {
          e.preventDefault();
          navigate(`/league/${match.leagueId}`);
        }}
      />

      <MatchHeader
        $isBettingSlipOpen={showBubble}
        $isVertical={isVertical}
        match={match}
        localDate={new Date(match.date * 1000)}
        onTeamClick={(teamId) => navigate(`/team/${teamId}`)}
      />

      <MatchTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        activeSubTab={activeSubTab}
        setActiveSubTab={setActiveSubTab}
        onSubTabChange={setActiveSubTab}
        match={match}
        toggleBettingSlip={toggleBettingSlip}
        showBubble={showBubble}
      />
    </MatchContent>
  );
};

export default Match;
