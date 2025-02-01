import styled from "styled-components";

export const TeamHeaderWrapper = styled.div`
  width:420px;
  padding:${({ theme }) => theme.spacing.small};
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.borderRadius};
  position: relative;
  height: auto;
  background-image: ${({ backgroundImage }) =>
    backgroundImage ? `url(${backgroundImage})` : "none"};
  background-size: cover; 
  background-position: center center;
  background-repeat: no-repeat;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius};
    background: ${({ theme }) => theme.colors.backgroundOverlay};
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
  border-radius: ${({ theme }) => theme.borderRadius};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
    ${({ theme }) => theme.media.mobile} {
      width: 100%;   
  height: 100%;  
  }
`;

export const TeamHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const TeamLogoDetails = styled.img`
  padding: ${({ theme }) => theme.spacing.large};
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const TeamInfoItem = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: ${({ theme }) => theme.spacing.xsmall} 0;
  padding: ${({ theme }) => theme.spacing.small};
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
