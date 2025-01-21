import styled from 'styled-components';
import BaseButton from '../buttons/BaseButton';
import { Radar } from 'react-chartjs-2';

export const PredictionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top:  ${({ theme }) => theme.spacing.large};
  transition: all 0.3s ease-in-out; 
    ${({ theme }) => theme.media.tablet} {
    flex-direction: column;
    text-align: center;
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.small};
  padding: ${({ isSubTab, theme }) =>
    isSubTab ? `0 ${theme.spacing.small}` : '0'};
`;

export const Tab = styled(BaseButton)`
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.accentHover : theme.colors.secondary};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.text : theme.colors.textSecondary};
  border: ${({ $isActive, theme }) =>
    $isActive
      ? `2px solid ${theme.colors.accent}`
      : `1px solid ${theme.colors.divider}`};
  border-radius: ${({ theme }) => theme.borderRadius};
  height: 34px;
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSizes.small};
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.2s ease;
  box-shadow: ${({ $isActive, theme }) =>
    $isActive ? theme.shadows.default : 'none'};

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.secondary};
    box-shadow: ${({ theme }) => theme.shadows.default};
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
    $isActive ? theme.colors.accentHover : theme.colors.background};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.text : theme.colors.mutedText};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '400')};
`;

export const SubTabsContainer = styled(TabsContainer)`
  border-top: 1px solid ${({ theme }) => theme.colors.divider};
`;



export const ChartWrapper = styled.div`
  width: ${({ isBettingSlipOpen }) => (isBettingSlipOpen ? '70%' : '80%')};  
  max-width: 700px; 
 min-width:360px;

  aspect-ratio: 1 / 1; /* Dodanie proporcji dla kwadratowego wykresu */
  border-radius: ${({ theme }) => theme.borderRadius};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto; /* Wyśrodkowanie */
  transition: width 0.3s ease-in-out, height 0.3s ease-in-out;  
     ${({ theme }) => theme.media.mobile} {
        width: 40%; /* Dopasowanie szerokości do rodzica */
  min-width: 250px; 
    }
`;


export const Title = styled.h3`
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
`;

export const AdviceText = styled.span`
  display: block;
      flex-direction: column;
    text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
      ${({ theme }) => theme.media.tablet} {
    flex-direction: column;
    text-align: center;
  }
`;

export const StyledRadar = styled(Radar)`
    color: ${({ theme }) => theme.colors.text};
`;