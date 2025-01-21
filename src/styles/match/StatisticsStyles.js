import styled from "styled-components";


export const StatsContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xlarge};
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
`;

export const StatRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.small};
  padding: ${({ theme }) => theme.spacing.small};
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  width: ${({ isBettingSlipOpen }) => (isBettingSlipOpen ? '60%' : '95%')};
  &:last-child {
    border-bottom: none;
  }
`;

export const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textSecondary};
  flex: 1;

`;

export const ProgressBar = styled.div`
  flex: 2;
  position: relative;
  height: 10px;
  background-color: ${({ theme }) => theme.colors.divider};
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  display: flex;
  margin: 0 ${({ theme }) => theme.spacing.xsmall};
`;

export const HomeProgress = styled.div`
  background-color: ${({ theme }) => theme.colors.accent};
  height: 100%;
  transition: width 0.3s ease;
`;

export const AwayProgress = styled.div`
  background-color: ${({ theme }) => theme.colors.error};
  height: 100%;
  transition: width 0.3s ease;
`;

export const Values = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xxsmall};  
`;

export const Value = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  min-width: 50px;  
`;