// styles/shared/SharedStyles.js
import styled from 'styled-components';
import { theme } from '../themes';

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme, gap }) => gap || theme.spacing.small};
  flex-wrap: ${({ wrap }) => (wrap ? 'wrap' : 'nowrap')};
`;

// Button base styles
export const BaseButton = styled.button`
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing.small};
  font-size: ${({ theme }) => theme.fontSizes.small};
  transition: all 0.3s ease;
  cursor: pointer;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.accent : theme.colors.background};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.textOnAccent : theme.colors.text};

  &:hover {
    background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.hoverBackground : theme.colors.hoverBackground};
    transform: scale(1.05);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabledBackground};
    color: ${({ theme }) => theme.colors.disabledText};
    cursor: not-allowed;
  }
`;

export const CardContainer = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing.small};
`;


export const DropdownBase = styled.select`
  padding: ${({ theme }) => theme.spacing.small};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;

export const BrandLogo = styled.img`
  width: ${({ size }) => size || '40px'};
  height: ${({ size }) => size || '40px'};
  margin-right: ${({ theme }) => theme.spacing.small};
`;

export const BrandText = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;


export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme, gap }) => gap || theme.spacing.small};
  width: 100%;
`;

export const DraggableItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) =>
    theme.mode === 'light'
      ? '0 2px 4px rgba(0, 0, 0, 0.1)'
      : '0 2px 4px rgba(255, 255, 255, 0.1)'};
  transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accentHover};
    box-shadow: ${({ theme }) => theme.shadows.hover};
  }
`;

export const IconButton = styled.span`
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.text};
  margin-left: ${({ theme, ml }) => ml || theme.spacing.small};
  &:hover {
    background: ${({ theme }) => theme.colors.hoverBackground};
    color: ${({ theme }) => theme.colors.text};
    transform: scale(1.05);
    transition: transform 0.2s ease, background 0.2s ease;
  }
`;

export const SectionWrapper = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.colors.accentHover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.textSecondary};
    cursor: not-allowed;
  }
`;

export const HeaderContainer = styled(SectionWrapper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xsmall};
  min-width:${({ theme }) => theme.spacing.xlarge};
`;

export const InputField = styled.input`
  padding:${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.secondary};
  transition: border-color 0.3s ease;
  text-align:left; 

  width: ${({ width }) => width || '100%'};
  max-width: 120px; 
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.divider};
  background-color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;

  &:checked {
    background-color: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.focus};
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const BubbleContainerBase = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.spacing.small};
  right: ${({ show }) => (show ? theme.spacing.small : '-320px')}; 
  z-index: 1000;
  width: 320px;
  max-height: 80vh;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.shadows.default};
  transition: right 0.3s ease, opacity 0.3s ease;

  opacity: ${({ show }) => (show ? 1 : 0)};
  transform: ${({ show }) => (show ? 'translateY(0)' : 'translateY(100%)')};

  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    right: ${({ show }) => (show ? '0' : '-100%')};
  }
`;

export const BubbleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.textOnAccent};
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
`;

export const BubbleContent = styled(FlexContainer)`
  flex-direction: column;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.medium};
  gap: ${({ theme }) => theme.spacing.small};
  max-height: 70vh;
`;

export const TableCell = styled.div`
  margin: 0; 
  box-sizing: border-box;
`;

export const FiltersWrapper = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.small};
    margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const ErrorText = styled.p`
    color: ${({ theme }) => theme.colors.error};
    text-align: center;
    margin-top: ${({ theme }) => theme.spacing.medium};
`;

export const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.info};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

export const NoMatchesText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
      background-color: ${({ theme }) => theme.colors.secondary};
      color: ${({ theme }) => theme.colors.text};
      padding: ${({ theme }) => theme.spacing.small};
      text-align: left;
      border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  }

  td {
      padding: ${({ theme }) => theme.spacing.small};
      border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  }

  tr:hover {
      background-color: ${({ theme }) => theme.colors.hoverBackground};
  }
`;

export const LeagueLogo = styled.img`
    width: 24px;
    height: 24px;
    margin-right: ${({ theme }) => theme.spacing.small};
    border-radius: 4px;
    object-fit: cover;
`;
