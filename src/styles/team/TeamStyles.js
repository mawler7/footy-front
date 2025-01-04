import styled from "styled-components";

export const TeamInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.backgroundOverlay};
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  color: ${({ theme }) => theme.colors.text};
  position: relative;

  background-image: ${({ backgroundImage }) =>
    backgroundImage ? `url(${backgroundImage})` : "none"};
  background-size: contain; // Lub "cover"
  background-position: center center;
  background-repeat: no-repeat;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.backgroundOverlay};

    border-radius: ${({ theme }) => theme.borderRadius};
    z-index: 1;
  }

  * {
    position: relative;
    z-index: 2;
  }
`;


export const TeamImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; 
background-image: ${({ backgroundImage }) =>
    backgroundImage
      ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backgroundImage})`
      : "none"};
background-size: contain; // Lub "cover"
background-position: center top; 

  border-radius: ${({ theme }) => theme.borderRadius};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0; // Obraz jako tło
`;

export const TeamHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  text-align: center;
`;

export const TeamLogoDetails = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const TeamInfoItem = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: ${({ theme }) => theme.spacing.xsmall} 0;

  strong {
    font-weight: bold;
  }
`;

export const TeamName = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;

  ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.medium};
  }
`;
