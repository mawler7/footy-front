import React from 'react';
import {
  TeamHeaderContent,
  TeamImage,
  TeamInfoItem,
  TeamHeaderWrapper,
  TeamLogoDetails,
  TeamName,
} from '../../styles/team/TeamStyles';

const TeamHeader = ({ team }) => {
  const stadiumImage = team?.[0]?.venue?.image || '/default-stadium.jpg';
  const stadiumName = team?.[0]?.venue?.name || 'Unknown Stadium';
  const capacity = team?.[0]?.venue?.capacity || 'N/A';
  const logo = team?.[0]?.info?.logo || '';
  const teamName = team?.[0]?.info?.name || 'Team name unavailable';
  const coachName = team?.[0]?.coach?.name || 'N/A';

  return (
    <TeamHeaderWrapper>
      <TeamImage src={stadiumImage} alt={stadiumName} />
      <TeamHeaderContent>
        <TeamLogoDetails src={logo} alt={teamName} />
        <TeamName>{teamName}</TeamName>
        <TeamInfoItem><strong>Capacity:</strong> {capacity}</TeamInfoItem>
        <TeamInfoItem><strong>Coach:</strong> {coachName}</TeamInfoItem>
      </TeamHeaderContent>
    </TeamHeaderWrapper>
  );
};

export default React.memo(TeamHeader);
