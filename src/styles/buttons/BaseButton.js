import styled, { css } from 'styled-components';


// Bazowe style przycisków
export const baseButtonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xsmall};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.97);
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.divider};
    color: ${({ theme }) => theme.colors.mutedText};
    cursor: not-allowed;
  }
`;

export const BaseButton = styled.button`
  ${baseButtonStyles};
`;


export default BaseButton;