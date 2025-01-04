import styled from 'styled-components';


export const LeaguesContainerWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ theme }) => theme.sizes.navbarHeight};
  display: flex;
  align-items: center;
  justify-content: space-between;

  box-shadow: ${({ theme }) => theme.shadows.navbar};

  color: ${({ theme }) => theme.colors.textSecondary};
  z-index: 1000;
`;

export const LeagueFilterContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};

`;

export const Sidebar = styled.div`


  padding: ${({ theme }) => theme.spacing.small};

  transition: width 0.3s ease;

   
  ${({ theme }) => theme.media.tablet} {
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.spacing.small};
    font-size: ${({ theme }) => theme.fontSizes.small};
    width: 36px;
  }
`;

export const Header = styled.div`
 
  padding: ${({ theme }) => theme.spacing.small};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  display: flex;
  align-items: center;


  ${({ theme }) => theme.media.tablet} {
    display: none;
  }
`;

export const EditIcon = styled.span`
  cursor: pointer;
  margin-left: ${({ theme }) => theme.spacing.small};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.text};
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
  width: ${({ isBettingSlipOpen }) => (isBettingSlipOpen ? ' 40px' : '165px; ')};
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: ${({ theme }) => theme.spacing.small};
       border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
        border-top: 1px solid ${({ theme }) => theme.colors.divider};

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

  ${({ theme }) => theme.media.tablet} {
    justify-content: center;
    padding: ${({ theme }) => theme.spacing.xsmall};
    margin-bottom: ${({ theme }) => theme.spacing.small};
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    width: 30px;
  }
    ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    width: 30px;
}
`;

export const LeagueContainerName = styled.span`
  color: ${({ theme }) => theme.colors.text};
  flex-grow: 1;
  margin-left: ${({ theme }) => theme.spacing.small};

  ${({ theme }) => theme.media.tablet} {
    display: none;
  }
`;

export const FlagLogo = styled.img`
  height: 20px;
  width: 20px;
  object-fit: contain;
`;
