import styled, { createGlobalStyle } from "styled-components";
import { LeagueButton } from "./buttons/buttons";
export const LeagueLogo = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  object-fit: contain;
  margin-right: ${({ theme }) => theme.spacing.small};
`;

export const Tooltip = styled.div`
  visibility: hidden;
  opacity: 0;
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: #fff;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: visibility 0.2s ease, opacity 0.2s ease;

  ${LeagueButton}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;
export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

export const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  color: ${({ theme }) => theme.colors.secondary};
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const GlobalStyles = createGlobalStyle`
  :root {
    --border-radius: 6px;
    --box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    --spacing-small: 10px;
    --spacing-medium: 20px;
    --spacing-large: 30px;
    --color-primary: #1abc9c;
    --color-secondary: #1c1e24;
    --color-accent: #34495e;
    --color-accent-hover: #2c3e50;
    --color-error: #e74c3c;
    --color-divider: #444;
    --color-text-primary: #fff;
    --color-text-secondary: #aaa;
  }

  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  button {
    cursor: pointer;
    border-radius: ${({ theme }) => theme.borderRadius};
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: ${({ theme }) => theme.borderRadius};
  }
`;

export const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.xsmall};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
