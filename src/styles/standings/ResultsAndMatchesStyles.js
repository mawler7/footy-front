import styled from "styled-components";
import { TableCell } from "../content/GlobalStyles";

export const StyledStandingWrapper = styled.div`
    transition: width 0.3s ease;
    padding: ${({ theme }) => theme.spacing.xsmall};
    border-radius: ${({ theme }) => theme.borderRadius};
    box-shadow: ${({ theme }) => theme.boxShadow};  
    margin: auto;
    ${({ theme }) => theme.media.mobile} {
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
        padding: 0;
    }
`;

export const SummaryTableWrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: ${({ theme }) => theme.borderRadius};
`;

export const SummaryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.borderRadius};
`;

export const RoundHeader = styled.div`
    padding: ${({ theme }) => theme.spacing.small} 0; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.small};
    font-weight: bold;
    border-bottom: 1px solid #34495e;
    margin: auto;
    ${({ theme }) => theme.media.mobile} {
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
        padding: 0;
    }
`;

export const TableWrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: ${({ theme }) => theme.borderRadius};
    overflow: hidden;
`;

export const TableRow = styled.div`
    display: flex;
    align-items: center; 
    cursor: pointer;
    border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
    padding: ${({ theme }) => theme.spacing.xsmall}; 
    gap: 0; 
    transition: background-color 0.3s ease;
    &:hover {
        background: ${({ theme }) => theme.colors.buttonHover};
    }
    ${({ theme }) => theme.media.mobile} {
        padding: ${({ theme }) => theme.spacing.small};
    }
`;

export const DateCell = styled(TableCell)`
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
    color: ${({ theme }) => theme.colors.white};
    text-align: left; 
    flex: 0.22;
    min-width: 75px;
    justify-content: flex-start;
    border:none;
    ${({ theme }) => theme.media.mobile} {
            min-width: 70px;

    }
`;

export const FormItem = styled.div`
    width: 20px;
    height: 20px;
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    align-items: center;
    display: flex;
    justify-content: center;
    background-color: ${({ result }) =>
        result === 'W' ? 'green' : result === 'D' ? 'orange' : result === 'L' ? 'red' : ''};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 3px;
`;

export const TeamLogo = styled.img`
    width: 20px;
    height: 20px;
    object-fit: contain;
    ${({ theme }) => theme.media.mobile} {
        width: 20px;
        height: 20px;
    }
`;

export const TeamScoreWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const TeamName = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    text-align: ${(props) => props.$align || 'left'};
    font-weight: ${(props) => (props.$isWinner ? 'bold' : 'normal')}; 
    overflow: hidden;
    max-width: 150px; 
    ${({ theme }) => theme.media.mobile} {
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
        max-width: 150px;
    }
`;

export const ScoreCell = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; 
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
    color: ${({ theme }) => theme.colors.white};
    flex: 0.4; 
        ${({ theme }) => theme.media.mobile} {
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
            flex: 0.3; 

    }
`;

export const ResultIndicatorCell = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    text-align: center;
`;

export const NoMatches = styled.div`
    text-align: center;
    color: ${({ theme }) => theme.colors.textMuted};
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
    margin-top: ${({ theme }) => theme.spacing.small};
`;

export const HomeTeamCell = styled.div`
    text-align: right;
    display: flex;
    align-items:  center;
    justify-content: flex-end; 
    flex: 2; 
        gap:4px;
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
    ${({ theme }) => theme.media.tablet} {
            gap: ${({ theme }) => theme.spacing.xsmall};
    }
`;

export const AwayTeamCell = styled(HomeTeamCell)`
    text-align: left;
    justify-content: flex-start; 
`;

export const RoundWrapper = styled.div`
    align-items: center;
    font-size: ${({ theme }) => theme.fontSizes.small};
    border-radius: ${({ theme }) => theme.borderRadius};
    cursor: pointer;
    ${({ theme }) => theme.media.tablet} {
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
    }
`;

export const Score = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    font-weight:bold;
`;
