import styled, { createGlobalStyle } from 'styled-components';

// Globalny styl dla całej aplikacji
export const TeamDetailsStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #1e1e24;
    color: #ffffff;
  }
`;

// Wspólny kontener dla sekcji
export const SectionContainer = styled.div`
  background-color: #282b30;
  padding: 16px;
  margin: 16px auto;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  max-width: 800px;
  width: 100%;
`;

// Wspólny styl dla nagłówków sekcji
export const SectionHeader = styled.h2`
  font-size: 22px;
  text-align: center;
  margin-bottom: 16px;
  color: #ffffff;
`;

// Styl dla tabeli
export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #1e1e24;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 16px;
`;

// Styl dla wierszy tabeli
export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #282b30;
  }

  &:nth-child(odd) {
    background-color: #1e1e24;
  }

  &:hover {
    background-color: #3a3d42;
  }
`;

// Styl dla komórek tabeli
export const TableCell = styled.td`
  padding: 8px;
  text-align: center;
  font-size: 14px;
  color: #ffffff;
`;

// Przyciski
export const StyledButton = styled.button`
  background: ${({ $isActive }) => ($isActive ? 'rgba(68, 76, 78, 0.8)' : 'rgba(48, 54, 56, 0.6)')};
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#cccccc')};
  border: ${({ $isActive }) => ($isActive ? '2px solid #233' : '1px solid rgba(68, 76, 78, 0.5)')};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 16px;
  cursor: pointer;
  transition: background 0.3s ease, box-shadow 0.2s ease;

  &:hover {
    background: ${({ $isActive }) => ($isActive ? 'rgb(80, 90, 93)' : 'rgb(58, 63, 65)')};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(85, 94, 97, 0.6);
  }

  &:active {
    transform: scale(0.98);
  }
`;