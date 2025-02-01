import styled, { css } from 'styled-components';

const variants = {
  primary: css`
    background: linear-gradient(
      45deg,
      ${({ theme }) => theme.colors.accent},
      ${({ theme }) => theme.colors.accentHover}
    );
    color: #fff;
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.divider};
  `,
};

export const AdminActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  border: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  ${({ variant }) => variants[variant] || variants.primary};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accentHover};
  }
`;
