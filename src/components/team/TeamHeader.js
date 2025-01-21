import React from 'react';

import {
  TeamHeaderContent, TeamImage, TeamInfoItem, TeamHeaderWrapper, TeamLogoDetails, TeamName
} from '../../styles/team/TeamStyles';

const TeamHeader = ({ team }) => {
  const { image: stadiumImage, name: stadiumName, capacity } = team?.[0]?.venue || {};
  const { logo, name: teamName } = team?.[0]?.info || {};
  const { name: coachName } = team?.[0]?.coach || {};

  return (
    <TeamHeaderWrapper>
      <TeamImage src={stadiumImage} alt={stadiumName} />

      <TeamHeaderContent>
        <TeamLogoDetails src={logo || ''} alt={teamName || 'Team logo'} />
        <TeamName>{teamName || 'Team name'}</TeamName>

        <TeamInfoItem><strong>Capacity:</strong> {capacity || 'N/A'}</TeamInfoItem>
        <TeamInfoItem><strong>Coach:</strong> {coachName || 'N/A'}</TeamInfoItem>
      </TeamHeaderContent>
    </TeamHeaderWrapper>
  );
};

export default TeamHeader;