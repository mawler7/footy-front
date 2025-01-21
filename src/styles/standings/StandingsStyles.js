import styled from 'styled-components';

export const StyledStandingWrapper = styled.div`
  transition: width 0.3s ease-in-out;  
  border-radius: ${({ theme }) => theme.borderRadius};
     max-width: 520px;
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

     margin-top: ${({ theme }) => theme.spacing.small};
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
  &:hover {
    cursor: pointer;
  }

`;

export const StyledTableCell = styled.td`
  text-align: center;
  padding: ${({ isBettingSlipOpen, theme }) =>
    isBettingSlipOpen ? theme.spacing.xsmall : theme.spacing.small};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
    ${({ theme }) => theme.media.mobile} {
          font-size: ${({ theme }) => theme.fontSizes.xsmall};
    }
`;

export const StyledTableHeader = styled.th`
  text-align: center;

  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  &:hover {
    text-decoration: underline;
  }
        ${({ theme }) => theme.media.mobile} {
          font-size: ${({ theme }) => theme.fontSizes.xsmall};
      padding:0;
    }
                 &.form-header {
    ${({ theme }) => theme.media.mobile} {
      display: none; 
    }
  }
`;

export const TeamCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.spacing.xsmall};  
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};

  &:hover {
    text-decoration: underline;
  }
    ${({ theme }) => theme.media.mobile} {
      padding:0;
    }
`;

export const TeamLogo = styled.img`
  width: 18px;
  height: 18px;
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
          font-size: ${({ theme }) => theme.fontSizes.xsmall};

  gap: ${({ theme }) => theme.spacing.xsmall};
  margin: 0 auto;
    ${({ theme }) => theme.media.mobile} {
   display:none;
  }
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

          font-size: ${({ theme }) => theme.fontSizes.xsmall};

`;

export const RankSquare = styled.div`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ color }) => color || 'transparent'};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-left:${({ theme }) => theme.spacing.xsmall};
          ${({ theme }) => theme.media.mobile} {
        width: 14px; 
          font-size: ${({ theme }) => theme.fontSizes.xsmall};
  border-radius: none;
    }
`;

export const StandingsFormItem = styled.div`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ color, theme }) => color || theme.colors.divider};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
  }
`;


export const StyledFixturesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.default};
  
`;

export const FixtureRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accentLight};
  }
`;

export const FixtureDate = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const FixtureTeam = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  flex: 1;
`;