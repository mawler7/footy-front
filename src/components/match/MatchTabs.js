import React, { useEffect, useMemo } from 'react';
import Prediction from './Prediction';
import Events from '../../components/match/Events';
import Statistics from '../../components/match/Statistics';
import Odds from '../../components/match/Odds';
import H2H from '../../components/match/H2H';
import Lineups from '../../components/match/Lineups';
import Results from '../../components/league/Results';
import Matches from '../../components/league/Matches';
import Standings from '../../components/league/Standings';
import useH2HData from '../../hooks/matches/useH2HData';
import useLeagueData from '../../hooks/leagues/useLeagueData';
import useBettingSlip from '../../hooks/bettingSlip/useBettingSlip';
import useFilteredEvents from '../../hooks/matches/useFilteredEvents';
import { TabContainerWrapper } from '../../styles/league/TabContainerStyles';
import { SubTab, Tab } from "../../styles/buttons/buttons";
import { LoadingWrapper, Spinner } from '../../styles/GlobalStyles';

const MatchTabs = ({
    activeTab,
    onTabChange,
    activeSubTab,
    setActiveSubTab,
    setBettingSlip,
    setShowBubble,
    onSubTabChange,
    match,
    handleAddToSlip,
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
    const isBettingSlipOpen = useBettingSlip(setBettingSlip, setShowBubble);

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
            return <Standings isBettingSlipOpen={isBettingSlipOpen} leagueId={match.leagueId} />;
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
                    return (
                        <Lineups
                            match={match}
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
            return <Odds odds={match.bets} match={match} handleAddToSlip={handleAddToSlip} />;
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
