import styled from 'styled-components';
import { FlexContainer, BaseButton } from '../shared/SharedStyles';

export const FiltersWrapper = styled(FlexContainer)`
  flex-direction: column;
  ${({ theme }) => theme.media.mobile} {
  }
  min-width:435px;
`;

export const CalendarWrapper = styled(FlexContainer)`
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.default};
`;

export const FilterButtonsWrapper = styled(FlexContainer)`
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.small};
`;

export const ArrowButton = styled(BaseButton)`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  border-radius: 50%;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
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
    border: 1px solid ${({ theme }) => theme.colors.divider};
  }

  .react-datepicker__input-container input {
    background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.text};
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
    text-align: center;
      padding: ${({ theme }) => theme.spacing.small};

    width: 100px;
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