import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FormItem, TabButton } from '../../styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { theme, TableCell } from '../../styles/GlobalStyles';
const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
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
            <SummaryTableWrapper ref={sectionRef}>
                <RoundHeader>{isUpcoming ? 'Scheduled' : 'Results'}</RoundHeader>
                <TableWrapper>
                    {matches.slice(0, showAll ? matches.length : 5).map((match, index) => {
                        const isHomeTeam = match.homeTeamName === teamName;
                        const homeScore = parseInt(match.home, 10);
                        const awayScore = parseInt(match.away, 10);
                        const resultIndicator = !isUpcoming ? getResultIndicator(homeScore, awayScore, isHomeTeam) : null;

                        return (
                            <TableRow key={index} onClick={() => handleMatchClick(match.id)}>
                                <DateCell>{formatDate(match.date)}</DateCell>
                                <HomeTeamCell>
                                    <TeamName >{match.homeTeamName}</TeamName>
                                    <TeamLogo src={match.homeTeamLogo} alt={match.homeTeamName} />
                                </HomeTeamCell>
                                <ScoreCell>
                                    {isUpcoming ? '-' : `${match.home} - ${match.away}`}
                                </ScoreCell>
                                <AwayTeamCell >
                                    <TeamLogo src={match.awayTeamLogo} alt={match.awayTeamName} />
                                    <TeamName align="left">{match.awayTeamName}</TeamName>
                                </AwayTeamCell>
                                {!isUpcoming && (
                                    <ResultIndicatorCell>
                                        <FormItem result={resultIndicator}>{resultIndicator}</FormItem>
                                    </ResultIndicatorCell>
                                )}
                            </TableRow>
                        );
                    })}
                </TableWrapper>
                {matches.length > 5 && (
                    <TabButton onClick={isUpcoming ? toggleScheduledVisibility : toggleResultsVisibility}>
                        {showAll ? 'Show less' : 'Show more matches'}
                    </TabButton>
                )}
            </SummaryTableWrapper>
        );
    };

    return (
        <ThemeProvider theme={theme}>
            <LayoutWrapper>
                {renderMatches(finishedMatches, showAllResults, false, resultsRef)}
                {renderMatches(upcomingMatches, showAllScheduled, true, scheduledRef)}
            </LayoutWrapper>
        </ThemeProvider>
    );
};

export default Summary;

const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    background-color: rgba(28, 30, 36, 0.85);
    border-radius: 10px;
    width: 100%;
    max-width: 660px;
`;

const SummaryTableWrapper = styled.div`
    margin-bottom: 15px;
    background-color: rgba(28, 30, 36, 0.85);
    border-radius: 10px;
    padding: 10px;
`;

const RoundHeader = styled.h4`
    color: ${({ theme }) => theme.colors.white};
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px solid #34495e;
    padding-bottom: 8px;
    margin-bottom: 10px;
`;

const TableWrapper = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 8px;
    overflow: hidden;
`;

const TableRow = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid #555;
 
    &:hover {
        background: rgba(255, 255, 255, 0.08);
    }
`;

const DateCell = styled(TableCell)`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.white};
    text-align: left;
    width: 90px;
`;


const TeamLogo = styled.img`
    width: 24px;
    height: 24px;
    object-fit: contain;
`;

const TeamName = styled.div`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.white};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ScoreCell = styled.div`
    text-align: center;
    width: 28px;
    font-size: 13px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.white};
`;

const ResultIndicatorCell = styled.div`
    width: 50px;
    text-align: center;
`;

const NoMatches = styled.div`
    text-align: center;
    color: #bbb;
    font-size: 14px;
    margin-top: 10px;
`;

const HomeTeamCell = styled(TableCell)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 230px;
  gap: ${({ theme }) => theme.spacing.small};
`;

const AwayTeamCell = styled(TableCell)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 230px;
  gap: ${({ theme }) => theme.spacing.small};
`;