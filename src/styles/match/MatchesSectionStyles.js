
import styled from 'styled-components';

export const SectionWrapper = styled.div`
   display: flex;
  flex-direction: column;
margin
  width: ${({ isBettingSlipOpen }) => (isBettingSlipOpen ? '440px' : '100%')};
  transition: width 0.3s ease;
  box-shadow: ${({ theme }) => theme.boxShadow};
  padding: ${({ theme }) => theme.spacing.xsmall};
`;

export const SectionHeader = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.text};
`;

export const LeagueSection = styled.div`
  width: ${({ isBettingSlipOpen }) => (isBettingSlipOpen ? '440px' : '90%')};
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.text};
`;

export const LeagueHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid
    ${({ theme }) => (theme.mode === 'light' ? '#000000' : 'transparent')};
  box-shadow: ${({ theme }) =>
    theme.mode === 'light'
      ? '0 0 5px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.2)'
      : 'none'};
  transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accentHover};
    box-shadow: ${({ theme }) =>
    theme.mode === 'light'
      ? '0 0 10px rgba(0, 0, 0, 0.7), 0 0 15px rgba(0, 0, 0, 0.4)'
      : 'none'};
  }
`;


export const LeagueLogo = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  object-fit: contain;
  margin-right: ${({ theme }) => theme.spacing.small};
`;

export const LeagueName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const MatchesList = styled.div`
  display: flex;
  flex-direction: column;
`;
