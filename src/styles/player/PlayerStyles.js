import styled from "styled-components";

export const TeamLogo = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  gap: 5px;
  ${({ theme }) => theme.media.mobile} {
    width: 20px;
    height: 20px;
  }
`;

export const PlayerInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; 
  box-sizing: border-box;
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
  width:400px;
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
  align-item: center;
  text-align: center;
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
  align-items: center;  
  flex-wrap: nowrap; 
`;

export const TeamSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ isHome }) => (isHome ? 'flex-end' : 'flex-start')}; 
  text-align: ${({ isHome }) => (isHome ? 'right' : 'left')};
  width: 100%;  
  gap: 5px;
`;

export const TeamName = styled.span`
 font-size: ${({ theme }) => theme.fontSizes.xsmall};
`;

export const Score = styled.div`
  display: flex;
  align-items: center; 
  justify-content: center;  
  width: 75px;  
  font-weight: bold;
  gap: 5px;
`;

export const HeaderCellTeams = styled(TableHeader)`
`;




