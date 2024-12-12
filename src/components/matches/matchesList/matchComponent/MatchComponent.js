import React from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';

const getMatchStatusOrTime = (status, matchDate, elapsed) => {
  switch (status) {
    case 'FT':
      return 'FT';
    case 'AET':
      return 'AET';
    case 'PEN':
      return 'PEN';
    case 'NS':
      return formatMatchTime(matchDate);
    case '1H':
    case '2H':
    case 'ET':
      return `${elapsed}'`;
    default:
      return status;
  }
};

const formatMatchTime = (isoString) => {
  const date = new Date(isoString);
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

const formatAdvice = (advice) => {
  if (!advice) {
    return 'No advice available';
  }

  const adviceArray = Array.isArray(advice) ? advice : [advice];

  return adviceArray.map(item => {
    const colonIndex = item.indexOf(':');
    return colonIndex !== -1 ? item.substring(colonIndex + 1).trim() : item.trim();
  }).join(', ');
};

const MatchComponent = ({
  match,
  handleMatchClick,
  toggleFavorite,
  favorites,
  handleAddToSlip,
}) => (
  <MatchItem onClick={() => handleMatchClick(match.id)}>
    <StarContainer>
      <FaStar
        onClick={(event) => toggleFavorite(event, match.id)}
        color={favorites.includes(match.id) ? 'yellow' : 'white'}
        style={{ cursor: 'pointer' }}
      />
    </StarContainer>
    <StatusContainer>
      <Status>{getMatchStatusOrTime(match.status, match.date, match.elapsed)}</Status>
    </StatusContainer>
    <TeamsContainer>
      <TeamWrapper>
        <FixturesTeamLogo
          src={match.homeTeamLogo || 'default-logo.png'}
          alt={match.homeTeamName}
        />
        <span>{match.homeTeamName}</span>
      </TeamWrapper>
      <TeamWrapper>
        <FixturesTeamLogo
          src={match.awayTeamLogo || 'default-logo.png'}
          alt={match.awayTeamName}
        />
        <span>{match.awayTeamName}</span>
      </TeamWrapper>
    </TeamsContainer>
    <ScoresContainer>
      <Score>{match.home ?? ''}</Score>
      <Score>{match.away ?? ''}</Score>
    </ScoresContainer>
    <PredictionContainer>
      {match.advice && (
        <PredictionText>
          {formatAdvice(match.advice, match.homeTeamName, match.awayTeamName)}
        </PredictionText>
      )}
      {(match.homePrediction || match.awayPrediction || match.underOver) && (
        <PredictionText>
          {match.homePrediction && (
            <>
              {match.homeTeamName}: {match.homePrediction}
              <br />
            </>
          )}
          {match.awayPrediction && (
            <>
              {match.awayTeamName}: {match.awayPrediction}
              <br />
            </>
          )}
          {match.underOver && <>Over/Under: {match.underOver}</>}
        </PredictionText>
      )}
    </PredictionContainer>
    <OddsContainer onClick={(e) => e.stopPropagation()}>
      <OddsRow
        onClick={() => handleAddToSlip('Winner', '1', match.averageHomeOdd?.toFixed(2), match)}
      >
        <OddCell>{match.averageHomeOdd?.toFixed(2)}</OddCell>
      </OddsRow>
      <OddsRow
        onClick={() => handleAddToSlip('Match Winner', 'X', match.averageDrawOdd?.toFixed(2), match)}
      >
        <OddCell>{match.averageDrawOdd?.toFixed(2)}</OddCell>
      </OddsRow>
      <OddsRow
        onClick={() => handleAddToSlip('Match Winner', '2', match.averageAwayOdd?.toFixed(2), match)}
      >
        <OddCell>{match.averageAwayOdd?.toFixed(2)}</OddCell>
      </OddsRow>
    </OddsContainer>
  </MatchItem>
);

export default MatchComponent;



const OddsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 120px;
  border-radius: 5px;
  margin-left: auto;
  position: relative; /* Dodane, aby strzałka miała kontekst */
`;

const MatchItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Dodane, aby równomiernie rozmieścić elementy */
  padding: 5px;
  background-color: ${({ isEven }) => (isEven ? 'rgba(28, 30, 36, 0.5)' : 'rgba(46, 46, 46, 0.5)')};
  width: 100%;
  max-width: 680px;
  cursor: pointer;
  border-radius: 5px;
  transition: padding 0.3s ease;
  &:hover {
    background: ${({ $isActive }) => ($isActive ? 'linear-gradient(135deg, #3b9dbd, #3a87ad)' : 'rgba(255, 255, 255, 0.08)')};
    color: #ffffff;
    box-shadow: 0 4px 8px rgba(58, 135, 173, 0.2);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(58, 135, 173, 0.4);
  }

  &:active {
    transform: scale(0.97);
  }

  @media (max-width: 768px) {
      padding: 5px;
  }
`;

const ScoresContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 30px; /* Określona szerokość, aby uniknąć przesunięcia */

  @media (max-width: 768px) {
    width: 15px;
  }
`;

const StarContainer = styled.div`
  width: 20px;
  display: flex;
  align-items: center;
  margin-left: 5px;
  color: white;
  font-weight: bold;

  svg {
    font-size: 24px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    svg {
      font-size: 18px; /* Pomniejsza gwiazdkę */
    }
    margin-left: 3px;
    margin-right: 5px;
  }
`;

const StatusContainer = styled.div`
  width: max(150px);
  align-items: center;
  text-align: center;
  color: white;
  font-weight: bold;

  @media (max-width: 768px) {
      max-width: 55px;

  }
 
`;

export const Status = styled.span`
  text-align: center;
  font-weight: bold;
  font-size: 11px;
  color: white;
`;

const FixturesTeamLogo = styled.img`
  height: max(22px);
  width: max(22px);
  object-fit: contain;
  margin-right: 10px;

  @media (max-width: 768px) {
    margin-right: 10px;
  }
`;

const TeamsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%; /* Dodane, aby zapewnić pełną szerokość w elastycznym układzie */
  max-width: 200px; /* Dodane, aby kontrolować szerokość */
  gap: 5px;

    @media (max-width: 380px) {
    gap: 3px;
    width: 40px;
  }

  @media (max-width: 768px) {
    max-width: 130px; /* Zmniejszona szerokość dla mniejszych ekranów */
  }
`;

const Score = styled.span`
  width: 100%; /* Dodane, aby zapewnić pełną szerokość w elastycznym układzie */
  max-width: 50px; /* Dodane, aby kontrolować szerokość */
  font-weight: bold;
  font-size: 12px;
  margin: 4px 0;
  color: white;
    @media (max-width: 768px) {
    max-width: 20px; /* Zmniejszona szerokość dla mniejszych ekranów */
        margin-left: 45px;
 
  }
`;

const PredictionContainer = styled.div`
  width: 100%; /* Dodane, aby zapewnić pełną szerokość w elastycznym układzie */
  text-align:center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 11px;
  line-height: 1.2;

    @media (max-width: 685px) {
    display: none; /* Ukrywa sekcję Prediction przy zwężeniu ekranu */
  }
`;

const OddsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background: ${({ $isActive }) => ($isActive ? 'linear-gradient(135deg, #3b9dbd, #3a87ad)' : 'rgba(255, 255, 255, 0.08)')};
    color: #ffffff;
    box-shadow: 0 4px 8px rgba(58, 135, 173, 0.2);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(58, 135, 173, 0.4);
  }

  &:active {
    transform: scale(0.97);
  }

  @media (max-width: 768px) {
    width: 40px;
  }
`;

const OddCell = styled.div`
  flex: 1;
  text-align: center;
  color: white;
  font-size: 10px;
    @media (max-width: 768px) {
    max-width: 110px; /* Zmniejszona szerokość dla mniejszych ekranów */
  }
`;

const PredictionText = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 10px;
  line-height: 1.4;

  @media (max-width: 590px) {
    display: none; /* Ukrywa sekcję Prediction przy zwężeniu ekranu */
  }

`;

const TeamWrapper = styled.div`

  display: flex;
  align-items: center;
  font-size: 11px;
  @media (max-width: 768px) {
    gap: 3px;
  }
    span {
    @media (max-width: 380px) {
      display: none;
    }
  }

`;

