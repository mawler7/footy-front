import { createGlobalStyle } from "styled-components";
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import { FaFutbol, FaHandsHelping } from 'react-icons/fa';
import { MdWarning, MdBlock } from 'react-icons/md';  // Alternatives for yellow and red cards
import BaseButton from './../components/common/BaseButton';  // Alternatives for yellow and red cards



export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
  }

  body {
    background-color: transparent; // Allows the video to be seen through the page
    color: white;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #ffffff;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    background-color: rgba(52, 73, 94, 0.8); // Make buttons semi-transparent
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(26, 188, 156, 0.9);
    }
  }

 
@media (max-width: 875px) {
    .leaguesWrapper {
        max-width: 40px;
    }

    .contentWrapper {
        padding: 5px;
    }

    .bettingSlipWrapper {
        max-width: 80px;
    }
}

@media (min-width: 876px) {
    .leaguesWrapper {
        max-width: 180px;
    }

    .contentWrapper {
        padding: 15px;
    }

    .bettingSlipWrapper {
        max-width: 300px;
    }
}

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


// Styled Components for Layout
export const AppLayout = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
            
`;

export const MainContainer = styled.div`
    display: flex;
    flex-grow: 1;
    height: 100%;
    overflow-y: auto;
       margin-top: 60px;
           min-width: 250px;
  
    background-color: rgba(52, 73, 94, 0.85); // Make buttons semi-transparent
        @media (max-width: 1080px) {
         width:auto;
    }
`;

export const LeaguesWrapper = styled.div`
    flex: 1;
    max-width: 190px;
  background-color: rgba(28, 30, 36, 0.7);
   margin-top: 5px;
    border-radius: 10px;
    @media (max-width: 875px) {
        max-width: 50px;
    }
`;

export const ContentWrapper = styled.div`
    flex: 2;

    padding: 5px;

    @media (max-width: 880px) {
        flex: 3;
    }
`;

export const BettingSlipWrapper = styled.div`
    flex: 1;
    max-width: 300px;
    overflow-y: auto;
    border-left: 1px solid #ddd;
 

    @media (max-width: 768px) {
        max-width: 200px;
    }
`;

export const FloatingButton = styled.button`
    position: absolute;
    bottom: 20px;
    right: 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    font-size: 18px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }
`;

export const LoadingMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 1.5em;
    color: #3498db;
`;


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #1e1e1e;
  min-height: 100vh;
`;
export const Content = styled.div`
    margin-top: 20px;
`;



export const ErrorMessage = styled.div`
    text-align: center;
    color: red;
    font-size: 18px;
`;





export const TeamSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export const TeamCard = styled.div`
  background: rgba(28, 30, 36, 0.85);
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  width: 200px;
`;



export const LeagueName = styled.div`
  font-size: 14px;
  color: #b0b0b0;
`;

export const TeamDetailsMainContent = styled.div`
  padding: 20px;
  max-width: 800px;
  width: 100%;
`;

export const TeamInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ backgroundImage }) => `url(${backgroundImage}) no-repeat center`};
  background-size: cover;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  color: white;
`;

export const TeamHeader = styled.div`
  text-align: center;
`;



export const TeamInfoItem = styled.p`
  font-size: 14px;
  margin: 5px 0;
`;


export const theme = {
  colors: {
    background: '#1c1e24',
    highlight: '#34495e',
    primary: '#1abc9c',
    text: '#aaa',
    white: '#fff',
    formColors: {
      W: 'green',
      D: 'orange',
      L: 'red',
    },
  },
  fontSizes: {
    small: '11px',
  },
  spacing: {
    small: '10px',
    medium: '20px',
  },
};

export const sizes = {
  desktopWidth: '680px',
  mobileMaxWidth: '768px',
};

export const spacing = {
  small: '5px',
  medium: '10px',
  large: '20px',
};

export const ExpandButtonGroup = styled.div`
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
      `;


export const ButtonGroup = styled.div`
        display: flex;
 gap: 2px;
         margin-bottom: 10px;
      `;


export const TableFilterButton = styled.div`
        display: flex;
 gap: 2px;
       margin-bottom: 5px;
        width: 75px;
      `;


//TABLES
export const SquadTableCell = styled.td`
          padding: 10px;
          width: ${({ width }) => width || 'auto'};
          text-align: center;
          color: white;
          font-size: 14px;
        `;

export const Table = styled.table`
          border-collapse: collapse;
          background-color: #1c1e24;
          
        `;

export const TableRow = styled.tr`

          height: 40px;
          display: flex; // Ensure the row is a flex container
          align-items: center; // Vertically center all row content
          justify-content: space-between; // Space out the items evenly
          padding: 0 10px; // Optional: Adjust padding as needed
          cursor:pointer;
          &:nth-child(even) {
            background-color: #2e2e2e;
          }

          &:hover {
            background-color: #34495e;
          }
        `;

export const MatchTable = styled.div`
          width: 670px;
          border-radius: 10px;
        `;

export const CustomTable = styled.table`
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed; /* Ensures columns take equal space based on width */
        `;

export const SquadTable = styled.table`
          width: 100%;
          table-layout: fixed; /* Ensures the table respects the width of each column */
          border-collapse: collapse;
          background-color: #1c1e24;
        `;

export const PlayerSectionTitle = styled.h3`
          font-size: 1.5rem;
          font-weight: bold;
          margin-top: 20px;
          margin-bottom: 10px;
              text-align: center;
          color: #333;
        `;

export const CustomTableBody = styled.tbody``;

export const SquadTableRow = styled.tr`
          &:nth-child(even) {
            background-color: #2e2e2e;
          }
          &:hover {
            background-color: #34495e;
          }
        `;

export const SummaryCustomTableRow = styled.div`
            display: flex;
            align-items: center;
            padding: 10px 0;
        `;

export const SquadTableHeaderRow = styled.tr`
          width: 100%;
            background-color: #2a2a2a;
          text-align: left;
          font-size: 13px;
        `;

export const CustomTableRow = styled.tr`
          &:nth-child(even) {
            background-color: #2e2e2e;
          }
          &:hover {
            background-color: #34495e;
          }
        `;

export const ResultCell = styled.td`
          padding: 10px;
          text-align: center;
          vertical-align: middle;
        `;

export const ResultTableCell = styled.td`
          font-size: 14px;
          padding: 10px;
          text-align: center;
          vertical-align: middle;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          width: ${({ width }) => width || 'auto'}; // Allow width to be passed as a prop
        `;

export const TeamCell = styled.td`
          display: flex;
          align-items: center; /* Ustawia logo i nazwę na tej samej osi pionowej */
          padding: 10px;
          width: 200px;
          text-align: left;
          font-size:14px;
          cursor:pointer;
        `;

export const TeamLogoCell = styled.img`
          width:   max(25px); 
            height: max(25px);
            margin-left: 20px;
          margin-right: 10px;
          vertical-align: middle; // Ensure the logo is vertically aligned
              object-fit: contain;
        `;

export const LeagueNameCell = styled.td`
          font-size: 12px; // Reduce font size for the league name
          text-align: left;
          color: white;
          vertical-align: middle; // Center the text vertically in the cell
          padding-left: 5px; // Add some padding for visual spacing
        `;

export const CustomTableCell = styled.td`
          padding: 10px;
          width: ${({ width }) => width || 'auto'};
          text-align: ${({ align }) => align || 'center'};
          color: white;
          font-size: 14px;
        `;

export const TableCell = styled.td`
          font-size: 14px;
          padding: 10px;
          text-align: center;
          vertical-align: middle;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          width: ${({ width }) => width || 'auto'}; // Allow width to be passed as a prop
        `;

export const CustomTableCellPlayer = styled.td`
          padding: 10px;
          width: ${({ width }) => width || 'auto'};
          text-align: ${({ align }) => align || 'left'};
          color: white;
          font-size: 14px;
        `;



export const SquadTableCellPlayer = styled(SquadTableCell)`
          text-align: left;
          width: 200px; /* Fixed width for player name column */
        `;

export const SummaryCustomTableCell = styled.div`
            padding: 10px;
            min-width: ${({ width }) => width || 'auto'};
            text-align: ${({ align }) => align || 'center'};
        `;

export const StandingTeamCell = styled.td`
          display: flex;
          align-items: center; /* Ustawia logo i nazwę na tej samej osi pionowej */
          padding: 10px;
          width: 30px;
          text-align: left;
        `;

export const TeamNameCell = styled.span`
          font-size: 14px;
          color: white;
        width:230px;
        `;

export const OddsCell = styled.div`
          flex: 1;
          text-align: center;
          color: white;
          font-size: 13px;
        `;

export const SquadTableBody = styled.tbody``;

export const bodyStyles = createGlobalStyle`
          body {
            background-color: transparent; // Allow video to show through
            color: white;
          }
        `;


//HEADERS
export const TableHeader = styled.thead`
padding: 10px;
          background-color: #2a2a2a;
          text-align: center;
          font-size: 13px;
            width: 100%;
        `;

export const BetGroupHeader = styled.div`
          display: flex;
          justify-content: space-between;
          background-color: #2c3e50;
          padding: 10px;
          border: 0.5px solid white;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          color: white;
          margin-top: 10px;

          &:hover {
            background-color: #34495e;
          }
        `;

export const SquadHeader = styled.h2`
          font-size: 16px;
          margin-bottom: 10px;
          color: white;
        `;

export const OddsHeader = styled.div`
          display: flex;
          justify-content: space-between;
          width: 100%; // Ensures headers align horizontally
          font-weight: bold;
          color: #1abc9c; // Highlight color for headers
          font-size: 14px;
        `;

export const SquadTableHeader = styled.thead`
          background-color: #333;
          color: white;
        `;

export const SquadPositionHeader = styled(SquadTableCell)`
          font-weight: bold;
          text-align: center;
          background-color: #1c1e24;
          padding: 10px;
          width: 100%;
          color: white;
          font-size: 16px;
        `;

export const LeagueHeader = styled.div`
          height: 40px;
          width: 680px;
          background-color: rgba(28, 30, 36, 0.85); // Transparent background

          border-radius: 5px;
          color: white;
          padding: 10px;
          font-weight: bold;
          font-size: 14px;
          display: flex;
          align-items: center;
          cursor: pointer;
          position: relative;

          img {
          margin-top:5px;
          margin-bottom:5px;
              width: max(30px);
            height: max(30px);
            margin-right: 15px;
                object-fit: contain;
          }
        `;

export const PredictionsHeader = styled.div`
          height: 50px;
          width: 660px;
          background-color: #2c3e50;
          margin-left:20px;
          margin-top:10px;
          margin-right:20px;
          margin-bottom:20px;
          border-radius: 5px;
          color: white;
          padding: 10px;
          font-weight: bold;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          align-items: left;
          text-align: left;
          position: relative;

          img {
          margin-top:5px;
          margin-bottom:5px;
              width: max(30px);
            height: max(30px);
            margin-right: 15px;
                object-fit: contain;
          }
        `;

export const RoundHeader = styled.div`
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: rgba(28, 30, 36, 0.7);
          padding: 10px;
          cursor: pointer;
          color: white;
          font-weight: bold;
            margin-top:10px;
        `;

export const TeamNameCellHeader = styled.span`
          font-size: 14px;
          color: white;
        width:180px;
        `;

export const CustomTableHeader = styled.thead`
          background-color: #2a2a2a;
        `;

//CONTAINERS
export const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
    background-color: rgba(28, 30, 36, 0.7);
   border-radius: 10px;
  
  width: max(670px);
  min-width: 370px;
  align-items: flex-start;
    @media (max-width: 768px) {
      min-width: 370px;
    margin-top: 0; /* Usuwa margin-top przy mniejszych ekranach */
  }
      padding: 5px;
        `;

export const StarContainer = styled.div`
          width: 20px;
          display: flex;
          align-items: center;
          margin-left: 10px;
          color: white;
          font-weight: bold;
            svg {
            font-size: 24px; // Zwiększamy rozmiar gwiazdki
            cursor: pointer;
          }
        `;

export const StatusContainer = styled.div`
          width: 50px;
          align-items: center;
          margin-left: 15px;
          color: white;
          font-weight: bold;
        `;

export const TeamsContainer = styled.div`
          width: 220px;  
          display: flex;
          flex-direction: column;
          justify-content: center;
        `;

export const PredictionContainer = styled.div`
          width: 250px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: 15px;
          line-height: 1.2;  
        `;

export const ScoresContainer = styled.div`
          width: 35px;
          margin-right: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        `;

export const DetailsContainer = styled.div`
          display: flex;
          flex-direction: column;
          background-color: #1c1e24;
          color: var(--color-secondary-2);
          font-family: 'Arial', sans-serif;
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        `;

export const SquadContainer = styled.div`
          background-color: #1c1e24;
          border-radius: 5px;
        `;

export const TabContainer = styled.div`
          margin-bottom: 20px;
          margin-left: 20px;
          margin-top: 15px;   border-top: 0.25px solid white;  /* Obramowanie na górze */
          border-bottom: 0.5px solid white; /* Obramowanie na dole */
        `;

export const PositionContainer = styled.div`
          margin: 10px 0;
          display: flex;
          flex-direction: column;
        `;

export const FormContainer = styled.div`
          display: flex;
          gap: 5px;
            margin-top: 5px;
          `;

export const TableContainer = styled.table`
          width: max(550px);
          border-collapse: collapse;
          background-color: #1e1e1e;
          color: white;
          display: flex;
          flex-direction: column; // Ensure rows are stacked vertically
            border: 1px solid #2a2a2a;
        `;



export const SquadTableContainer = styled.div`
          width: 100%;
          background-color: #1c1e24;
          border-radius: 10px;
          overflow-x: auto;
        `;

export const CustomTableContainer = styled.div`
            border-spacing: 0;
            border-collapse: collapse;
        `;

export const OddsContainer = styled.div`
          width: 100px; // Adjust width to ensure it fits well within your layout
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          color: white;
        `;

export const Status = styled.span`
          font-weight: bold;
          font-size: 11.5px;
          color: white;
          width: 25px;
        `;


//SECTIONS
export const SquadPositionSection = styled.section`
          margin-bottom: 20px;
        `;

export const InfoSection = styled.div`
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          padding: 20px;
          background-color: #1c1e24;
          margin-bottom: 20px;
          border-radius: 12px;
          font-size: 16px;
        `;

export const LeagueSection = styled.div`
 
        flex: 1;
        `;

export const OddsSection = styled.div`
          flex: 1;
          padding-left: 20px;
          background-color: #1c1e24;
          border-radius: var(--radius-12);
          @media (max-width: 768px) {
            padding-left: 0;
            margin-top: 20px;
          }
        `;

export const HeadToHeadSection = styled.div`
          flex: 1;
          padding-left: 20px;
          background-color: #1c1e24;
          border-radius: var(--radius-12);
          @media (max-width: 768px) {
            padding-left: 0;
            margin-top: 20px;
          }
        `;

export const DrabinkaSection = styled.div`
          flex: 1;
          padding-left: 20px;
          background-color: #1c1e24;
          border-radius: var(--radius-12);
          @media (max-width: 768px) {
            padding-left: 0;
            margin-top: 20px;
          }
        `;

export const SectionTitle = styled.h3`
          font-size: 15px;
          color: #fff;
          padding: 10px 0;
          background-color: #1c1e24;
          border-radius: 4px;
          margin-bottom: 5px;
          text-align: left;
          padding-left: 15px;
        `;

export const CoachSection = styled.div`
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          padding: 10px;
          background-color: #0f1b2a;
          border-radius: 10px;
          color: white;

          .coach {
            font-weight: bold;
          }

          .country-flag {
            width: 24px;
            height: 24px;
            margin-right: 5px;
          }
        `;

export const LineupSection = styled.div`
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding: 20px;
          color: white;
        `;

export const LineupsSection = styled.div`
          display: flex;
          justify-content: space-between;
          background-color: #1c1e24;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;
          color: white;
        `;



//WRAPPERS
export const CalendarWrapper = styled.div`
          display: flex;
          border-radius: 5px;
          align-items: center;
        
        width:200px;
          .react-datepicker-wrapper {
            width: auto;
          }
        `;

export const TableWrapper = styled.div`
          margin: 20px;
          padding: 20px;
          background-color: #1c1e24;
          border-radius: 10px;
        `;

export const ResultsTableWrapper = styled.div`
          background-color: #1c1e24;
          border-radius: 10px;
                width: max(660px);
        `;

export const FixtureDetailsWrapper = styled.div`
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 20px; 
          flex-grow: 1;
          max-width: 75%;  
        `;

export const SquadTableWrapper = styled.div`
          background-color: #1c1e24;
          border-radius: 10px;
                width: max(780px);
          overflow-x: auto;
        `;

export const SummarySquadTableWrapper = styled.div`
          background-color: #1c1e24;
          border-radius: 10px;
          border: 1px solid #2a2a2a;
          width: 710px; // Set a maximum width for consistency
          max-width: 710px; // Set a maximum width for consistency
          overflow-x: auto; // Ensure the table remains responsive
        `;

export const LayoutWrapper = styled.div`
          display: flex;
        
          color: white;
          background-color: rgba(28, 30, 36, 0.85); // Transparent background
            border-radius: 10px;
              width: 100%;
                       width:  max(710px); // Set a maximum width for consistency
        `;

export const TeamWrapper = styled.div`
          display: flex;
          align-items: center;
          margin-bottom: 3px;
          margin-top: 3px;
          width: 220px;
          font-size: 13.5px;
          height: 20px;
        `;






export const MainContent = styled.div`
  width: 100%;
  max-width: ${sizes.desktopWidth};
  margin-top: ${spacing.large};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  @media (max-width: ${sizes.mobileMaxWidth}) {
    margin-top: ${spacing.small};
  }
`;

export const GroupTitle = styled.h3`
    margin-bottom: 10px;
    color: #444;
    font-size: 18px;
    text-align: left;
`;

export const GroupSpacing = styled.div`
    margin-top: 40px;
`;

export const MatchesList = styled.div`
  width: 100%;
`;

export const MatchItem = styled.div`
  margin-bottom: 10px; /* Add spacing between match items */
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 65px;
  padding: 0 10px;
  background-color: ${({ isEven }) => (isEven ? 'rgba(28, 30, 36, 0.5)' : 'rgba(46, 46, 46, 0.5)')};
  width: 100%; // Ensures full-width usage
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: rgba(26, 188, 156, 0.8);
  }
`;

export const FormItem = styled.div`
  width: 20px;
  height: 20px;
    font-size: 12px;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: ${({ result }) => (result === 'W' ? 'green' : result === 'D' ? 'orange' : 'red')};
  color: white;
  border-radius: 3px;
`;

export const OddsValues = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 13px;
  color: #f1f1f1;
`;

export const BubbleNameAndValue = styled.div`
   width: 340px;,
    color: white;
`;

export const TeamLogo = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 15px;
  margin-left: 10px;
    object-fit: contain;
`;

export const FixturesTeamLogo = styled.img`
      height: max(22px);
    width: max(22px);
        object-fit: contain;
  margin-right: 10px;
`;

export const Score = styled.span`
  font-weight: bold;
  font-size: 15px;
  margin-top:4px;
  margin-bottom:4px;
  color: white;
    flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const GoalsText = styled.span`
  width: 300px;
  display: flex;
  flex-direction: column;
  font-size: 11px;
  display: inline;
`;

export const PredictionText = styled.div`
  width: 285px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 11px;
  line-height: 1.4;  
`;

export const Text = styled.span`
  color: white;
`;

export const InfoItem = styled.div`
  margin: 10px 0;
`;

export const DetailsContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #1c1e24;
  border-radius: 12px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const OddsType = styled.div`
  color: var(--color-green);
`;

export const OddsValue = styled.div`
  color: var(--color-white);
`;

export const TeamLogoDetails = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
    object-fit: contain;
    cursor:pointer;
`;

export const TeamName = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: var(--color-white);
`;

export const ResultsTeamName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: var(--color-white);
`;

export const MatchScore = styled.div`
  font-size: 56px;
  font-weight: bold;
  color: var(--color-primary);
`;

export const MatchInfo = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: var(--color-support-2);
`;

export const LeagueInfo = styled.div`
  display: flex;
  margin-top: 10px;
 
  font-size: 14px;
  color: white;
  margin-bottom: 10px;
  cursor: pointer;
font-weight: bold;
color: white;
 
`;

export const Brand = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  margin-right: 20px;  // Dodaj margines, aby logo nie zajmowało zbyt dużo miejsca
`;

export const BrandName = styled.h1`
  font-size: 24px;
  margin: 0;
  font-weight: bold;
  margin-left: 10px;  // Dodaj margines pomiędzy logo a nazwą
`;

export const Modal = styled.div`
  background-color: #2c3e50;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  color: white;
  z-index: 1200;
  position: relative;  // Zapewnij widoczność modalnego okna
  width: 300px;  // Upewnij się, że modal ma odpowiednią szerokość
  height: auto;  // Automatyczne dopasowanie wysokości
  text-align: center;  // Wyśrodkuj treść wewnątrz modala
`;




export const ResultIndicator = styled.div`
    width: 40px;
    height: 100%;
    background-color: ${({ result }) => {
    if (result === 'W') return '#4caf50';
    if (result === 'D') return '#f1c40f';
    return '#e74c3c';
  }};
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 12px;
`;


export const LineupItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #1c1e24;
  padding: 10px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  margin-bottom: 5px;
  width: 100%;

  &:hover {
    background-color: #1abc9c;
  }

  .player-info {
    display: flex;
    align-items: center;
  }

  .player-number {
    width: 30px;
    font-weight: bold;
    margin-right: 10px;
    color: #fff;
  }

  .player-details {
    display: flex;
    flex-direction: column;
  }

  .player-name {
    font-size: 16px;
    font-weight: bold;
  }

  .player-pos {
    font-size: 14px;
    color: #b5b5b5;
  }
`;

export const Formation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

export const SquadList = styled.ul`
  list-style: none;
 
    width: 710px
    font-size: 13px;
`;

export const PlayerItem = styled.li`
  display: flex;
  background-color: #2c3e50;
  border-radius: 5px;
  color: white;
`;

export const PlayerPosition = styled.span`
  font-weight: bold;
  width: 20%;
`;




export const PlayerName = styled.span`
  display: flex;
  max-width: 50%;
  min-width: 36%;
     width:auto;
  margin-top: 5px;
    font-size: 14px;
`;




//BUTTONS

export const FilterButtonsContainer = styled.div`
        display: flex;
        justify-content: left;
        margin-bottom: 20px;
        margin-left: 20px;
      `;

export const Button = styled.button`
        background-color: ${({ active }) => (active ? '#34495e' : 'var(--color-white)')};
        color: ${({ active }) => (active ? 'white' : 'black')};
        border: 0.5px solid grey;
        border-radius: 5px;
        width: 105px;
        height: 35px;
        margin-right: 8px;
        padding: 8px 12px;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease, color 0.3s ease;

        &:hover {
          background-color: ${({ active }) => (active ? '#1abc9c' : '#333')};
          color: white;
        }

        @media (max-width: 768px) {
          width: 95px;
          height: 30px;
          font-size: 10px;
          padding: 6px 8px;
        }
      `;

export const FavoriteButton = styled.button`
        background-color: ${({ active }) => (active ? '#34495e' : 'var(--color-white)')};
        color: ${({ active }) => (active ? 'white' : 'black')};
        border: 0.5px solid grey;
        border-radius: 5px;
        width: 105px;
        height: 35px;
        margin-right: 8px;
        padding: 8px 12px;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease, color 0.3s ease;

        &:hover {
          background-color: ${({ active }) => (active ? '#1abc9c' : '#333')};
          color: white;
        }

        @media (max-width: 768px) {
          width: 95px;
          height: 30px;
          font-size: 10px;
          padding: 6px 8px;
        }
      `;

export const SquadButton = styled.button`
        background-color: ${({ active }) => (active ? '#34495e' : 'var(--color-white)')};
        border: 0.5px solid grey;
        border-radius: 5px;
        width:auto;
      
        
        margin-right: 3px;
        padding: 10px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        border-radius: 5px;
        &:hover {
          background-color: ${({ active }) => (active ? 'var(--color-primary)' : '#333')};
        }
      `;

export const FilterButton = styled(BaseButton)`
  background-color: ${({ active }) => (active ? '#34495e' : 'transparent')};
  color: ${({ active }) => (active ? 'white' : '#aaa')};
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  font-size:11px;
  &:hover {
    background-color: #34495e;
  }
`;

// export const FilterButton = styled.button`
//         background-color: ${({ active }) => (active ? '#1abc9c' : 'transparent')};
//         color: ${({ active }) => (active ? 'white' : '#333')};
//         border: 1px solid #1abc9c;
//         border-radius: 3px;
//         padding: 5px 15px;  // Mniejsze paddingi dla mniejszych przycisków
//         font-size: 12px;    // Zmniejszona czcionka
//         cursor: pointer;
//         margin: 0 5px;
//         transition: background-color 0.3s ease;

//         &:hover {
//           background-color: #1abc9c;
//           color: white;
//         }
//       `;

export const TabButton = styled(BaseButton)`
  background-color: ${({ active }) => (active ? '#34495e' : 'transparent')};
  color: ${({ active }) => (active ? 'white' : '#aaa')};
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  font-size:12px;
  &:hover {
    background-color: #34495e;
  }
`;

// export const TabButton = styled(BaseButton)`
//   background: ${({ active }) => (active ? 'linear-gradient(135deg, #34495e, #2c3e50)' : '#1c1e24')};
//   color: ${({ active }) => (active ? '#ecf0f1' : '#7f8c8d')};
//   margin: 0 5px;

//   &:hover {
//     background: linear-gradient(135deg, #16a085, #1abc9c);
//     box-shadow: 0 4px 12px rgba(22, 160, 133, 0.4);
//     transform: translateY(-2px);
//   }

//   &:active {
//     background: linear-gradient(135deg, #1abc9c, #16a085);
//   }
// `;



export const ToggleButton = styled.button`
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        margin-left: auto;
        padding: 0 10px;

        &:hover {
          color: #1abc9c;
        }
      `;
export const ArrowButton = styled(BaseButton)`
  background: transparent;
  color: #16a085;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 11px;
  padding: 0;

  &:hover {
    color: #1abc9c;
  }

  &:active {
    color: #14856b;
  }
`;



export const IconButton = styled.button`
        display: flex;
        align-items: center;
        background-color: #34495e;
        border: none;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        color: white;
        z-index: 1500;  // Dodaj z-index, aby upewnić się, że przyciski są widoczne

  &:hover {
    background: ${({ $isActive }) => ($isActive ? 'linear-gradient(135deg, #3b9dbd, #3a87ad)' : 'rgba(255, 255, 255, 0.08)')};
    color: #ffffff;
    box-shadow: 0 4px 8px rgba(58, 135, 173, 0.2);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(58, 135, 173, 0.4);
  }

  &:active {
    transform: scale(0.97);
  }
      `;

export const IconMap = {
  goals: <FaFutbol />,
  assists: <FaHandsHelping />,
  yellowCards: <MdWarning style={{ color: 'yellow' }} />,  // Alternative for yellow card
  redCards: <MdBlock style={{ color: 'red' }} />,  // Alternative for red card
};

export const SquadTableCellIcon = styled(SquadTableCell)`
        width: 50px; /* Fixed width for icons */
        text-align: center;
      `;

export const BubbleIcon = styled.div`
          display: flex;
          color: white;
          margin-bottom: 10px;
      `;

export const ExpandButton = styled.button`
        background-color: #1abc9c;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
          background-color: #16a085;
        }
      `;



export const BetStatusButton = styled.button`
        background-color: ${({ color }) => color || 'gray'};
        border: none;
        padding: 5px;
        margin: 0 5px;
        cursor: pointer;
        border-radius: 50%;
        color: white;

        &:hover {
          opacity: 0.8;
        }
      `;


export const CustomDatePicker = styled(DatePicker)`
      padding:5px;
        width: 85px;  
          align-items: center;
        height: 30px;  
            border-radius: 5px;
      `;

export const Filters = styled.div`
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        margin-top: 30px;
      `;


export default GlobalStyle;

