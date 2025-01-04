import React, { useState, useEffect, useMemo } from 'react';
import useLeagueData from '../../hooks/leagues/useLeagueData';
import Summary from './Summary';
import Squad from '../team/Squad';
import Standings from '../league/Standings';
import Results from '../league/Results';
import Matches from '../league/Matches';
import TabContainer from '../common/TabContainer';
import { LoadingWrapper, Spinner, Tooltip, LeagueLogo } from '../../styles/GlobalStyles';
import { LeagueButton } from '../../styles/buttons/buttons';
import { SummaryTableWrapper } from '../../styles/team/SummaryStyles';
import { LeagueFilterWrapper } from '../../styles/team/SquadStyles';

const TeamDetailsContent = ({ activeTab, teamResults, team, leagues, isBettingSlipOpen }) => {
    const [selectedLeagueId, setSelectedLeagueId] = useState(null);
    const [activeLeagueTab, setActiveLeagueTab] = useState(null);
    const { leagueInfo, completedMatches, upcomingMatches, loading } = useLeagueData(selectedLeagueId);

    const sortedLeagues = useMemo(() => {
        return leagues.slice().sort((a, b) => {
            if (a.type === 'League' && b.type !== 'League') return -1;
            if (a.type !== 'League' && b.type === 'League') return 1;
            return a.leagueName.localeCompare(b.leagueName);
        });
    }, [leagues]);

    useEffect(() => {
        if (activeTab === 'standings' && sortedLeagues.length > 0 && !selectedLeagueId) {
            setSelectedLeagueId(sortedLeagues[0].id);
        }
    }, [activeTab, sortedLeagues, selectedLeagueId]);

    useEffect(() => {
        if (selectedLeagueId) {
            const defaultTab = determineDefaultTab();
            setActiveLeagueTab(defaultTab);
        }
    }, [selectedLeagueId, leagueInfo, completedMatches, upcomingMatches]);

    const determineDefaultTab = () => {
        if (leagueInfo?.hasStandings) return 'table';
        if (completedMatches.length > 0) return 'results';
        if (upcomingMatches.length > 0) return 'matches';
        return null;
    };

    const tabs = useMemo(() => [
        { key: 'table', label: 'Table', isVisible: leagueInfo?.hasStandings },
        { key: 'results', label: 'Results', isVisible: completedMatches.length > 0 },
        { key: 'matches', label: 'Matches', isVisible: upcomingMatches.length > 0 },
    ].filter((tab) => tab.isVisible), [leagueInfo, completedMatches, upcomingMatches]);

    const handleLeagueClick = (leagueId) => {
        if (leagueId !== selectedLeagueId) {
            setSelectedLeagueId(leagueId);
            setActiveLeagueTab(null);
        }
    };

    const renderContent = (isBettingSlipOpen) => {
        if (!activeLeagueTab) {
            return;
        }

        switch (activeLeagueTab) {
            case 'table':
                return <Standings isBettingSlipOpen={isBettingSlipOpen} leagueId={selectedLeagueId} singleLeagueMode={false} />;
            case 'results':
                return <Results isBettingSlipOpen={isBettingSlipOpen} matches={completedMatches} />;
            case 'matches':
                return <Matches isBettingSlipOpen={isBettingSlipOpen} matches={upcomingMatches} />;
            default:
                return;
        }
    };

    if (loading && selectedLeagueId) {
        return (
            <LoadingWrapper>
                <Spinner />
            </LoadingWrapper>
        );
    }

    switch (activeTab) {
        case 'summary':
            return <Summary fixtures={teamResults} teamName={team?.[0]?.info.name} />;
        case 'standings':
            return (
                <SummaryTableWrapper >
                    <LeagueFilterWrapper  >
                        {sortedLeagues.map((league) => (
                            <LeagueButton
                                key={league.id}
                                $isActive={selectedLeagueId === league.id}
                                onClick={() => handleLeagueClick(league.id)}
                            >
                                <LeagueLogo src={league.logo} alt={league.leagueName} />
                                <Tooltip>{league.leagueName}</Tooltip>
                            </LeagueButton>
                        ))}
                    </LeagueFilterWrapper>

                    {selectedLeagueId && (
                        <>
                            <TabContainer
                                tabs={tabs}
                                activeTab={activeLeagueTab}
                                onTabClick={setActiveLeagueTab}
                            />
                            {renderContent()}
                        </>
                    )}
                </SummaryTableWrapper>
            );
        case 'squad':
            return <Squad isBettingSlipOpen={isBettingSlipOpen} id={team?.[0]?.info.id} />;
        default:
            return null;
    }
};

export default TeamDetailsContent;
