import styled from 'styled-components';

export const AdviceContainer = styled.div`
    text-align: center;
      border-bottom: 1px solid ${({ theme }) => theme.colors.text};
`;

export const OddsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap:  ${({ theme }) => theme.spacing.medium};
    max-width: 520px;
  border-radius: ${({ theme }) => theme.borderRadius};


  margin-top: 10px;
`;

export const OddsColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width:25%;
`;

export const BetNameContainer = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: ${({ theme }) => theme.borderRadius};

    font-size: ${({ theme }) => theme.fontSizes.xsmall};

`;

export const OddsRow = styled.div`
  display: flex;
  justify-content: space-between;
   padding: ${({ theme }) => theme.spacing.xsmall};

  font-size: ${({ theme }) => theme.fontSizes.xsmall};

  cursor: pointer;
  transition: background-color 0.3s ease;
  border-top: 0.1px solid ${({ theme }) => theme.colors.text};

  &:hover {
    background-color: #424951;
  }
`;

export const OddsCellValue = styled.div`
  flex: 1;
  text-align: left;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 10px;

`;

export const OddCell = styled.div`
  flex: 1;
  text-align: right;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 10px;

`;

export const BetNameRow = styled.div`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};

  cursor: pointer;

   padding: ${({ theme }) => theme.spacing.xsmall};
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: left;

  &:hover {
    background-color: ${({ theme }) => theme.colors.quaternary};
  }
`;
