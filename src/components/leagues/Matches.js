import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { TableCell, ResultsTableWrapper, theme, ArrowButton } from '../../styles/GlobalStyles';
import { useNavigate } from 'react-router-dom';
const Matches = ({ matches }) => {
    const [groupedMatches, setGroupedMatches] = useState({});
    const [expandedRounds, setExpandedRounds] = useState([]);
    const [sortedRounds, setSortedRounds] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (matches) {
            const { groupedRounds, roundDates } = groupMatchesByRound(matches);
            setGroupedMatches(groupedRounds);

            const expanded = Object.keys(groupedRounds).reduce((acc, round) => {
                acc[round] = true; // Domyślnie otwórz wszystkie rundy
                return acc;
            }, {});
            setExpandedRounds(expanded);

            // Sortowanie rund na podstawie najwcześniejszej daty meczu w każdej rundzie
            const sorted = Object.keys(groupedRounds).sort((a, b) => {
                return new Date(roundDates[a]) - new Date(roundDates[b]);
            });
            setSortedRounds(sorted);
        }
    }, [matches]);

    const groupMatchesByRound = (fixtures) => {
        const rounds = fixtures.reduce((acc, fixture) => {
            const round = fixture.round || 'Unknown Round';
            acc[round] = acc[round] || [];
            acc[round].push(fixture);

            // Sortowanie meczów w każdej rundzie po dacie
            acc[round].sort((a, b) => new Date(a.date) - new Date(b.date));
            return acc;
        }, {});

        // Znajdowanie najwcześniejszej daty meczu w każdej rundzie
        const roundDates = Object.entries(rounds).reduce((acc, [round, matches]) => {
            acc[round] = matches[0].date; // Najwcześniejsza data meczu
            return acc;
        }, {});

        return { groupedRounds: rounds, roundDates };
    };

    const toggleRound = (round) => {
        setExpandedRounds((prev) => ({
            ...prev,
            [round]: !prev[round],
        }));
    };

    const handleMatchClick = (id) => {
        navigate(`/fixture/id/${id}`);
    };

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `${day}.${month}. ${time}`;
    };

    if (!matches || matches.length === 0) {
        return <div>No upcoming matches available to display.</div>;
    }

    return (
        <ThemeProvider theme={theme}>
            <LayoutWrapper>
                <TableWrapper>
                    {sortedRounds.map((round) => (
                        <div key={round}>
                            <RoundHeader onClick={() => toggleRound(round)}>
                                <span>{round}</span>
                                <ArrowButton>{expandedRounds[round] ? '▼' : '▶'}</ArrowButton>
                            </RoundHeader>
                            {expandedRounds[round] && (
                                <ResultsTableWrapper>
                                    {groupedMatches[round].map((match) => (
                                        <TableRow key={match.id} onClick={() => handleMatchClick(match.id)}>
                                            <DateCell>{formatDateTime(match.date)}</DateCell>
                                            <HomeTeamCell>
                                                <TeamName align="right">{match.homeTeamName}</TeamName>
                                                <TeamLogo src={match.homeTeamLogo || 'default-logo.png'} alt={match.homeTeamName} />
                                            </HomeTeamCell>
                                            <ScoreCell>
                                                <Score>{match.home ?? '-'}</Score> : <Score>{match.away ?? '-'}</Score>
                                            </ScoreCell>
                                            <AwayTeamCell>
                                                <TeamLogo src={match.awayTeamLogo || 'default-logo.png'} alt={match.awayTeamName} />
                                                <TeamName align="left">{match.awayTeamName}</TeamName>
                                            </AwayTeamCell>
                                        </TableRow>
                                    ))}
                                </ResultsTableWrapper>
                            )}
                        </div>
                    ))}
                </TableWrapper>
            </LayoutWrapper>
        </ThemeProvider>
    );
};

export default Matches;

const LayoutWrapper = styled.div`
          display: flex;
        
          color: white;
          background-color: rgba(28, 30, 36, 0.85); // Transparent background
            border-radius: 10px;
              width: 100%;
                       width:  max(660px); // Set a maximum width for consistency
        `;

// Styled Components
const DateCell = styled(TableCell)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.white};
  text-align: left;
  width: 90px;
  margin-left: 20px;
`;

const HomeTeamCell = styled(TableCell)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 220px;
  gap: ${({ theme }) => theme.spacing.small};
`;

const AwayTeamCell = styled(TableCell)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 220px;
  gap: ${({ theme }) => theme.spacing.small};
`;

const TeamName = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.white};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: ${({ align }) => align || 'center'};
`;

const TeamLogo = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
  margin: ${({ align }) => (align === 'right' ? '0 1px 0 0' : '0 0 0 1px')};
`;

const ScoreCell = styled(TableCell)`
  text-align: center;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.white};
  width: 24px;
`;

const Score = styled.span`
  font-weight: bold;
`;

const RoundHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.small};
  margin-top: ${({ theme }) => theme.spacing.small};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fontSizes.big};
`;

const TableWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  overflow-x: auto;
`;

const TableRow = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #555;
  transition: background-color 0.3s;
  font-size: 12px;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
  }
`;
