// LeagueStyles.js
import styled from 'styled-components';



export const RoundHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.medium};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  cursor: pointer;
`;

export const ResultsTableWrapper = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.default};
`;


export const LeagueFilterContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const Sidebar = styled.div`
  margin-top: ${({ theme }) => theme.spacing.small};
  margin-left: ${({ theme }) => theme.spacing.xsmall};
  transition: width 0.3s ease;
   width: ${({ isBettingSlipOpen }) => (isBettingSlipOpen ? '40px' : '145px; ')};


  ${({ theme }) => theme.media.tablet} {
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.spacing.small};
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    width: 36px;
  }
`;

export const Header = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.small};
  margin-left: ${({ theme }) => theme.spacing.small};

  ${({ theme }) => theme.media.tablet} {
    display: none;
  }
`;

export const EditIcon = styled.span`
  cursor: pointer;
  margin-left: ${({ theme }) => theme.spacing.small};
  font-size: ${({ theme }) => theme.fontSizes.medium};

&:hover {
  background: ${({ theme }) => theme.colors.hoverBackground};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.hover};
  transform: scale(1.05);
  transition: transform 0.2s ease, background 0.2s ease;
}

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.focusOutline};
  }

  &:active {
    transform: scale(0.97);
  }

  ${({ theme }) => theme.media.mobile} {
    justify-content: center;
    padding: ${({ theme }) => theme.spacing.xsmall};
    margin-bottom: ${({ theme }) => theme.spacing.small};
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
`;

export const LeagueItem = styled.div`
 
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xsmall};
  padding: ${({ theme }) => theme.spacing.xsmall};
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: background-color 0.3s ease;    
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  &:hover {
    background-color: ${({ theme }) => theme.colors.accentHover};
    box-shadow: ${({ theme }) => theme.shadows.hover};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.focusOutline};
  }

  &:active {
    transform: scale(0.97);
  }
  width: ${({ isBettingSlipOpen }) => (isBettingSlipOpen ? '140px' : '140px')};

  ${({ theme }) => theme.media.tablet} {
  justify - content: center;
  padding: ${({ theme }) => theme.spacing.xsmall};
  margin - bottom: ${({ theme }) => theme.spacing.small};
  font - size: ${({ theme }) => theme.fontSizes.xsmall};
  width: 30px;
}
    ${({ theme }) => theme.media.mobile} {
  font - size: ${({ theme }) => theme.fontSizes.xsmall};
  width: 30px;
}
`;

export const LeagueContainerName = styled.span`
color: ${({ theme }) => theme.colors.text};
flex-grow: 1;
margin-left: ${({ theme }) => theme.spacing.xsmall};

  ${({ theme }) => theme.media.tablet} {
  display: none;
}
`;

export const FlagLogo = styled.img`
height: 20px;
width: 20px;
object - fit: contain;
`;

export const LeagueName = styled.h1`
font - size: 1.25rem;
color: ${({ theme }) => theme.colors.text};
margin: 0;
`;