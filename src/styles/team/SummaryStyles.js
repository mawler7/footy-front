import styled from "styled-components";
import { TableCell } from "../content/GlobalStyles";

export const StyledStandingWrapper = styled.div`
  transition: width 0.3s ease;
    padding: ${({ theme }) => theme.spacing.xsmall};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};  
  margin-auto;
      ${({ theme }) => theme.media.tablet} {
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
            padding:0;

    }
`;


export const SummaryTableWrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 10px;
`;

export const SummaryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    border-radius: 10px;
`;

export const RoundHeader = styled.h4`
    color: ${({ theme }) => theme.colors.white};
        font-size: ${({ theme }) => theme.fontSizes.small};
    font-weight: bold;
    border-bottom: 1px solid #34495e;
    padding-bottom: ${({ theme }) => theme.spacing.xsmall};
    margin-bottom: ${({ theme }) => theme.spacing.xsmall};
      margin-auto;
      ${({ theme }) => theme.media.tablet} {
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
            padding:0;

    }
`;

export const TableWrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 8px;
    overflow: hidden;
`;

export const TableRow = styled.div`
  display: flex;
  align-items: center; /* Wyrównanie pionowe w wierszu */
  justify-content: space-between;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.small};
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;






export const FormItem = styled.div`
  width: 15px;
  height: 15px;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: ${({ result }) => (result === 'W' ? 'green' : result === 'D' ? 'orange' : result === 'L' ? 'red' : '')};
  color: white;
  border-radius: 3px;
          font-size: ${({ theme }) => theme.fontSizes.xsmall};
`;

export const TeamLogo = styled.img`
z
    width: 20px;
    height: 20px;
    object-fit: contain;
`;

export const TeamScoreWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: ${({ theme }) => theme.spacing.small}; /* Mniejszy odstęp */
`;

export const TeamName = styled.div`
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
  color: ${({ theme }) => theme.colors.white};
  white-space: nowrap;
  overflow: hidden;

  text-align: ${({ align }) => align || 'left'};

  text-overflow: ellipsis;
    text-align: ${({ align }) => align || 'center'};
    ${({ theme }) => theme.media.tablet} {
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
        max-width: 80px; /* Inna szerokość dla urządzeń mobilnych */
  text-overflow: ellipsis;

    }
`;



export const ScoreCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Wyśrodkowanie wyniku */
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
  color: ${({ theme }) => theme.colors.white};
  flex: 0 0 25px; /* Stała szerokość wyniku */
  text-align: center;
`;

export const ResultIndicatorCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
  flex: 1; /* Spójny rozmiar z DateCell */
  gap: ${({ theme }) => theme.spacing.small};
`;

export const AwayTeamCell = styled(TableCell)`

  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1; /* Spójny rozmiar z DateCell */
  gap: ${({ theme }) => theme.spacing.small};
`;

export const DateCell = styled(TableCell)`
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
  vertical-align: middle; /* Dodatkowe wyrównanie pionowe */
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;