import styled, { createGlobalStyle } from "styled-components";
import { LeagueButton } from "../buttons/buttons";

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
  }

  p {
    margin: 0;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.accent};
    &:hover {
      color: ${({ theme }) => theme.colors.accentHover};
    }
  }

  button {
    cursor: pointer;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius};
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }

  /* Klasy pomocnicze */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: ${({ theme }) => theme.spacing.medium};
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .blinking-time {
    animation: blink 1s infinite;
    cursor: pointer;
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
  }

  th, td {
    text-align: left;
    padding: ${({ theme }) => theme.spacing.small};
    border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  }

  th {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
  }

  td {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

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
  width: 420px;
`;

export const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  color: ${({ theme }) => theme.colors.text};
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
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

export default GlobalStyles;