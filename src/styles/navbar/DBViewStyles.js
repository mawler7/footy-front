import styled from "styled-components";

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.small};
  margin-top: ${({ theme }) => theme.spacing.small};
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const PaginationButton = styled.button`
  padding: ${({ theme }) => theme.spacing.xsmall};
  background-color: ${({ theme, active }) => (active ? theme.colors.accent : theme.colors.secondary)};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  &:hover {
      background-color: ${({ theme }) => theme.colors.accentHover};
  }
`;

export const Ellipsis = styled.span`
    padding: ${({ theme }) => theme.spacing.xsmall};
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.textSecondary};
    cursor: default;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

export const TableFilters = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

export const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.xsmall} ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme, variant }) =>
    variant === "gray" ? "#ccc" : theme.colors.accent};
  color: ${({ theme, variant }) =>
    variant === "gray" ? "#000" : theme.colors.textOnAccent || "#fff"};
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.small};
  transition: background-color 0.3s ease, transform 0.2s ease;
  
  &:hover {
    background-color: ${({ theme, variant }) =>
    variant === "gray" ? "#bbb" : theme.colors.accentHover};
    transform: translateY(-2px);
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.divider};
    cursor: not-allowed;
  }
`;

export const TableCell = styled.td``;

export const LeagueLogo = styled.img`
  object-fit: contain;
  border-radius: 8px;  
    height: max(20px);
    margin-right: ${({ theme }) => theme.spacing.xsmall};
    border-radius: 4px;
`;

export const ErrorText = styled.p`
    color: ${({ theme }) => theme.colors.error};
`;

export const LoadingText = styled.p`
    color: ${({ theme }) => theme.colors.info};
`;

export const NoMatchesText = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Tooltip = styled.div`
  position: relative;
  display: inline-block;

  &:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    background: rgba(0, 0, 0, 0.75);
    color: #fff;
    padding: 4px 8px;
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    border-radius: 4px;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    z-index: 100;
    opacity: 1;
    visibility: visible;
    transition: opacity 0.2s ease-in-out;
  }

  &::after {
    opacity: 0;
    visibility: hidden;
  }
`;

export const TeamWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const HomeTeamWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
`;

export const AwayTeamWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
`;

export const TeamLogo = styled.img`
  width: 18px;
  height: 18px;
  border-radius: 50%;
`;

export const HomeTeamName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  text-align: right;
`;

export const AwayTeamName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  text-align: left;
`;

export const Score = styled.span`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
`;

export const DropdownWrapper = styled.div`
    position: absolute;
    background: ${({ theme }) => theme.colors.secondary};
    border: 1px solid ${({ theme }) => theme.colors.divider};
    border-radius: ${({ theme }) => theme.borderRadius};
    box-shadow: ${({ theme }) => theme.shadows.medium};
    padding: ${({ theme }) => theme.spacing.xsmall};
    z-index: 100;
    max-height: 200px;
    overflow-y: auto;
`;

export const DropdownList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;

    li {
        padding: ${({ theme }) => theme.spacing.xsmall};
        cursor: pointer;
        font-size: ${({ theme }) => theme.fontSizes.small};
        &:hover {
            background: ${({ theme }) => theme.colors.accent};
            color: ${({ theme }) => theme.colors.textOnAccent};
        }
    }
`;

export const TableHeaderSortIcon = styled.span`
  margin-left: 8px;
  font-size: 12px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  pointer-events: none;
`;

export const MatchesWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.small};
  display: flex;
  flex-direction: column;
`;

export const FiltersWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.small};
  align-items: center;
  justify-content: center;
`;

export const FilterButton = styled.button`
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.textOnAccent || "#fff"};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  transition: background-color 0.3s ease, transform 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accentHover};
    transform: translateY(-2px);
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.divider};
    cursor: not-allowed;
  }
`;

export const InputField = styled.input`
  padding: ${({ theme }) => theme.spacing.xsmall};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.small};
  width: 110px;
  text-align: center;
`;

export const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent || "#f5f5f5"};
    transition: background-color 0.2s ease;
  }
`;

export const FilterDropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.default};
  padding: ${({ theme }) => theme.spacing.xsmall};
  margin: 0;
  list-style: none;
  z-index: 200;
  
  li {
    padding: ${({ theme }) => theme.spacing.xsmall};
    cursor: pointer;
    &:hover {
      background: ${({ theme }) => theme.colors.accent};
      color: ${({ theme }) => theme.colors.textOnAccent || "#fff"};
    }
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: ${({ theme }) => theme.spacing.xsmall};
    border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
  }
`;

export const TableHeader = styled.th`
  position: relative;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xsmall};
  text-align: center;
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  user-select: none;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

export const BottomRightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.small};
`;

export const TopRightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;