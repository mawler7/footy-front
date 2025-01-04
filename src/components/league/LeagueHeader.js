import React from 'react';
import {
  LeagueHeaderWrapper,
  LeagueInfo,
  LeagueName,
  LeftSection,
  LeagueLogo,
  Placeholder,
  Season
} from '../../styles/league/LeagueHeaderStyles';

const LeagueHeader = ({ leagueName, logo, season, isBettingSlipOpen }) => {
  if (!leagueName || !logo || !season) {
    return (
      <LeagueHeaderWrapper isBettingSlipOpen={isBettingSlipOpen}>
        <Placeholder>Loading...</Placeholder>
      </LeagueHeaderWrapper>
    );
  }

  return (
    <LeagueHeaderWrapper>
      <LeftSection>
        <LeagueLogo src={logo} alt="League Logo" />
        <LeagueInfo>
          <LeagueName>{leagueName}</LeagueName>
          <Season>{`${season}/${season + 1}`}</Season>
        </LeagueInfo>
      </LeftSection>
    </LeagueHeaderWrapper>
  );
};

export default LeagueHeader;
