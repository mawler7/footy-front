import styled from 'styled-components';


export const LeagueWrapperContainer = styled.div`
  flex-direction: column;
  
`;

export const HeaderAndTabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.small};
  box-shadow: ${({ theme }) => theme.shadows.container};
  
`;

export const LeagueFilterContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
  justify-content: flex-start;
  
`;

export const ContentSection = styled.div`

  box-shadow: ${({ theme }) => theme.shadows.container};
`;
