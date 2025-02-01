import styled, { css } from 'styled-components';
import BaseButton from './BaseButton';
import { FaStar } from 'react-icons/fa';

export const FloatingNavbarButton = styled(BaseButton)`
  color: ${({ theme }) => theme.colors.text};
  width: 50px;
  height: 30px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const PredictButton = styled(BaseButton)`
  width: 80px;
  height: 28px;
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accentHover};
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.focus};
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const TabButton = styled(BaseButton)`
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  padding: ${({ theme }) => theme.spacing.small};
`;

export const HamburgerButton = styled.button`
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  background: none;
  color: ${({ theme }) => theme.colors.text};  
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.large};
  &:hover {
    color: ${({ theme }) => theme.colors.accent};  
  }
  div {
    width: 100%;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.text};
    transition: transform 0.3s ease;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.accentHover};
    color: ${({ theme }) => theme.colors.text};
  }
  ${({ isOpen }) =>
    isOpen &&
    css`
      div:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      div:nth-child(2) {
        opacity: 0;
      }
      div:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
      }
    `}
`;

export const SettingsButton = styled(BaseButton)`
  background: none;
  display: flex;
  align-items: center;
    border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.small};
    padding: ${({ theme }) => theme.spacing.small};
  svg {
    margin-right: 8px;
  }
`;

export const LogoutButton = styled(SettingsButton)`
  background-color: ${({ theme }) => theme.colors.error};
`;

export const FloatingButton = styled(BaseButton)`
  position: fixed;
  top: 18px;
  right: 65px;
  z-index: 1000;
  color: ${({ theme }) => theme.colors.text};
  width: 50px;
  height: 30px;
  background: none;
`;

export const SortButton = styled(BaseButton)`
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.accent : theme.colors.secondary};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary : theme.colors.textSecondary};
     padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
       color: ${({ theme }) => theme.colors.text};
`;

export const ToggleButton = styled(BaseButton)`
  background: ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  gap: 8px;
  padding: ${({ theme }) => theme.spacing.small};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  color: ${({ theme }) => theme.colors.text};
`;

export const LeagueButton = styled(BaseButton)`
   padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.text : theme.colors.textSecondary};
    height: 40px;
    width: 60px;
`;

export const Tab = styled(BaseButton)`
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.accentHover : theme.colors.secondary};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.text : theme.colors.textSecondary};
  border: ${({ $isActive, theme }) =>
    $isActive ? `2px solid ${theme.colors.accent}` : `1px solid ${theme.colors.divider}`};
  border-radius: ${({ theme }) => theme.borderRadius};

  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
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

export const SubTab = styled(Tab)`
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.accentHover : theme.colors.secondary};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.text : theme.colors.textMuted};
  font-size: 0.7rem;
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "400")};
  padding: ${({ theme }) => theme.spacing.xsmall} ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const ShowMoreTabButton = styled(BaseButton)`
  width: 85px;
   font-size: ${({ theme }) => theme.fontSizes.xsmall};
`;

export const ArrowButton = styled(BaseButton)`
  background: ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.small};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  color: ${({ theme }) => theme.colors.text};
`;

export const CustomDatePicker = styled.input`
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.2s ease;
  padding: 6px 12px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 500;
  width: 100px;
  height: 34px;
  background: ${({ theme }) => theme.colors.datePickerBackground};
`;

export const FilterButton = styled(BaseButton)`
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.buttonActive : theme.colors.secondary};
`;

export const StyledFilterButton = styled(BaseButton)`
  font-size: 0.7rem;
`;

export const CollapseExpandButton = styled(BaseButton)`
  padding: ${({ theme }) => theme.spacing.small};
  min-width: 45px;
  height: 25px;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  font-weight:bold;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBackground};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabledBackground};
    color: ${({ theme }) => theme.colors.disabledText};
    cursor: not-allowed;
  }
  }
`;

export const ActionButton = styled.button`
  width: 10px;
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accentHover};
    transform: scale(1.05);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabledBackground};
    cursor: not-allowed;
  }
`;

export const CloseButton = styled(BaseButton)`
  background: none;
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const SavedSlipsToggleButton = styled(BaseButton)`
  font-size: ${({ theme }) => theme.fontSizes.small};
  display: flex;
  align-items: center;
  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const DeleteButton = styled(BaseButton)`
  background: none;
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

export const DeleteBetButton = styled.button`
    position: absolute;
    right: 10px;
    background-color: red;
    color: white;
    border: none;
    padding: 2px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: darkred;
    }
`;

export const TableFilterButton = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xsmall || "2px"};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

export const StyledStar = styled(FaStar)`
  font-size: 24px;
  cursor: pointer;
  color: ${({ isActive, theme }) =>
    isActive ? 'yellow' : theme.mode === 'light' ? '#000000' : '#ffffff'};
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;