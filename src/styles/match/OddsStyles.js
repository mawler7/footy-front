import styled from 'styled-components';

export const OddsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 25px;
  background-color: ${({ theme }) => theme.colors.background};
   padding: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.text : theme.colors.textSecondary};


  margin-top: 10px;
`;

export const OddsColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const BetNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius};

    font-size: ${({ theme }) => theme.fontSizes.xsmall};

`;

export const OddsRow = styled.div`
  display: flex;
  justify-content: space-between;
   padding: ${({ theme }) => theme.spacing.xsmall};

  background-color: ${({ theme }) => theme.colors.quaternary};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};

  cursor: pointer;
  transition: background-color 0.3s ease;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text};
  border-top: 1px solid ${({ theme }) => theme.colors.text};

  &:hover {
    background-color: #424951;
  }
`;

export const OddsCellValue = styled.div`
  flex: 1;
  text-align: left;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};

`;

export const OddCell = styled.div`
  flex: 1;
  text-align: right;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};

`;

export const BetNameRow = styled.div`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.medium};

  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.quinary};
   padding: ${({ theme }) => theme.spacing.xsmall};
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: left;

  &:hover {
    background-color: ${({ theme }) => theme.colors.quaternary};
  }
`;
