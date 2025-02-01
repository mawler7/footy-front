import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useMatchDetails from '../../hooks/matches/useMatchDetails';
import LeagueHeader from './headers/LeagueHeader';
import MatchHeader from './headers/MatchHeader';
import MatchTabs from './tabs/MatchTabs';
import { MatchContent } from '../../styles/content/AppContentStyles';
import { BettingSlipContext } from '../context/BettingSlipContext';
import { UserContext } from '../context/UserContext';
import { useTabs } from '../../hooks/matches/useTabs';
import LoadingSpinner from '../common/LoadingSpinner';

const Match = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);
  const { match, isLoading } = useMatchDetails(id, isLoggedIn);
  const { toggleBettingSlip, showBubble } = useContext(BettingSlipContext);
  const { activeTab, activeSubTab, setActiveSubTab, handleTabChange } = useTabs();
  const [isVertical, setIsVertical] = useState(window.innerWidth < 480);

  useEffect(() => {
    const handleResize = () => setIsVertical(window.innerWidth < 480);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (!match || !match.leagueId || !match.date || !match.leagueLogo) return null;

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
