import styled from 'styled-components';
import { ListContainer, DraggableItem, IconButton } from '../shared/SharedStyles';

export const Sidebar = styled(ListContainer)`
  transition: width 0.3s ease;
  maring-top:60px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Header = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
    padding: ${({ theme }) => theme.spacing.xsmall};

  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  display: flex;
  align-items: center;
          ${({ theme }) => theme.media.mobile} {
    display: none;
  }
`;

export const EditIcon = styled(IconButton)``;

export const LeagueItem = styled(DraggableItem)`
    padding: ${({ theme }) => theme.spacing.small};

  width:140px;
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
        ${({ theme }) => theme.media.mobile} {
     width: 20px;
     align-items:center;
  }
  color: ${({ theme }) => theme.colors.text};

`;

export const LeagueContainerName = styled.span`
  color: ${({ theme }) => theme.colors.text};
  flex-grow: 1;
  margin-left: ${({ theme }) => theme.spacing.small};
  text-overflow: ellipsis;
    ${({ theme }) => theme.media.mobile} {
    display: none;
  }
`;

export const FlagLogo = styled.img`
  height: ${({ $leagueType }) => ($leagueType === 'League' ? '18px' : '12px')};
  width: ${({ $leagueType }) => ($leagueType === 'League' ? '18px' : '12px')};
  object-fit: contain;
  border-radius: ${({ $leagueType }) => ($leagueType === 'League' ? '5px' : '0')};
  margin-left: ${({ $leagueType }) => ($leagueType === 'League' ? '0' : '10px')};
  transition: all 0.3s ease; /* Płynne przejście */

`;



export const Tooltip = styled.div`
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
    color: ${({ theme }) => theme.colors.text};
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease;

  ${FlagLogo}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;

export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
`;