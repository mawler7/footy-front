import styled from 'styled-components';

export const FixtureTeamLogo = styled.img`
  height: 80px;
  margin-bottom: ${({ theme }) => theme.spacing.small};
  object-fit: contain;
  cursor: pointer;
  border-radius: 4px; /* Dodanie zaokrągleń */
  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.focus};
  }
`;

export const FixtureDetailsTeamSection = styled.div`
 width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xsmall};  
`;

export const MatchDate = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.small};
  width: 100%;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const MatchHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xlarge};
  ${({ theme }) => theme.media.tablet} {
    flex-direction: column;
    text-align: center;
  }
`;

export const MatchResult = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

export const MatchStatus = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.medium};
    text-align: center;
`;

export const MatchTime = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ScoreSection = styled.div`
  font-size: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xsmall};
    min-width: 75px; /* Dopasowanie dla tabletów */
`;

export const FixtureTeamName = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.medium};
  width: ${({ isBettingSlipOpen }) => (isBettingSlipOpen ? '460px' : '660px')};
  box-shadow: ${({ theme }) => theme.shadows.default};
  transition: width 0.3s ease, box-shadow 0.3s ease;
  ${({ theme }) => theme.media.tablet} {
    width: 100%; /* Dopasowanie dla tabletów */
  }
`;
