import styled from "styled-components";

export const EventsSection = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
  margin-top: ${({ theme }) => theme.spacing.medium};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  box-shadow: ${({ theme }) => theme.shadows.default};
  color: ${({ theme }) => theme.colors.text};
  margin-auto;
  justify-content: space-between;
  align-items: center;
`;

export const HalfSectionInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.small};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ theme }) => theme.spacing.small};
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  border-top: 1px solid ${({ theme }) => theme.colors.divider};
`;

export const HalfSectionText = styled.span`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  color: ${({ theme }) => theme.colors.text};
`;

export const HalfSectionScore = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  color: ${({ theme }) => theme.colors.text};
`;

export const EventItem = styled.div`
  display: flex;
  justify-content: ${({ isHome }) => (isHome ? 'flex-start' : 'flex-end')};
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  & > * {
    margin: 0 ${({ theme }) => theme.spacing.xsmall};
  }
`;

export const EventTime = styled.span`
  justify-content: ${({ isHome }) => (isHome ? 'flex-start' : 'flex-end')};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 ${({ theme }) => theme.spacing.small};
  text-align:  ${({ isHome }) => (isHome ? 'right' : 'left')};
  min-width:20px;
`;

export const EventIcon = styled.div`
    display: inline-block;
    width: 20px;
    height: 20px;
    background-size: contain;
    background-repeat: no-repeat;
    margin: 0 5px;
    vertical-align: middle;
`;

export const EventDescription = styled.span`
    display: inline-block;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text};
    margin-left: 5px;
    vertical-align: middle;
    white-space: nowrap;
`;

export const EventPlayer = styled.span`
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};  
  &:hover {
    text-decoration: underline;
  }
`;

export const AssistPlayer = styled(EventPlayer)`
  font-weight: normal;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
`;
