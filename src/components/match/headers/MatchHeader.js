import {
  FixtureTeamLogo,
  FixtureDetailsTeamSection,
  MatchDate,
  MatchHeaderWrapper,
  MatchResult,
  MatchStatus,
  MatchTime,
  ScoreSection,
  FixtureTeamName,
} from "../../../styles/match/MatchHeaderStyles";

const MatchHeader = ({ match, localDate, onTeamClick, isBettingSlipOpen, isVertical }) => (
  <MatchHeaderWrapper>
    <FixtureDetailsTeamSection $isBettingSlipOpen={isBettingSlipOpen} >
      <FixtureTeamLogo $isVertical={isVertical}
        src={match?.homeTeamLogo}
        alt={match?.homeTeamName}
        onClick={() => onTeamClick(match.homeTeamId)}
      />
      <FixtureTeamName>{match?.homeTeamName}</FixtureTeamName>
    </FixtureDetailsTeamSection>

    <ScoreSection>
      <MatchDate>
        {localDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
        <MatchTime>{localDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</MatchTime>
      </MatchDate>
      <MatchResult>{match?.home ?? '-'} : {match?.away ?? '-'}</MatchResult>
      <MatchStatus>
        {match?.status !== 'NS' &&
          (match?.status === '1H' || match?.status === '2H' ? `${match.elapsed} '` : match?.status)}
      </MatchStatus>
    </ScoreSection>

    <FixtureDetailsTeamSection >
      <FixtureTeamLogo
        src={match?.awayTeamLogo}
        alt={match?.awayTeamName}
        onClick={() => onTeamClick(match.awayTeamId)}
      />
      <FixtureTeamName>{match?.awayTeamName}</FixtureTeamName>
    </FixtureDetailsTeamSection>
  </MatchHeaderWrapper>
);

export default MatchHeader;

