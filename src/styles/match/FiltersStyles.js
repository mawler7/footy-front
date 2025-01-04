import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import BaseButton from '../buttons/BaseButton';

export const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

   margin-bottom: -${({ theme }) => theme.spacing.medium};
  width: 100%;
 
        
`;

export const CalendarWrapper = styled.div`
  display: flex;
  align-items: center;
 gap: 10px;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.default};
`;

export const FilterButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap:  ${({ theme }) => theme.spacing.small};
`;

export const ArrowButton = styled(BaseButton)`
background-color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.colors.backgroundSecondary : theme.colors.white};
  color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.colors.text : theme.colors.textSecondary};
  color: ${({ theme }) => theme.colors.text};
   border-radius: ${({ theme }) => theme.borderRadius};
  width: 26px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBackground};
  }
`;

export const CustomDatePicker = styled(DatePicker)`
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.colors.backgroundSecondary : theme.colors.white};
  color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.colors.text : theme.colors.textSecondary};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.small};
  box-shadow: ${({ theme }) => theme.shadows.default};
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  width: 100px;

  &:hover {
    background-color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.colors.hoverBackground : theme.colors.buttonHover};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
  }

 
  & .react-datepicker {
    background-color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.colors.backgroundSecondary : theme.colors.white} !important;
    border: none !important;
    box-shadow: ${({ theme }) => theme.shadows.default} !important;
    color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.colors.text : theme.colors.textSecondary} !important;
  }

  & .react-datepicker__header {
    background-color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.colors.background : theme.colors.backgroundSecondary} !important;
    border-bottom: 1px solid ${({ theme }) => theme.colors.divider} !important;
  }

  & .react-datepicker__day,
  & .react-datepicker__day-name {
    color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.colors.text : theme.colors.textSecondary} !important;
  }

  & .react-datepicker__day:hover {
    background-color: ${({ theme }) => theme.colors.hoverBackground} !important;
  }

  & .react-datepicker__day--selected {
    background-color: ${({ theme }) => theme.colors.accent} !important;
    color: ${({ theme }) => theme.colors.white} !important;
  }

  & .react-datepicker__input-container {
    input {
      background-color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.colors.backgroundSecondary : theme.colors.white} !important;
      color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.colors.text : theme.colors.textSecondary} !important;
      border: none;
      text-align: center;
      font-size: ${({ theme }) => theme.fontSizes.small};
      border-radius: ${({ theme }) => theme.borderRadius};
      padding: 8px;
      width: 100%;
      box-shadow: ${({ theme }) => theme.shadows.default};
      transition: background-color 0.3s ease, color 0.3s ease;

      &:hover {
        background-color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.colors.hoverBackground : theme.colors.buttonHover} !important;
      }

      &:focus {
        outline: 2px solid ${({ theme }) => theme.colors.accent} !important;
      }
    }
  }
`;

export const FilterButton = styled(BaseButton)`
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
min-width: 75px;
height: 25px;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  transition: background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBackground};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabledBackground};
    color: ${({ theme }) => theme.colors.disabledText};
  }
`;

export const ControlsContainer = styled.div`
  display: flex;
  justify-content: flex-end; 
`;