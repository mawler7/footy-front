import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useLeagueData from '../../hooks/leagues/useLeagueData';
import LeagueHeader from './LeagueHeader';
import TabContainer from '../common/TabContainer';
import Standings from './Standings';
import Results from './Results';
import Matches from './Matches';
import PropTypes from 'prop-types';
import { HeaderAndTabsContainer, ContentSection, } from '../../styles/league/LeagueWrapperStyles';
import { LoadingWrapper, Spinner } from '../../styles/GlobalStyles';
import { LeagueContent } from '../../styles/content/AppContentStyles';

const League = ({ teamMode = false, teamId = null, leagues = [], isBettingSlipOpen = false }) => {
  const { leagueId } = useParams();
  const { leagueInfo, completedMatches, upcomingMatches, loading } = useLeagueData(leagueId, teamId);
  const [activeTab, setActiveTab] = useState(null);

  const tabs = useMemo(
    () => [
      { key: 'table', label: 'Table', isVisible: leagueInfo?.hasStandings },
      { key: 'results', label: 'Results', isVisible: completedMatches.length > 0 },
      { key: 'matches', label: 'Matches', isVisible: upcomingMatches.length > 0 },
    ],
    [leagueInfo, completedMatches, upcomingMatches]
  );

  useEffect(() => {
    if (loading) return;
    const defaultTab = tabs.find((tab) => tab.isVisible)?.key || null;
    setActiveTab(defaultTab);
  }, [loading, tabs]);

  const renderContent = () => {
    switch (activeTab) {
      case 'table':
        return <Standings isBettingSlipOpen={isBettingSlipOpen} leagueId={leagueId} singleLeagueMode={!teamMode} leagues={leagues} />;
      case 'results':
        return <Results matches={completedMatches} isBettingSlipOpen={isBettingSlipOpen} />;
      case 'matches':
        return <Matches matches={upcomingMatches} isBettingSlipOpen={isBettingSlipOpen} />;
      default:
        return <LoadingWrapper>
          <Spinner />
        </LoadingWrapper>;
    }
  };

  if (loading) {
    return (
      <LoadingWrapper>
        <Spinner />
      </LoadingWrapper>
    );
  }

  return (
    <LeagueContent >
      {leagueInfo && (
        <HeaderAndTabsContainer>
          <LeagueHeader
            leagueName={leagueInfo.leagueName}
            logo={leagueInfo.logo}
            season={leagueInfo.season}
          />
          <TabContainer
            tabs={tabs}
            activeTab={activeTab}
            onTabClick={setActiveTab}
            isBettingSlipOpen={isBettingSlipOpen}
          />
        </HeaderAndTabsContainer>
      )}
      <ContentSection  >{renderContent()}</ContentSection>
    </LeagueContent >
  );
};

League.propTypes = {
  teamMode: PropTypes.bool,
  teamId: PropTypes.number,
  leagues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      leagueName: PropTypes.string.isRequired,
    })
  ),
};

export default League;
