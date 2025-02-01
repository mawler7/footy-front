import { LeagueLogo, LeagueInfo, LeagueName, LeagueHeaderContainer, LeftSection } from "../../../styles/match/LeagueHeaderStyles";

const LeagueHeader = ({ leagueLogo, leagueName, round, onLeagueClick, isVertical }) => (
  <LeagueHeaderContainer onClick={onLeagueClick}>
    <LeftSection>
      <LeagueLogo src={leagueLogo} alt="League Logo" />
      <LeagueInfo>
        <LeagueName>{leagueName} - {round}</LeagueName>
      </LeagueInfo>
    </LeftSection>
  </LeagueHeaderContainer>
);

export default LeagueHeader;
