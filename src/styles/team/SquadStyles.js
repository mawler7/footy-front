import styled from "styled-components";
import { sharedTheme } from '../content/themes';



export const LeagueFilterWrapper = styled.div`
  display: flex;
  gap: 12px;
     padding: ${({ theme }) => theme.spacing.large};
  flex-wrap: wrap;
  justify-content: center;

`;

export const LeagueButton = styled.button`
  position: relative;
     height: 40px;
    width: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${sharedTheme.transition};

  &:hover {
    background: ${({ $isActive }) => ($isActive ? '#4b5357' : sharedTheme.backgroundColorHover)};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;

export const LeagueLogoImage = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
  pointer-events: none;
  border-radius: 5px;
`;

export const LeagueTooltip = styled.div`
  visibility: hidden;
  opacity: 0;
  position: absolute;
  bottom: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%);
 
  color: ${sharedTheme.fontColor};
  padding: 6px 12px;
  border-radius: ${sharedTheme.borderRadius};
  font-size: 12px;
  white-space: nowrap;
  box-shadow: ${sharedTheme.boxShadow};
  transition: visibility 0.3s ease, opacity 0.3s ease, transform 0.3s ease;

  ${LeagueButton}:hover & {
    visibility: visible;
    opacity: 1;
    transform: translateX(-50%) translateY(-5px);
  }

  @media (max-width: 768px) {
    font-size: 10px;
    padding: 4px 8px;
  }
`;

export const SquadTable = styled.table`
  table-layout: auto;
  border-collapse: collapse;
  border-radius: ${sharedTheme.borderRadius};
  box-shadow: ${sharedTheme.boxShadow};
  overflow: hidden;
`;

export const TableHeaderRow = styled.tr`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  height: 30px;
`;

export const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: center;
  vertical-align: middle;
  font-size: 14px;

`;

export const TableStatHeaderCell = styled.th`
  padding: 10px;
  text-align: center;
  vertical-align: middle;
  font-size: 12px;
  padding: ${({ theme }) => theme.spacing.xsmall}  ;
      &:hover {
      cursor:pointer;
    text-decoration: underline;
  }
`;

export const PositionGroupSeparator = styled.tr`
  height: 15px;
 
`;

export const PlayerRow = styled.tr`
  cursor: pointer;
  &:hover {
    background: ${sharedTheme.backgroundColorHover};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const PlayerInfoCell = styled.td`
  vertical-align: middle;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
 
  border-bottom: 1px solid ${({ theme }) => theme.borderColor || '#444'};
`;

export const StatCell = styled.td`
  text-align: center;
  vertical-align: middle;
  font-size: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor || '#444'};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PlayerDetailsWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const PlayerNameText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.small};
    padding: ${({ theme }) => theme.spacing.xsmall}  ;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
        &:hover {
      cursor:pointer;
    text-decoration: underline;
  }
`;
