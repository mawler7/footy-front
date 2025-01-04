import styled from 'styled-components';
import pitchBackground from '../../icons/top-view-of-green-football-pitch-or-soccer-field-vector.jpg';

export const PitchWrapper = styled.div`
  position: relative;
  box-shadow: ${({ theme }) => theme.shadows.default};
  height: auto;
  overflow: hidden;
  margin: auto;
`;

export const PitchContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: 437px;
  background: url(${pitchBackground}) center / cover no-repeat;
`;

export const PlayerDetailsWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.xsmall};
  position: absolute;
  top: 110%;  
  left: 45%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 150px;
  background-color: ${({ theme }) => theme.colors.primary};
  @media (max-width: 768px) {
    top: 110%;  
  }
`;

export const PlayerText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  line-height: 1.1; /* Zmniejszony odstęp między wierszami */
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  max-width: 125px; /* Maksymalna szerokość kontenera */
  white-space: nowrap; /* Zapobiega zawijaniu tekstu */
  overflow: hidden; 
  text-overflow: ellipsis; /* Dodaje wielokropek, gdy tekst jest za długi */
`;

export const TeamContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;  
  align-items: flex-start; 
  padding: ${({ theme }) => theme.spacing.xsmall};
`;

export const TeamSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ isHome }) => (isHome ? 'flex-start' : 'flex-end')}; 
  text-align: ${({ isHome }) => (isHome ? 'left' : 'right')};
`;

export const CoachContainer = styled.div`
  margin:0 ${({ theme }) => theme.spacing.medium};
  text-align: center;
  align-items: ${({ isHome }) => (isHome ? 'flex-start' : 'flex-end')}; 
  text-align: ${({ isHome }) => (isHome ? 'left' : 'right')};
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
  width: 70%;
  padding: ${({ theme }) => theme.spacing.small};
`;

export const PlayerNumber = styled.li`
width:25px;
  padding: ${({ theme }) => theme.spacing.small};
    font-size: ${({ theme }) => theme.fontSizes.small};
  line-height: 1.2; /* Zmniejszony odstęp między wierszami */
  text-align: center;
`;

export const PlayerListItem = styled.li.attrs(props => ({
  className: props.isHome ? 'home' : 'away',
}))`
  display: flex;
  align-items: center;
  justify-content: ${({ isHome }) => (isHome ? 'flex-start' : 'flex-end')};
  gap: 8x; 
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: background-color 0.3s;
  padding: ${({ theme }) => theme.spacing.small};

`;

export const PlayerIcon = styled.div`
  position: absolute;
  top: ${({ style }) => style.top || '-8px'};
  left: ${({ style }) => style.left || '10px'};
  background: url(${({ photoUrl }) => photoUrl}) center / cover no-repeat;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
`;

export const EventIconWrapper = styled.div`
    position: absolute;
    bottom: 0;  
    left: 50%; 
    transform: translateX(-50%);
    display: flex;  
    align-items: center;
    z-index: 2;  
`;

export const EventIcon = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  object-fit: contain;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  position: absolute;
  ${({ positionStyles }) => positionStyles};
`;

export const RatingLabel = styled.div`
  position: absolute;
  margin-top:12px;
  background-color: ${({ rating, theme }) =>
    rating >= 7.5
      ? theme.colors.success
      : rating >= 6
        ? theme.colors.warning
        : theme.colors.error};
  color:  ${({ rating, theme }) =>
    rating >= 7.5
      ? theme.colors.text
      : rating >= 6
        ? theme.colors.primary
        : theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  height: 14px;
  width: 18px;
  font-weight: bold;
  text-align: center;
`;

export const FormationText = styled.div`
    font-size: ${({ theme }) => theme.fontSizes.small};
    text-align: ${({ align }) => align || 'center'};
        padding: 0 ${({ theme }) => theme.spacing.medium};
        margin-top: -${({ theme }) => theme.spacing.xlarge};
`;

export const SectionHeader = styled.h2`
        padding: ${({ theme }) => theme.spacing.large};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
 margin:auto;
 
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
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.small};
        padding: ${({ theme }) => theme.spacing.xsmall};
`;

export const PlayerListText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.small};
  &:hover {
 text-decoration: underline;
  }
  text-align: center;
`;
