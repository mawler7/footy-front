import styled from 'styled-components';

export const TabContainerWrapper = styled.div`
  gap: ${({ theme }) => theme.spacing.large};
align-items:center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};

`;
export const SubTabContainerWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
   padding: ${({ theme }) => theme.spacing.xsmall};
  box-shadow: ${({ theme }) => theme.shadows.default};

`;

