import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useMatchDetails from '../../hooks/matches/useMatchDetails';
import LeagueHeader from './LeagueHeader';
import MatchHeader from './MatchHeader';
import MatchTabs from './MatchTabs';
import videoBackground from '../../icons/mp5.mp4';
import { LoadingWrapper, Spinner } from '../../styles/GlobalStyles';
import { MainContent, VideoBackground } from '../../styles/content/AppContentStyles';
import useBettingSlip from '../../hooks/bettingSlip/useBettingSlip';

const useTabs = (initialTab = 'Match') => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeSubTab, setActiveSubTab] = useState('Predictions');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setActiveSubTab(tab === 'Match' ? 'Predictions' : 'Table');
  };
  return { activeTab, activeSubTab, setActiveSubTab, handleTabChange };
};

const Match = ({ setBettingSlip, setShowBubble }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const { match, isLoading } = useMatchDetails(id, isLoggedIn);
  const { activeTab, activeSubTab, setActiveSubTab, handleTabChange } = useTabs();
  const handleAddToSlip = useBettingSlip(setBettingSlip, setShowBubble)

  if (isLoading || !match) {
    return (
      <LoadingWrapper>
        <Spinner />
      </LoadingWrapper>
    );
  }

  return (
    <MainContent  >
      <VideoBackground autoPlay loop muted playsInline>
        <source src={videoBackground} type="video/mp4" />
      </VideoBackground>

      <LeagueHeader
        leagueLogo={match.leagueLogo}
        leagueName={match.leagueName}
        round={match.round}
        onLeagueClick={() => navigate(`/league/${match.leagueId}`)}
      />

      <MatchHeader
        match={match}
        localDate={new Date(match.date * 1000)}
        onTeamClick={(teamId) => navigate(`/team/${teamId}`)}
      />

      <MatchTabs
        key={`${activeTab}-${activeSubTab}`}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        activeSubTab={activeSubTab}
        setActiveSubTab={setActiveSubTab}
        onSubTabChange={setActiveSubTab}
        match={match}
        handleAddToSlip={handleAddToSlip}
      />

    </MainContent>
  );
};

export default Match;
