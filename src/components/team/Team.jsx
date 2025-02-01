import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useTeamData from '../../hooks/teams/useTeamData';
import TeamHeader from './TeamHeader';
import TabNavigation from './TabNavigation';
import TeamDetailsContent from './TeamDetailsContent';
import { TeamWrapper } from '../../styles/content/AppContentStyles';
import { LoadingWrapper, Spinner } from '../../styles/content/GlobalStyles';

const Team = ({ isBettingSlipOpen }) => {
  const { id } = useParams();
  const { team, teamResults, leagues, leagueId, setLeagueId, loading, error } = useTeamData(id);
  const [activeTab, setActiveTab] = useState('summary');

  if (loading) {
    return (
      <LoadingWrapper>
        <Spinner />
      </LoadingWrapper>
    );
  }
  if (error) return <p>{error}</p>;

  return (
    <TeamWrapper>
      {team && <TeamHeader team={team} />}
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      {team && (
        <TeamDetailsContent
          activeTab={activeTab}
          teamResults={teamResults}
          team={team}
          leagueId={leagueId}
          leagues={leagues}
          setLeagueId={setLeagueId}
          isBettingSlipOpen={isBettingSlipOpen}
        />
      )}
    </TeamWrapper>
  );
};

export default React.memo(Team);
