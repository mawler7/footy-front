import styled from 'styled-components';
import BaseButton from '../buttons/BaseButton';

export const H2HTableWrapper = styled.div`
 padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow-x: auto;
`;

export const SectionTitle = styled.h4`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
`;

export const FormContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xsmall};

`;

export const FormItem = styled.div`
  width: 20px;
  height: 20px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ result }) =>
    result === 'W' ? 'green' : result === 'D' ? 'orange' : 'red'};
  color: white;
  border-radius: 3px;
`;

export const ShowMoreTabButton = styled(BaseButton)`
  border: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.colors.accentHover};
  }
`;

export const TableRow = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  transition: background-color 0.3s;
  color: ${({ theme }) => theme.colors.text};
  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

export const DateCell = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  text-align: left;
  padding: ${({ theme }) => theme.spacing.small};
  width: 50px; /* Stała szerokość */
  flex-shrink: 0;  
`;

export const HomeTeamCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  gap: 8px;
`;

export const AwayTeamCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  gap: 8px;
`;

export const ScoreCell = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.small};
  width: 50px;
  flex-shrink: 0;
`;

export const TeamName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  font-weight:bold;
    white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: ${({ align }) => align || 'center'};

`;

export const TeamLogo = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`;

export const Score = styled.span`
 font-weight: bold;
`;