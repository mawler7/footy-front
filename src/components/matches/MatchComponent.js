import React from 'react';
import { MatchStatus, Prediction, TeamInfo } from '../common/utils';
import {
  MatchItem,
  MatchOddCell,
  MatchOddsContainer,
  MatchOddsRow,
  MatchScore,
  ScoresContainer,
  StarContainer, StatusContainer, TeamsContainer
} from '../../styles/match/MatchComponentStyles';
import { StyledStar } from "../../styles/buttons/buttons";

const MatchComponent = ({ match, handleMatchClick, toggleFavorite, favorites, handleAddToSlip }) => {
  const isFavorite = favorites.some((fav) => fav.id === match.id);

  return (
    <MatchItem onClick={() => handleMatchClick(match.id)}>

      <StarContainer
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(match);
        }}
      >
        <StyledStar color={isFavorite ? 'yellow' : 'white'} />
      </StarContainer>

      <StatusContainer>
        <MatchStatus status={match.status} date={match.date} elapsed={match.elapsed} />
      </StatusContainer>

      <TeamsContainer>
        <TeamInfo logo={match.homeTeamLogo} name={match.homeTeamName} />
        <TeamInfo logo={match.awayTeamLogo} name={match.awayTeamName} />
      </TeamsContainer>

      <ScoresContainer>
        <MatchScore>{match.home ?? ''}</MatchScore>
        <MatchScore>{match.away ?? ''}</MatchScore>
      </ScoresContainer>

      <Prediction
        advice={match.advice}
        homePrediction={match.homePrediction}
        awayPrediction={match.awayPrediction}
        underOver={match.underOver}
        homeTeam={match.homeTeamName}
        awayTeam={match.awayTeamName}
      />

      <MatchOddsContainer>
        {['1', 'X', '2'].map((key, idx) => (
          <MatchOddsRow
            key={key}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToSlip({
                betName: 'Match Winner',
                value: key,
                odd: match[`average${['Home', 'Draw', 'Away'][idx]}Odd`]?.toFixed(2),
                matchInfo: match,
              });
            }}
          >
            <MatchOddCell>{match[`average${['Home', 'Draw', 'Away'][idx]}Odd`]?.toFixed(2)}</MatchOddCell>
          </MatchOddsRow>
        ))}
      </MatchOddsContainer>
    </MatchItem>
  );
};

export default MatchComponent;