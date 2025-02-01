import styled from 'styled-components';

export const MatchHeaderWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.media.tablet} {
    flex-direction: column;
    text-align: center;
  }
`;

export const FixtureTeamLogo = styled.img`
  margin-bottom: ${({ theme }) => theme.spacing.small};
  object-fit: contain;
  max-height:80px;
  cursor: pointer;
  border-radius: 4px; 
  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.focus};
  }
      ${({ theme }) => theme.media.tablet} {
        margin-bottom: ${({ theme }) => theme.spacing.small};
        width:60px;
        height:70px;
  }
`;

export const FixtureDetailsTeamSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xsmall};  
  margin-bottom: ${({ theme }) => theme.spacing.medium};  
  width: 50%; 
    ${({ theme }) => theme.media.tablet} {
    justify-content:center;
    text-align: center;
      margin-bottom: ${({ theme }) => theme.spacing.xsmall};  
  }
`;

export const MatchDate = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.small};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
   ${({ theme }) => theme.media.tablet} {
  display:none;
  }
`;

export const MatchResult = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
     ${({ theme }) => theme.media.tablet} {
  font-size: ${({ theme }) => theme.fontSizes.large};
  }
`;

export const MatchStatus = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.medium};
    text-align: center;
       ${({ theme }) => theme.media.tablet} {
  display:none;
  }
`;

export const MatchTime = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  min-width: 125px; 
`;

export const ScoreSection = styled.div`
  font-size: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xsmall};
    min-width: 85px; 
`;

export const FixtureTeamName = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
       ${({ theme }) => theme.media.tablet} {
  font-size: ${({ theme }) => theme.fontSizes.small};
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.medium};
  width: ${({ isBettingSlipOpen }) => (isBettingSlipOpen ? '460px' : '660px')};
  transition: width 0.3s ease, box-shadow 0.3s ease;
  ${({ theme }) => theme.media.tablet} {
    width: 100%;
  }
`;
