
import styled from 'styled-components';
import { ListContainer } from '../shared/SharedStyles';

export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  box-shadow: ${({ theme }) => theme.boxShadow};
  margin-auto;
  width: 435px;
`;

export const SectionHeader = styled.h2`
  border-radius: 5px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  font-size: ${({ theme }) => theme.fontSizes.small};
  padding: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.text};
  &:hover {
    box-shadow: ${({ theme }) =>
    theme.mode === 'light'
      ? '0 0 10px rgba(0, 0, 0, 0.7), 0 0 15px rgba(0, 0, 0, 0.4)'
      : 'none'};
  }
    box-shadow: ${({ theme }) =>
    theme.mode === 'light'
      ? '0 0 5px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.2)'
      : 'none'};
        cursor: pointer;
`;

export const LeagueSection = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.text};
`;

export const LeagueHeader = styled.div`
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xsmall};
    border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  box-shadow: ${({ theme }) =>
    theme.mode === 'light'
      ? '0 0 5px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.2)'
      : 'none'};
  transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;
`;


export const LeagueLogo = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 4px;
  object-fit: contain;
  margin-right: ${({ theme }) => theme.spacing.small};
`;

export const LeagueName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const MatchesList = styled(ListContainer)`
  border-radius: ${({ theme }) => theme.borderRadius};
`;
