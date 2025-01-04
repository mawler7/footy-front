import styled from "styled-components";

export const VideoBackground = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;  
  opacity: 0.6;
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

export const PlayerInfoContainer = styled.div`
    width: ${({ isBettingSlipOpen }) => (isBettingSlipOpen ? '480px' : '100%')};
    padding: ${({ theme }) => theme.spacing.medium};
  border-radius: 10px;
`;

export const PlayerHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;

export const PlayerPhoto = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
`;

export const PlayerName = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.larges};
    margin: 0;
`;

export const PlayerInfo = styled.div`
    display: flex;
    flex-direction: column;
     font-size: ${({ theme }) => theme.fontSizes.small};
            padding: ${({ theme }) => theme.spacing.small};
              border-bottom: 1px solid #333;
`;

export const InfoItem = styled.div`
     font-size: ${({ theme }) => theme.fontSizes.small};
         padding: ${({ theme }) => theme.spacing.xsmall};
color: #ddd;
    strong {
       color: #ddd;
    }
`;

export const SectionTitle = styled.h3`
     font-size: ${({ theme }) => theme.fontSizes.medium};
              padding: ${({ theme }) => theme.spacing.xsmall};
  border-bottom: 1px solid #333;
  
`;

export const StyledTable = styled.table`
  cursor:pointer;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;

`;

export const TableCell = styled.td`
  padding: 5px;
  text-align: center;
    border-bottom: 1px solid #333;
    border-top: 1px solid #333;
  font-size: 12px;
  min-width: ${({ minWidth }) => minWidth || 'auto'};
  max-width: ${({ maxWidth }) => maxWidth || 'auto'};
`;


export const TableHeader = styled.th`
  padding: ${({ theme }) => theme.spacing.small};
   min-width: ${({ minWidth }) => minWidth || 'auto'};
  max-width: ${({ maxWidth }) => maxWidth || 'auto'};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;



export const TableRow = styled.tr`
      cursor: pointer;
        &:hover {
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(85, 94, 97, 0.6);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const LeagueIcon = styled.img`
    vertical-align: middle;
      width: 22px;
  height: 22px;
  margin-left: 3px;
  margin-right: 3px;
  object-fit: contain;
  border-radius: 50%;
`;

export const Rating = styled.td`
  background-color: ${({ rating, theme }) =>
    rating >= 7.0
      ? theme.colors.success
      : rating >= 6
        ? theme.colors.warning
        : rating >= 1 ? theme.colors.error : theme.colors.primary};
  color:  ${({ rating, theme }) =>
    rating >= 7.0
      ? theme.colors.text
      : rating >= 6
        ? theme.colors.primary
        : theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  height: 14px;
  width: 18px;
  font-weight: bold;
  text-align: center;
      align-item: center;
;`

export const NoDataMessage = styled.p`
    font-size: 14px;
    color: #aaa;
    text-align: center;
    margin: 20px 0;
`;

export const TableCellTeams = styled(TableCell)`
    display: flex;
    
    align-items: center; // Wyśrodkowanie w pionie


    flex-wrap: nowrap; // Zapobiega zawijaniu treści
`;


export const TeamSection = styled.div`
    display: flex;
    align-items: center;
  justify-content: ${({ isHome }) => (isHome ? 'flex-end' : 'flex-start')}; 
  text-align: ${({ isHome }) => (isHome ? 'right' : 'left')};
    width: 100%;  
        gap: 10px;
`;

export const TeamName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
`;

export const Score = styled.div`
    display: flex;
    align-items: center; // Wyśrodkowanie w pionie
    justify-content: center; // Wyśrodkowanie w poziomie
    width: 65px; // Stała szerokość dla spójnego wyrównania
    font-weight: bold;
`;


export const HeaderCellTeams = styled(TableHeader)`

`;




