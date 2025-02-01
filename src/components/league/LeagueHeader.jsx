import React from 'react';
import { LeagueHeaderWrapper, LeagueInfo, LeagueName, LeftSection, LeagueLogo, Placeholder, Season } from '../../styles/league/LeagueHeaderStyles';

const LeagueHeader = ({ leagueName, logo, season, isBettingSlipOpen }) => (
  <LeagueHeaderWrapper isBettingSlipOpen={isBettingSlipOpen}>
    <LeftSection>
      {logo ? (
        <LeagueLogo src={logo} alt="League Logo" />
      ) : (
        <Placeholder>No logo available</Placeholder>
      )}
      <LeagueInfo>
        <LeagueName>{leagueName || 'League name unavailable'}</LeagueName>
        <Season>{season ? `${season}/${season + 1}` : 'Season unavailable'}</Season>
      </LeagueInfo>
    </LeftSection>
  </LeagueHeaderWrapper>
);

export default LeagueHeader;
