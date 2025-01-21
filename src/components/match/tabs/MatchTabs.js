import React, { useEffect, useMemo } from 'react';
import Prediction from '../subtabs/Prediction';
import Events from '../subtabs/Events';
import Statistics from '../subtabs/Statistics';
import Odds from '../tabs/Odds';
import H2H from '../tabs//H2H';
import Lineups from '../subtabs/lineups/Lineups';
import Results from '../../league/Results';
import Matches from '../../league/Matches';
import Standings from '../../league/Standings';
import useH2HData from '../../../hooks/matches/useH2HData';
import useLeagueData from '../../../hooks/leagues/useLeagueData';
import useFilteredEvents from '../../../hooks/matches/useFilteredEvents';
import { TabContainerWrapper } from '../../../styles/league/TabContainerStyles';
import { SubTab, Tab } from "../../../styles/buttons/buttons";
import { LoadingWrapper, Spinner } from '../../../styles/content/GlobalStyles';

const MatchTabs = ({
    activeTab,
    onTabChange,
    activeSubTab,
    setActiveSubTab,
    toggleBettingSlip,
    onSubTabChange,
    match,
    showBubble
}) => {


    const { leagueInfo, completedMatches, upcomingMatches, loading } = useLeagueData(match.leagueId);

    const standingsSubTabs = useMemo(() => {
        return [
            leagueInfo?.hasStandings && 'Table',
            completedMatches.length > 0 && 'Results',
            upcomingMatches.length > 0 && 'Matches',
        ].filter(Boolean);
    }, [leagueInfo, completedMatches, upcomingMatches]);

    const matchSubTabs = ['Predictions', 'Lineups', 'Events', 'Statistics'];

    useEffect(() => {
        if (activeTab === 'Standings' && standingsSubTabs.length > 0 && !standingsSubTabs.includes(activeSubTab)) {
            setActiveSubTab(standingsSubTabs[0]);
        }
    }, [activeTab, standingsSubTabs, activeSubTab, setActiveSubTab]);

    const { h2hData, isLoading: h2hLoading, error: h2hError } = useH2HData(
        match?.homeTeamId,
        match?.awayTeamId
    );

    const filteredEvents = useFilteredEvents(match?.events);


    const renderStandingsContent = () => {
        if (loading) {
            return (
                <LoadingWrapper>
                    <Spinner />
                </LoadingWrapper>
            );
        }

        if (activeSubTab === 'Table') {
            return <Standings leagueId={match.leagueId} />;
        } else if (activeSubTab === 'Results') {
            return <Results matches={completedMatches} />;
        } else if (activeSubTab === 'Matches') {
            return <Matches matches={upcomingMatches} />;
        }
        return <div>No data available for this tab.</div>;
    };

    const renderContent = () => {
        if (activeTab === 'Match') {
            switch (activeSubTab) {
                case 'Predictions':
                    return <Prediction prediction={match} />;
                case 'Lineups':
                    if (!match.lineups || !match.lineups?.length) {
                        return;
                    }
                    return (
                        <Lineups
                            lineups={match?.lineups || []}
                            players={match?.players || []}
                            events={match?.events || []}
                        />
                    );
                case 'Events':
                    return <Events
                        firstHalfEvents={filteredEvents.firstHalf}
                        secondHalfEvents={filteredEvents.secondHalf}
                        extraTimeEvents={filteredEvents.extraTime}
                        penalties={filteredEvents.penalties}
                        match={match}
                    />;

                case 'Statistics':
                    return <Statistics statistics={match?.statistics || []} homeTeamId={match?.homeTeamId} awayTeamId={match?.awayTeamId} />;
                default:
                    return null;
            }
        }

        if (activeTab === 'Standings') {
            return renderStandingsContent();
        }

        if (activeTab === 'Odds') {
            return <Odds
                odds={match.bets}
                match={match}
                toggleBettingSlip={toggleBettingSlip}
                showBubble={showBubble}
            />;
        }

        if (activeTab === 'H2H') {
            if (h2hLoading) {
                return (
                    <LoadingWrapper>
                        <Spinner />
                    </LoadingWrapper>
                );
            }
            if (h2hError) {
                return <div>Error loading H2H data.</div>;
            }
            return (
                <H2H
                    homeTeamName={match.homeTeamName}
                    awayTeamName={match.awayTeamName}
                    lastHomeMatches={h2hData.lastHomeMatches || []}
                    lastAwayMatches={h2hData.lastAwayMatches || []}
                    headToHeadMatches={h2hData.headToHeadMatches || []}
                />
            );
        }
        return;
    };

    return (
        <TabContainerWrapper>
            <TabContainerWrapper>
                {['Match', 'Odds', 'H2H', 'Standings'].map((tab) => (
                    <Tab key={tab} $isActive={activeTab === tab} onClick={() => onTabChange(tab)}>
                        {tab}
                    </Tab>
                ))}
            </TabContainerWrapper>

            {activeTab === 'Match' && (
                <TabContainerWrapper>
                    {matchSubTabs.map((subTab) => (
                        <SubTab key={subTab} $isActive={activeSubTab === subTab} onClick={() => onSubTabChange(subTab)}>
                            {subTab}
                        </SubTab>
                    ))}
                </TabContainerWrapper>
            )}
            {activeTab === 'Standings' && (
                <TabContainerWrapper>
                    {standingsSubTabs.map((subTab) => (
                        <SubTab key={subTab} $isActive={activeSubTab === subTab} onClick={() => onSubTabChange(subTab)}>
                            {subTab}
                        </SubTab>
                    ))}
                </TabContainerWrapper>
            )}
            {renderContent()}
        </TabContainerWrapper>
    );
};

export default MatchTabs;
