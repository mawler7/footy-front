import styled from 'styled-components';

export const AppLayout = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100%;
  margin-top: ${({ theme }) => theme.sizes.navbarHeight};
  transition: margin-right 0.3s ease;
  max-width: 940px;
       background-color: ${({ theme }) => theme.colors.primary};
           padding: ${({ theme }) => theme.spacing.small};
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ isBettingSlipOpen }) => (isBettingSlipOpen ? '480px' : '100%')};
  transition: width 0.3s ease;
  padding: ${({ theme }) => theme.spacing.small};
`;

export const LeagueContent = styled.div`
  padding: ${({ theme }) => theme.spacing.small};
  width: ${({ isBettingSlipOpen }) => (isBettingSlipOpen ? '480px' : '100%')};
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
`;

export const ResultsMatchesTableWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.small};
  width: ${({ isBettingSlipOpen }) => (isBettingSlipOpen ? '480px' : '100%')};
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100%;
  transition: margin-right 0.3s ease;
   width: ${({ isBettingSlipOpen }) => (isBettingSlipOpen ? '480px' : '700px')};
`;

export const BettingSlipWrapper = styled.div`
  width: ${({ isBettingSlipOpen }) => (isBettingSlipOpen ? '380px' : '0')};
  height: 100%;
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  transition: width 0.3s ease;

`;

export const PageWrapper = styled.div`
  width-max: 960px;
   padding: ${({ theme }) => theme.spacing.xsmall};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

export const VideoBackground = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

export const TeamContent = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
  display: flex;
  flex-direction: column;
  width: ${({ isBettingSlipOpen }) => (isBettingSlipOpen ? '280px' : '90%')};
  transition: width 0.3s ease;
`;

export const MatchContent = styled.div`
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
`;