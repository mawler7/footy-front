import styled from 'styled-components';
import BaseButton from '../buttons/BaseButton';

export const H2HTableWrapper = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
    ${({ theme }) => theme.media.tablet} {
     padding: 0 ${({ theme }) => theme.spacing.small};;
  }
`;

export const SectionTitle = styled.h4`
  margin-bottom: ${({ theme }) => theme.spacing.xsmall}; 

  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
      ${({ theme }) => theme.media.tablet} {
     font-size: ${({ theme }) => theme.fontSizes.small};
  }
`;

export const FormContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xsmall};

`;

export const FormItem = styled.div`
  width: 20px;
  height: 20px;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ result }) =>
    result === 'W' ? 'green' : result === 'D' ? 'orange' : 'red'};
  color: white;
  border-radius: 3px;
      ${({ theme }) => theme.media.tablet} {
  width: 15px;
  height: 15px;
    }
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
 padding: ${({ theme }) => theme.spacing.xsmall};

  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  transition: background-color 0.3s;
  color: ${({ theme }) => theme.colors.text};
  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
        ${({ theme }) => theme.media.tablet} {
     padding: ${({ theme }) => theme.spacing.xsmall};
  }
`;

export const DateCell = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  text-align: left;
  padding: ${({ theme }) => theme.spacing.small};
  width: 50px;  
  flex-shrink: 0;  
`;

export const HomeTeamCell = styled.div`
    display: flex;
    align-items:  center;
    justify-content: flex-end; 
    flex: 2; 
        gap:4px; /* Brak odstępów między kolumnami */
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
    ${({ theme }) => theme.media.tablet} {
            gap: ${({ theme }) => theme.spacing.xsmall};
    }
`;

export const AwayTeamCell = styled(HomeTeamCell)`
    justify-content: flex-start; 
`;

export const ScoreCell = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; 
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
    color: ${({ theme }) => theme.colors.white};
    flex: 0.25; 
        ${({ theme }) => theme.media.mobile} {
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
            flex: 0.3; 

    }
`;

export const TeamName = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    color: ${({ theme }) => theme.colors.white};
    overflow: hidden;
    max-width: 150px; 
    ${({ theme }) => theme.media.mobile} {
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
        max-width: 150px;
    }
`;


export const TeamLogo = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  
`;

export const Score = styled.span`
 font-weight: bold;
`;