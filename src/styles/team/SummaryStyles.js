import styled from "styled-components";
import { TableCell } from "../GlobalStyles";

export const StyledStandingWrapper = styled.div`
  width: ${({ isBettingSlipOpen }) => (isBettingSlipOpen ? '60%' : '100%')};  
  transition: width 0.3s ease;

  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};  

  margin: 0 auto;
 
`;


export const SummaryTableWrapper = styled.div`

    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 10px;
    
    padding: ${({ theme }) => theme.spacing.small};

`;

export const SummaryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    padding: ${({ theme }) => theme.spacing.xsmall};
    border-radius: 10px;
    
 
`;

export const RoundHeader = styled.h4`
    color: ${({ theme }) => theme.colors.white};
        font-size: ${({ theme }) => theme.fontSizes.small};
    font-weight: bold;
    border-bottom: 1px solid #34495e;
    padding-bottom: ${({ theme }) => theme.spacing.xsmall};
    margin-bottom: ${({ theme }) => theme.spacing.xsmall};

`;

export const TableWrapper = styled.div`

    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 8px;
    overflow: hidden;
`;

export const TableRow = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid #555;
    padding: ${({ theme }) => theme.spacing.small};
    &:hover {
        background: rgba(255, 255, 255, 0.08);
    }
`;

export const DateCell = styled(TableCell)`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.white};
    text-align: left;
    width: 120px;
`;

export const FormItem = styled.div`
  width: 20px;
  height: 20px;
  font-size: 12px;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: ${({ result }) => (result === 'W' ? 'green' : result === 'D' ? 'orange' : result === 'L' ? 'red' : '')};
  color: white;
  border-radius: 3px;
`;

export const TeamLogo = styled.img`
    width: 22px;
    height: 22px;
    object-fit: contain;
`;

export const TeamName = styled.div`
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
            font-weight: bold;
    color: ${({ theme }) => theme.colors.white};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const ScoreCell = styled.div`
    text-align: center;
    width: 45px;
    font-size: 13px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.white};
`;

export const ResultIndicatorCell = styled.div`
    width: 40px;
    text-align: center;
`;

export const NoMatches = styled.div`
    text-align: center;
    color: #bbb;
    font-size: 14px;
    margin-top: 10px;
`;

export const HomeTeamCell = styled(TableCell)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 50%;
  gap: ${({ theme }) => theme.spacing.small};
`;

export const AwayTeamCell = styled(TableCell)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 50%;
  gap: ${({ theme }) => theme.spacing.small};
`;

