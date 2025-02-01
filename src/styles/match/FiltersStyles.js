import styled from 'styled-components';
import { FlexContainer, BaseButton } from '../shared/SharedStyles';

export const FiltersWrapper = styled(FlexContainer)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.medium};
  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
  }
  min-width: 435px;
`;

export const CalendarWrapper = styled(FlexContainer)`
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.default};
  flex-grow: 0; 
`;


export const FilterButtonsWrapper = styled(FlexContainer)`
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  flex-wrap: nowrap;
`;

export const ArrowButton = styled(BaseButton)`
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.accentHover : theme.colors.secondary};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.text : theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.borderRadius};

  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.2s ease;
  box-shadow: ${({ $isActive, theme }) =>
    $isActive ? `0 3px 6px ${theme.colors.shadowAccent}` : "none"};

  &:hover {
    background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.accentHover : theme.colors.hoverSecondary};
    color: ${({ theme }) => theme.colors.text};
    box-shadow: ${({ $isActive, theme }) =>
    $isActive ? `0 4px 8px ${theme.colors.shadowAccent}` : `0 3px 6px ${theme.colors.shadowLight}`};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.focus};
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const FilterButton = styled(BaseButton)`
  min-width: 50px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.active : theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius};
  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBackground};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabledBackground};
    color: ${({ theme }) => theme.colors.disabledText};
  }
`;

export const StyledDatePickerWrapper = styled.div`
  .react-datepicker {
    border-radius: ${({ theme }) => theme.borderRadius};
    box-shadow: ${({ theme }) => theme.shadows.default};
  }

  .react-datepicker__input-container input {
    background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.text};
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
    text-align: center;
      padding: ${({ theme }) => theme.spacing.small};

    width: 70px;
    border: 1px solid ${({ theme }) => theme.colors.divider};
    border-radius: ${({ theme }) => theme.borderRadius};
  }
`;

export const ControlsContainer = styled(FlexContainer)`
  justify-content: flex-end;
`;

export const CollapseExpandButton = styled(BaseButton)`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const Tooltip = styled.div`
  position: absolute;
  bottom: -100%; 
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  box-shadow: ${({ theme }) => theme.shadows.default};
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease-in-out;

  ${TooltipWrapper}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;