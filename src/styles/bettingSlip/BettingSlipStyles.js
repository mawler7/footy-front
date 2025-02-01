import styled from "styled-components";
import { FlexContainer, } from "../shared/SharedStyles";

export const TeamsLabel = styled.div`
    font-size: ${({ theme }) => theme.fontSizes.small};
`;

export const BetNameLabel = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
`;

export const BetValueLabel = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.xxsmall};
`;

export const OddsLabel = styled.div`
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
`;

export const BubbleContainerWrapper = styled.div`
    position: relative;
    width: 25%;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const BettingSlipWrapper = styled.div`
  position: fixed;
  right: 1px;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: -4px 0 6px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  z-index: 100;
`;

export const BettingSlipContentWrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.contentBackground};
    border-radius: ${({ theme }) => theme.borderRadius};
`;

export const BubbleContainer = styled.div`
    position: relative;
    width: 225px; 
    margin: auto;
    background-color: ${({ theme }) => theme.colors.container};
    box-shadow: ${({ theme }) => theme.shadows.default};
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: 10px;
`;

export const CompactHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
`;

export const BubbleHeader = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
`;

export const BubbleContent = styled(FlexContainer)`
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.danger};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.accentHover};
  }
`;

export const ActionButton = styled.button`
  border-radius: ${({ theme }) => theme.borderRadius};
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.small};

  &:hover {
    background-color: ${({ theme }) => theme.colors.accentHover};
  }
`;

export const SlipDetailsContainer = styled(FlexContainer)`
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.default};
`;

export const SavedSlipsToggleButton = styled.button`
    border-radius: 5px;
    border: none;
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: color 0.3s, transform 0.2s;

  &:hover {
    color: #ffffff;
    box-shadow: 0 4px 8px rgba(58, 135, 173, 0.2);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(58, 135, 173, 0.4);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const OddsInput = styled.input`
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: border-color 0.3s;
  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    outline: none;
  }
`;

export const MatchDate = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
    font-size: 10px;
    text-align: left;
`;

export const TeamNames = styled.div`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  color: ${({ theme }) => theme.colors.text};
`;

export const DeleteBetButton = styled.button`
    background: none;
    color: red;
    cursor: pointer;
    border: none;
    font-size: 13px;
    position: absolute;
    top: 2px;
    right: 2px;
`;

export const SlipDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xsmall};
    font-size: ${({ theme }) => theme.fontSizes.xsmall};

    p {
        margin: 0;
    }
`;

export const BubbleButtonGroup = styled.div`
    display: flex;
    width: 100%;
`;

export const BubbleItem = styled.div`
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
`;

export const Label = styled.label`
  font-weight: bold;
  margin-right: ${({ theme }) => theme.spacing.small};
  min-width: 80px;
`;

export const BubbleRowWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end; 
    border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
    border-top: 1px solid ${({ theme }) => theme.colors.divider};
    padding:5px;
`;

export const BetRow = styled.div`
    width: 225px;
    display: flex;
    gap: ${({ theme }) => theme.spacing.small}; 
    margin-bottom: ${({ theme }) => theme.spacing.small};
`;

export const TotalOdds = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  padding:5px;
  text-align: right; 
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
`;

export const PotentialWinnings = styled.div`
    text-align: right; /* Wyrównanie tekstu do prawej */
    padding:5px;
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
`;

export const EditableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
`;

export const SlipContentWrapper = styled(FlexContainer)`
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

export const BetDetails = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadow};
`;

export const Teams = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const BetName = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  font-style: italic;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const BetOdds = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
`;

export const BetInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
`;

export const SavedSlipsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
  left: 0;
  right: 0;
  z-index: 10; 
`;

export const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  border: none;
  padding: ${({ theme }) => theme.spacing.medium};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.shadow};
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accentHover};
    transform: scale(1.1);
  }
`;

export const EditableInput = styled.input`
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    width: 100%;
    max-width: 30%;
    border: 1px solid ${({ theme }) => theme.colors.divider};
    border-radius: ${({ theme }) => theme.borderRadius};
    text-align: right;
    height:12px;

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.accent};
    }
`;

export const BonusInput = styled(EditableInput)`
    max-width: 50px; 
`;

export const StakeInput = styled(EditableInput)`
    max-width: 50px;
`;

export const DeleteButton = styled.button`
  background: none;
  color: darkred;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.small};
  cursor: pointer;
  transition: color 0.3s, transform 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.red};
    transform: scale(1.1);
  }
`;

export const CompactSavedSlipsToggleButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xsmall};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, color 0.3s;
  color: ${({ theme }) => theme.colors.text};
  &:hover {
    color: ${({ theme }) => theme.colors.accentHover};
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }

  svg {
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
`;

export const BalanceInfo = styled(FlexContainer)`
  gap: ${({ theme }) => theme.spacing.small};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};

  strong {
    font-weight: bold;
  }

  span {
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
`;

export const SlipName = styled.span`
  font-size: 10.5px;
  color: ${({ theme }) => theme.colors.text};
  flex-grow: 1;
  text-overflow: ellipsis;
  overflow: hidden;
    width: 260px;
`;

export const SavedSlipItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid ${({ theme }) => theme.colors.divider};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBackground};
  }
`;

export const SavedBetsWrapper = styled.div`
`;

