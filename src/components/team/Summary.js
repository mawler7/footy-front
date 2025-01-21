import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { TabButton } from '../../styles/buttons/buttons';
import {
    SummaryTableWrapper,
    NoMatches,
    ResultIndicatorCell,
    FormItem,
    StyledStandingWrapper,
    TableWrapper,
} from '../../styles/team/SummaryStyles';
import { AwayTeamCell, DateCell, HomeTeamCell, RoundHeader, Score, ScoreCell, TableRow, TeamLogo, TeamName } from '../../styles/standings/ResultsAndMatchesStyles';

const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${day}.${month}. ${time}`;
};

const getResultIndicator = (homeScore, awayScore, isHomeTeam) => {
    if (homeScore === awayScore) return 'D';
    return isHomeTeam ? (homeScore > awayScore ? 'W' : 'L') : (awayScore > homeScore ? 'W' : 'L');
};

const Summary = ({ fixtures = [], teamName }) => {
    const [showAllScheduled, setShowAllScheduled] = useState(false);
    const [showAllResults, setShowAllResults] = useState(false);
    const navigate = useNavigate();
    const scheduledRef = useRef(null);
    const resultsRef = useRef(null);

    const toggleScheduledVisibility = () => {
        setShowAllScheduled(!showAllScheduled);
        if (showAllScheduled && scheduledRef.current) {
            scheduledRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const toggleResultsVisibility = () => {
        setShowAllResults(!showAllResults);
        if (showAllResults && resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const finishedMatches = fixtures
        ?.filter(match => match.status === 'FT')
        .sort((a, b) => new Date(b.date) - new Date(a.date)) || [];

    const upcomingMatches = fixtures
        ?.filter(match => match.status === 'NS')
        .sort((a, b) => new Date(a.date) - new Date(b.date)) || [];

    const handleMatchClick = (id) => {
        navigate(`/fixture/id/${id}`);
    };

    const renderMatches = (matches, showAll, isUpcoming, sectionRef) => {
        if (!matches || matches.length === 0) {
            return <NoMatches>No {isUpcoming ? 'upcoming' : 'finished'} matches available.</NoMatches>;
        }

        return (
            < SummaryTableWrapper>
                <>
                    <RoundHeader >{isUpcoming ? 'Scheduled' : 'Results'}</RoundHeader>
                    < TableWrapper>
                        {matches.slice(0, showAll ? matches.length : 5).map((match, index) => {
                            const isHomeTeam = match.homeTeamName === teamName;
                            const homeScore = parseInt(match.home, 10);
                            const awayScore = parseInt(match.away, 10);
                            const resultIndicator = !isUpcoming ? getResultIndicator(homeScore, awayScore, isHomeTeam) : null;

                            return (
                                <TableRow key={index} onClick={() => handleMatchClick(match.id)}>
                                    <DateCell>{formatDate(match.date)}</DateCell>
                                    <HomeTeamCell>
                                        <TeamName>{match.homeTeamName}</TeamName>
                                        <TeamLogo src={match.homeTeamLogo} alt={match.homeTeamName} />
                                    </HomeTeamCell>
                                    <ScoreCell>
                                        <Score>
                                            {isUpcoming ? '-' : `${match.home} - ${match.away}`}
                                        </Score>
                                    </ScoreCell>
                                    <AwayTeamCell>
                                        <TeamLogo src={match.awayTeamLogo} alt={match.awayTeamName} />
                                        <TeamName>{match.awayTeamName}</TeamName>
                                    </AwayTeamCell>

                                    <ResultIndicatorCell>
                                        <FormItem result={resultIndicator}>{resultIndicator}</FormItem>
                                    </ResultIndicatorCell>

                                </TableRow>

                            );
                        })}
                    </ TableWrapper>
                    {matches.length > 5 && (
                        <TabButton onClick={isUpcoming ? toggleScheduledVisibility : toggleResultsVisibility}>
                            {showAll ? 'Show less' : 'Show more'}
                        </TabButton>
                    )}
                </>
            </  SummaryTableWrapper >
        );
    };

    return (
        <StyledStandingWrapper >
            {renderMatches(finishedMatches, showAllResults, false, resultsRef)}
            {renderMatches(upcomingMatches, showAllScheduled, true, scheduledRef)}
        </StyledStandingWrapper>
    );
};

export default Summary;