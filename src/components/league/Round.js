import React from 'react';
import {
    RoundHeader,
    DateCell,
    HomeTeamCell,
    TeamName,
    TeamLogo,
    ScoreCell,
    Score,
    AwayTeamCell,
    TableRow,
    RoundWrapper
} from '../../styles/standings/ResultsAndMatchesStyles';
import { ArrowButton } from '../../styles/buttons/buttons';

const Round = ({ round, matches, expanded, onToggle, onMatchClick, formatDateTime }) => (
    <RoundWrapper>
        <RoundHeader onClick={onToggle}>
            <span>{round}</span>
            <ArrowButton>{expanded ? '▼' : '▶'}</ArrowButton>
        </RoundHeader>
        {expanded && matches.length > 0 ? (
            matches.map((match) => (
                <TableRow key={match.id} onClick={() => onMatchClick(match.id)}>
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
            ))
        ) : (
            ' '
        )}
    </RoundWrapper>
);

export default Round;
