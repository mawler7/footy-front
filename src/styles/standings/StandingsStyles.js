import styled from 'styled-components';

export const StyledStandingWrapper = styled.div`
  width: ${({ isBettingSlipOpen }) => (isBettingSlipOpen ? '60%' : '100%')};  
  transition: width 0.3s ease-in-out;  
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.large};

`;

export const GroupSpacing = styled.div`
  margin: ${({ theme }) => theme.spacing.xsmall} 0;
`;

export const GroupTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

export const StyledTableContainer = styled.table`
  background-color: ${({ theme }) => theme.colors.primary};
  border-collapse: collapse;
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
  ${({ theme }) => theme.media.desktop} {
    font-size: ${({ theme }) => theme.fontSizes.medium};
  }
`;

export const StyledTableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundOverlay};
    cursor: pointer;
  }
`;

export const StyledTableCell = styled.td`
  text-align: center;
  padding: ${({ isBettingSlipOpen, theme }) =>
    isBettingSlipOpen ? theme.spacing.xsmall : theme.spacing.small};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  width:35px;

`;

export const StyledTableHeader = styled.td`
  text-align: center;
  padding: ${({ isBettingSlipOpen, theme }) =>
    isBettingSlipOpen ? theme.spacing.xsmall : theme.spacing.small};
  font-size: ${({ theme }) => theme.fontSizes.small};
  width:35px;
    &:hover {
    text-decoration: underline;
  }
`;

export const TeamCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.spacing.small};  
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  padding: ${({ isBettingSlipOpen, theme }) =>
    isBettingSlipOpen ? theme.spacing.xsmall : theme.spacing.xsmall};
  &:hover {
    text-decoration: underline;
  }
`;

export const TeamLogo = styled.img`
  width: 20px;
  height: 20px;
  border-radius: ${({ theme }) => theme.borderRadius};
  object-fit: contain;
`;

export const Legend = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xsmall};
    margin-top: ${({ theme }) => theme.spacing.medium};
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;

  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const LegendTitle = styled.h4`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xsmall};
  margin-top: -${({ theme }) => theme.spacing.xsmall};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
`;

export const LegendColor = styled.div`
  width: 15px;
  height: 15px;
  margin-right: ${({ theme }) => theme.spacing.small};
  background-color: ${({ color }) => color};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: center; 
  gap: ${({ theme }) => theme.spacing.xsmall};
  margin: 0 auto;
`;

export const StyledFilterButton = styled.button`
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.accent : theme.colors.secondary};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.text : theme.colors.textSecondary};
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
  }
`;

export const StyledTableTeamCell = styled.td`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};  
  padding: ${({ isBettingSlipOpen, theme }) =>
    isBettingSlipOpen ? theme.spacing.xsmall : theme.spacing.small};
`;

export const RankSquare = styled.div`
  width: 25px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ color }) => color || 'transparent'};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.small};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-left:${({ theme }) => theme.spacing.small};
`;

export const StandingsFormItem = styled.div`
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  font-weight: bold;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ color, theme }) => color || theme.colors.divider};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
  }
`;
