import styled from 'styled-components';
import pitchBackground from '../../icons/top-view-of-green-football-pitch-or-soccer-field-vector.jpg';

export const PitchRotationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${({ $isVertical }) => ($isVertical ? 'rotate(90deg)' : 'none')};
  transform-origin: center;
  position: relative;
`;

export const PitchWrapper = styled.div`
  width: ${({ isBettingSlipOpen }) => (isBettingSlipOpen ? "60%" : "100%")};

    max-width: 940px;
    height: auto;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    transition: transform 0.3s ease-in-out;

    ${({ theme }) => theme.media.mobile} {
        transform: rotate(90deg); /* Obrót o 90 stopni */
        justify-content: flex-end; /* Wyrównanie do lewej */
        transform-origin: top left; /* Punkt obrotu w lewym górnym rogu */
        padding: 0; /* Usunięcie dodatkowego paddingu */
        width: 100%; /* Dopasowanie szerokości do rodzica */
            margin-left:300px;

    }
`;




export const PitchContainer = styled.div`
    flex-direction: ${({ $isVertical }) => ($isVertical ? 'column' : 'row')};

    position: relative;
    width: 100%;
    height: auto; // Automatyczna wysokość
    max-width: 940px; // Maksymalna szerokość boiska
    min-width: 440px; // Maksymalna szerokość boiska
    aspect-ratio: ${({ isVertical }) => (isVertical ? '1 / 1.7' : '1.7 / 1')}; 
    background: url(${pitchBackground}) center / cover no-repeat;
    margin: auto;
    transition: all 0.3s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const PlayerDetailsWrapper = styled.div`
    padding: ${({ theme }) => theme.spacing.xsmall};
    position: absolute;
    top: 110%;  
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 175px;
    background-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);


`;

export const PlayerText = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
  line-height: 1.1;  
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  max-width: 185px;  
  white-space: nowrap;  
  overflow: hidden; 
`;

export const TeamContainer = styled.div`
  flex-direction: column;
  display: grid;
  grid-template-columns: 1fr 1fr;  
  align-items: flex-start; 
  padding: ${({ theme }) => theme.spacing.xsmall};
`;

export const TeamSection = styled.div`
  position: relative;
margin:auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-items: ${({ isHome }) => (isHome ? 'flex-start' : 'flex-end')}; 
  text-align: ${({ isHome }) => (isHome ? 'left' : 'right')};
`;

export const CoachContainer = styled.div`
  position: relative;
margin:auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
 
  text-align: center;

  border-radius: ${({ theme }) => theme.borderRadius};
  transition: background-color 0.3s;
  &:hover {
 text-decoration: underline;
  }
`;

export const FlexRowContainer = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center;
`;

export const CoachesRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.border}; 
`;

export const PlayerList = styled.ul`
    list-style: none;
    padding: ${({ theme }) => theme.spacing.large};
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px; /* Odstęp między graczami na liście */
`;

export const PlayerNumber = styled.li`
width:25px;
  padding: ${({ theme }) => theme.spacing.small};
    font-size: ${({ theme }) => theme.fontSizes.small};
  line-height: 1.1; /* Zmniejszony odstęp między wierszami */
  text-align: center;
`;

export const PlayerListItem = styled.li.attrs(props => ({
  className: props.isHome ? 'home' : 'away',
}))`
    display: flex;
    align-items: center;
    justify-content: ${({ isHome }) => (isHome ? 'flex-start' : 'flex-end')};
    gap: 8px; /* Odstępy między elementami */
    border-radius: ${({ theme }) => theme.borderRadius};
    cursor: pointer;
    transition: background-color 0.3s;

    span {
        font-weight: bold;
    }

    div.event-icons {
        display: flex;
        gap: 4px; /* Odstępy między ikonami eventów */
    }
`;




export const PlayerIcon = styled.div`
    position: absolute;
    top: ${({ style }) => style.top || '0px'};
    left: ${({ style }) => style.left || '0px'};
    width: 45px; 
    height: 45px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 2;  
    border: 2px solid white; 
    transform: translate(-50%, -50%);  
                ${({ theme }) => theme.media.mobile} {
        transform: rotate(-90deg); /* Obrót o 90 stopni */

    }
`;

export const EventIconWrapper = styled.div`
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  z-index: 3;
    border-radius: 50%;
    gap: 5px; 

`;


export const SubstitutesEventIconWrapper = styled.div`
    display: flex;
    gap: 5px;
`;

export const EventIcon = styled.img`
    width: 20px; 
    height: 20px;
    border-radius: 50%; 
    background-color: white; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
    transition: transform 0.2s, box-shadow 0.2s; 

    &:hover {
        transform: scale(1.1); 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); 
    }
`;

export const RatingLabel = styled.div`
  position: absolute;
  left: 50%;
  top: 150%;
  transform: translate(-50%, -50%);
  background-color: ${({ isHighestRated, rating, theme }) =>
    isHighestRated
      ? theme.colors.info
      : rating >= 7.0
        ? theme.colors.success
        : rating >= 5
          ? theme.colors.warning
          : theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  font-weight: bold;
  text-align: center;
  color: ${({ rating, theme }) =>
    rating >= 6 && rating < 7 ? theme.colors.secondary : theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.default};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  transition: background-color 0.3s, color 0.3s;
`;




export const FormationText = styled.div`
    font-size: ${({ theme }) => theme.fontSizes.small};
  align-items: ${({ isHome }) => (isHome ? 'flex-start' : 'flex-end')}; 
  text-align: ${({ isHome }) => (isHome ? 'left' : 'right')};

`;

export const SectionHeader = styled.h2`
        padding: ${({ theme }) => theme.spacing.medium} 0;
        height: ${({ theme }) => theme.spacing.medium};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
 margin:auto;
   border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
   
`;

export const CoachName = styled.h3`
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
`;

export const SubstituteHeader = styled.h4`
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    color: ${({ theme }) => theme.colors.text};
        padding: ${({ theme }) => theme.spacing.xsmall};
`;

export const FormationHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.small};
        padding: ${({ theme }) => theme.spacing.xsmall};
  justify-content: ${({ isHome }) => (isHome ? 'flex-start' : 'flex-end')};


`;

export const PlayerListText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.small};
  &:hover {
 text-decoration: underline;
  }
  text-align: center;
`;
