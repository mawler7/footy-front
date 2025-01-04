import styled from "styled-components";

export const TeamName = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: ${({ align }) => align || 'center'};

    ${({ theme }) => theme.media.mobile} {
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
    }
`;

export const TeamLogo = styled.img`
    width: 24px;
    height: 24px;
    object-fit: contain;

    ${({ theme }) => theme.media.mobile} {
        width: 20px;
        height: 20px;
    }
`;

export const ScoreCell = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSizes.small};
    font-weight: bold;
    flex: 1; /* Mniejsza szerokość niż drużyny */

    ${({ theme }) => theme.media.mobile} {
        font-size: ${({ theme }) => theme.fontSizes.small};
    }
`;

export const DateCell = styled.div`
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    text-align: left;
    flex: 2.5;

    ${({ theme }) => theme.media.mobile} {
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
    }
`;

export const HomeTeamCell = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 5.5;  
    gap: ${({ theme }) => theme.spacing.xsmall};  

    ${({ theme }) => theme.media.mobile} {
        justify-content: center;
        flex-direction: column;
        gap: ${({ theme }) => theme.spacing.xxsmall};  
    }
`;

export const AwayTeamCell = styled(HomeTeamCell)`
    justify-content: flex-start;
`;
export const TableRow = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
    padding: ${({ theme }) => theme.spacing.small}; /* Mniejszy padding */
    gap: ${({ theme }) => theme.spacing.small}; /* Opcjonalnie dodanie gap dla całego wiersza */
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${({ theme }) => theme.colors.buttonHover};
    }

    ${({ theme }) => theme.media.tablet} {
        flex-direction: column;
        padding: ${({ theme }) => theme.spacing.xsmall};
    }
`;

export const NoMatches = styled.div`
    text-align: center;

    font-size: ${({ theme }) => theme.fontSizes.small};
    margin: ${({ theme }) => theme.spacing.medium} 0;
    font-style: italic;
    opacity: 0.75;

    ${({ theme }) => theme.media.tablet} {
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
    }
`;



export const RoundHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
     padding: ${({ theme }) => theme.spacing.xsmall};
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes.small};


    border-radius: ${({ theme }) => theme.borderRadius};
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) => theme.colors.buttonHover};
    }

    ${({ theme }) => theme.media.tablet} {
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
    }
`;

export const RoundWrapper = styled.div`

    align-items: center;
 
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes.small};


    border-radius: ${({ theme }) => theme.borderRadius};
    cursor: pointer;

   
    ${({ theme }) => theme.media.tablet} {
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
    }
`;

export const Score = styled.span`
  font-weight: bold;
`;
