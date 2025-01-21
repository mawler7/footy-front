import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  background-color: ${({ theme }) => theme.colors.primary};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.xsmall};
  transition: margin-right 0.3s ease;
  z-index: 1;
  ${({ isBettingSlipOpen }) =>
    isBettingSlipOpen && `width: 60%;`}

  ${({ theme }) => theme.media.mobile} {
    min-width: ${({ theme }) => theme.media.mobile};
  }
     &:hover {
    background: ${({ theme }) => theme.colors.hoverBackground};
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.3);
  }
`;

export const AppLayout = styled.div`
  margin-top: ${({ theme }) => theme.sizes.navbarHeight};
    display: flex;
    min-height: 100vh;
    position: relative;
  background-color: ${({ theme }) => theme.colors.primary};


`;

export const MainContentWrapper = styled.div`
    min-width:440px;
  display: flex;
  flex-direction: row;
  justify-content: center; /* Wyśrodkowanie w poziomie */
  margin:${({ $isBettingSlipOpen }) => ($isBettingSlipOpen ? '' : '0 auto')}; 
  transition: width 0.3s ease, margin-right 0.3s ease;
    flex-shrink: 0; /* Zapobiega zmniejszaniu szerokości */
`;



export const PredictionsCounterWrapper = styled.div`
  align-items: center;
  justify-content: space-between;
    display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size:11px;
  margin-bottom:-25px;
  margin-top:10px;
`;

export const LeaguesContainerWrapper = styled.nav`
  padding: ${({ theme }) => theme.spacing.small};
  align-items: center;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.borderRadius};
  min-width: 140px; /* Minimalna szerokość */
  flex-shrink: 0; /* Zapobiega zmniejszaniu szerokości */

`;

// background-color: rgba(0, 0, 0, 0.85);
export const MatchesWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.small};

  height:100%;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
    ${({ theme }) => theme.media.mobile} {
    width: ${({ $isBettingSlipOpen }) => ($isBettingSlipOpen ? '60%' : '100%')};
    
`;

export const BettingSlipWrapper = styled.div`
  position: fixed;
  max-width: 240px;
  max-height: calc(100vh - 100px);
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: -4px 0 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;


`;


export const RoutesWrapper = styled.div`

  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;




export const VideoBackground = styled.video`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;










export const MatchContent = styled.div`
  display: flex;
  flex-direction: column;
    width: ${({ $isBettingSlipOpen }) => ($isBettingSlipOpen ? '60%' : '100%')};
  transition: width 0.3s ease;
    ${({ theme }) => theme.media.mobile} {
    }
        min-width: 550px;
`;

export const MatchesContent = styled.div`

  display: flex;
  flex-direction: column;
    width: ${({ isBettingSlipOpen }) => (isBettingSlipOpen ? '60%' : '100%')};
  transition: width 0.3s ease;
    ${({ theme }) => theme.media.mobile} {
    }

`;

export const TeamWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ isBettingSlipOpen }) => (isBettingSlipOpen ? '60%' : '100%')};
  transition: width 0.3s ease;
    min-width: 420px;
`;

export const PlayerWrapper = styled.div`
   min-width: 520px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  max-width: 100%;
  overflow: hidden; /* Zapobiega przekroczeniu szerokości */
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const LeagueContent = styled.div`
  display: flex;
  flex-direction: column;
     min-width: 440px;
  width: ${({ isBettingSlipOpen }) => (isBettingSlipOpen ? "60%" : "100%")};
  transition: width 0.3s ease;
`;

export const ResultsMatchesTableWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.small} 0;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
      min-width: 440px;
`;