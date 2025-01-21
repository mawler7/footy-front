import React, { useContext, memo, useMemo } from 'react';
import { MatchStatus, TeamInfo } from '../common/utils';
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
import Prediction from './Prediciton';
import { BettingSlipContext } from '../context/BettingSlipContext';

const MatchComponent = ({
  match,
  handleMatchClick,
  toggleFavorite,
  favorites,
  toggleBettingSlip,
  showBubble
}) => {


  const { addToBettingSlip } = useContext(BettingSlipContext);

  const betDetails = useMemo(() => ({
    id: match.id,
    homeTeamName: match.homeTeamName,
    awayTeamName: match.awayTeamName,
    leagueName: match.leagueName,
    date: match.date,
  }), [match]);

  const handleAddToBettingSlip = (value, odd) => {
    if (!showBubble) {
      toggleBettingSlip();
    }
    addToBettingSlip({
      betName: "Match Winner",
      value,
      odd,
      matchInfo: betDetails,
    });
  };



  const isFavorite = useMemo(
    () => favorites.some((fav) => fav.id === match.id),
    [favorites, match.id]
  );

  if (!match || !match.id) {
    console.warn("Invalid match data:", match);
    return null;
  }


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
        home={match.home}
        away={match.away}
        status={match.status}
      />

      <MatchOddsContainer>
        {["1", "X", "2"].some((key, idx) => match[`average${["Home", "Draw", "Away"][idx]}Odd`]) ? (
          ["1", "X", "2"].map((key, idx) => (
            <MatchOddsRow
              key={key}
              onClick={(e) => {
                e.stopPropagation();
                handleAddToBettingSlip(key, match[`average${["Home", "Draw", "Away"][idx]}Odd`]?.toFixed(2));
              }}
            >
              <MatchOddCell>
                {match[`average${["Home", "Draw", "Away"][idx]}Odd`]?.toFixed(2) || "N/A"}
              </MatchOddCell>
            </MatchOddsRow>
          ))
        ) : (
          <span></span>
        )}
      </MatchOddsContainer>
    </MatchItem>
  );
};

export default memo(MatchComponent);
