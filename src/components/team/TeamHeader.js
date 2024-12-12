import React from 'react';
import styled from 'styled-components';

const TeamHeader = ({ team }) => {
  const stadiumImage = team?.[0]?.venue?.image || '';

  return (
    <TeamInfoSection backgroundImage={stadiumImage}>
      <TeamHeaderContent>
        <TeamLogoDetails src={team?.[0]?.info.logo || ''} alt={team?.[0]?.name || 'Team logo'} />
        <TeamName>{team?.[0]?.info.name || 'Team name'}</TeamName>
        <TeamInfoItem><strong>Stadium:</strong> {team?.[0]?.venue?.name || ''}</TeamInfoItem>
        <TeamInfoItem><strong>Capacity:</strong> {team?.[0]?.venue?.capacity || ''}</TeamInfoItem>
        <TeamInfoItem><strong>Coach:</strong> {team?.[0]?.coach?.name || ''}</TeamInfoItem>
      </TeamHeaderContent>
    </TeamInfoSection>
  );
};

export default TeamHeader;

// Styled components
const TeamInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.75);
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
  color: #ffffff;
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
    width:100%;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.55);
    border-radius: 10px;
    z-index: 1;
  }

  * {
    position: relative;
    z-index: 2;
  }
`;

const TeamHeaderContent = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const TeamLogoDetails = styled.img`
  width: 72px;
  height: 72px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const TeamName = styled.h2`
  font-size: 22px;
  margin: 0;
  color: #ffffff;
  text-align: center;
`;

const TeamInfoItem = styled.div`
  font-size: 13px;
  color: #dcdcdc;
  margin: 6px 0;

  strong {
    font-weight: 600;
  }
`;
