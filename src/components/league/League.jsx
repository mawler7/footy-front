import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useLeagueData from '../../hooks/leagues/useLeagueData';
import LeagueHeader from './LeagueHeader';
import TabContainer from '../common/TabContainer';
import Standings from './Standings';
import Results from './Results';
import Matches from './Matches';
import TopScorers from './TopScorers';
import PropTypes from 'prop-types';
import { HeaderAndTabsContainer, ContentSection } from '../../styles/league/LeagueWrapperStyles';
import { LeagueContent } from '../../styles/content/AppContentStyles';
import LoadingSpinner from '../common/LoadingSpinner';

const League = ({ teamMode = false, teamId = null, leagues = [], isBettingSlipOpen = false }) => {
  const { leagueId } = useParams();
  const { leagueInfo, completedMatches, upcomingMatches, topScorers, loading } = useLeagueData(leagueId);
  const [activeTab, setActiveTab] = useState(null);

  const tabs = useMemo(() => [
    { key: 'table', label: 'Table', isVisible: leagueInfo?.hasStandings },
    { key: 'results', label: 'Results', isVisible: completedMatches.length > 0 },
    { key: 'matches', label: 'Matches', isVisible: upcomingMatches.length > 0 },
    { key: 'scorers', label: 'Top Scorers', isVisible: topScorers?.length > 0 },
  ], [leagueInfo, completedMatches, upcomingMatches, topScorers]);

  useEffect(() => {
    if (!loading) {
      const defaultTab = tabs.find(tab => tab.isVisible)?.key || 'results';
      setActiveTab(defaultTab);
    }
  }, [loading, tabs]);

  const renderContent = () => {
    if (loading) return <LoadingSpinner />;
    switch (activeTab) {
      case 'table':
        return <Standings $isBettingSlipOpen={isBettingSlipOpen} leagueId={leagueId} singleLeagueMode={!teamMode} leagues={leagues} />;
      case 'results':
        return <Results matches={completedMatches} $isBettingSlipOpen={isBettingSlipOpen} />;
      case 'matches':
        return <Matches matches={upcomingMatches} $isBettingSlipOpen={isBettingSlipOpen} />;
      case 'scorers':
        return <TopScorers topScorers={topScorers} />;
      default:
        return null;
    }
  };

  return (
    <LeagueContent>
      {loading ? (
        <LoadingSpinner />
      ) : (
        leagueInfo && (
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
        )
      )}
      <ContentSection>{renderContent()}</ContentSection>
    </LeagueContent>
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
