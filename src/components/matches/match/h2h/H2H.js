import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BaseButton from '../../../common/BaseButton';
import { TableCell, FormContainer, FormItem, ButtonGroup } from '../../../../styles/GlobalStyles';

const theme = {
  colors: {
    background: '#1c1e24',
    highlight: '#34495e',
    primary: '#1abc9c',
    text: '#aaa',
    white: '#fff',
  },
  fontSizes: {
    small: '11px',
    medium: '10px',
    big: '12px',
  },
  spacing: {
    small: '10px',
    medium: '20px',
  },
};

const H2H = ({ homeTeamName, awayTeamName, lastHomeMatches, lastAwayMatches, headToHeadMatches }) => {
  const [activeTab, setActiveTab] = useState('overall');
  const [showMore, setShowMore] = useState([false, false, false]);
  const navigate = useNavigate();

  const handleTabClick = (tab) => setActiveTab(tab);
  const handleMatchClick = (id) => navigate(`/fixture/id/${id}`);
  const toggleShowMore = (index) => setShowMore((prev) => prev.map((val, i) => (i === index ? !val : val)));

  const renderMatches = (matches, teamName, index, filter) => {
    const filteredMatches = matches.filter((match) =>
      (filter === 'home' ? match.homeTeamName === teamName :
        filter === 'away' ? match.awayTeamName === teamName : true) && match.status === 'FT'
    );

    const formatDate = (isoString) => {
      const date = new Date(isoString);
      return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    };

    const getResultIndicator = (homeScore, awayScore, isHomeTeam) => {
      if (homeScore === awayScore) return 'D';
      return isHomeTeam ? (homeScore > awayScore ? 'W' : 'L') : (awayScore > homeScore ? 'W' : 'L');
    };

    const getTeamForm = (matches, teamName, filter) => {
      const filteredMatches = matches.filter(match => {
        if (filter === 'home') return match.homeTeamName === teamName;
        if (filter === 'away') return match.awayTeamName === teamName;
        return true;
      });
      return filteredMatches.slice(0, 5).map((match) => {
        const isHomeTeam = match.homeTeamName === teamName;
        return getResultIndicator(match.home, match.away, isHomeTeam);
      });
    };

    return (
      <H2HTableWrapper>
        <SectionTitle>
          Last Matches: {teamName}
          {/* Renderuj wskaźniki wyników tylko dla pierwszych dwóch tabel */}
          {index < 2 && (
            <FormContainer>
              {getTeamForm(matches, teamName, filter).map((result, idx) => (
                <FormItem key={idx} result={result}>{result}</FormItem>
              ))}
            </FormContainer>
          )}
        </SectionTitle>
        <TableContainer>
          {filteredMatches.slice(0, showMore[index] ? filteredMatches.length : 5).map((match, idx) => (
            <TableRow key={idx} onClick={() => handleMatchClick(match.id)}>
              <DateCell>{formatDate(match.date)}</DateCell>
              <HomeTeamCell>
                <TeamName align="right">{match.homeTeamName}</TeamName>
                <TeamLogo src={match.homeTeamLogo || 'default-logo.png'} alt={match.homeTeamName} align="right" />
              </HomeTeamCell>
              <ScoreCell>
                <Score>{match.home ?? '-'}</Score> : <Score>{match.away ?? '-'}</Score>
              </ScoreCell>
              <AwayTeamCell>
                <TeamLogo src={match.awayTeamLogo || 'default-logo.png'} alt={match.awayTeamName} align="left" />
                <TeamName align="left">{match.awayTeamName}</TeamName>
              </AwayTeamCell>
            </TableRow>
          ))}
        </TableContainer>
        {filteredMatches.length > 5 && (
          <ShowMoreTabButton onClick={() => toggleShowMore(index)}>
            {showMore[index] ? 'Show less' : 'Show more matches'}
          </ShowMoreTabButton>
        )}
      </H2HTableWrapper>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <ButtonGroup>
          <OverallTabButton active={activeTab === 'overall'} onClick={() => handleTabClick('overall')}>Total</OverallTabButton>
          <TabButton active={activeTab === 'home'} onClick={() => handleTabClick('home')}>{homeTeamName} - home</TabButton>
          <TabButton active={activeTab === 'away'} onClick={() => handleTabClick('away')}>{awayTeamName} - away</TabButton>
        </ButtonGroup>
        {activeTab === 'overall' && (
          <>
            {renderMatches(lastHomeMatches, homeTeamName, 0, 'overall')}
            {renderMatches(lastAwayMatches, awayTeamName, 1, 'overall')}
          </>
        )}
        {activeTab === 'home' && renderMatches(lastHomeMatches, homeTeamName, 0, 'home')}
        {activeTab === 'away' && renderMatches(lastAwayMatches, awayTeamName, 1, 'away')}
        {renderMatches(headToHeadMatches, null, 2)}
      </div>
    </ThemeProvider>
  );
};

export default H2H;

const H2HTableWrapper = styled.div`
  padding: 5px;
 
   background-color: rgba(28, 30, 36, 0.85);
    border-radius: 10px;
    color: #ffffff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);

   width: 650px;
  overflow-x: auto;
 
  background-color: rgba(28, 30, 36, 0.85);
    border-radius: 10px;
    color: #ffffff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
`;

const SectionTitle = styled.h4`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #f0f0f0;
  padding: 15px;
  border-bottom: 1px solid #555;
`;

const TableContainer = styled.div`
  width: 100%;
  border-collapse: collapse;
  background-color: transparent;
  border-radius: 5px;
  overflow: hidden;
`;

const TableRow = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #555;
  transition: background-color 0.3s;
  font-size: 12px;
  &:hover {
    background: ${({ $isActive }) => ($isActive ? 'rgb(85, 94, 97)' : 'rgb(58, 63, 65)')};
    color: #ffffff;
    box-shadow: ${({ $isActive }) => ($isActive ? '0 4px 8px rgba(85, 94, 97, 0.4)' : '0 3px 6px rgba(68, 76, 78, 0.5)')};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(85, 94, 97, 0.6);
  }

  &:active {
    transform: scale(0.97);
  }
`;

const DateCell = styled(TableCell)`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  width: 80px;
`;

const HomeTeamCell = styled(TableCell)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 420px;
  gap: ${({ theme }) => theme.spacing.small};
`;

const AwayTeamCell = styled(TableCell)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 420px;
  gap: ${({ theme }) => theme.spacing.small};
`;

const TeamName = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.white};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: ${({ align }) => align || 'center'};
`;

const TeamLogo = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
  margin: ${({ align }) => (align === 'right' ? '0 5px 0 0' : '0 0 0 5px')};
`;

const ScoreCell = styled(TableCell)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.white};
  width: 10px; /* Dopasuj szerokość do potrzeb */
  font-weight: bold; /* Opcjonalne dla wyraźniejszego wyniku */
`;
const Score = styled.span`
  font-weight: bold;
`;

export const TabButton = styled(BaseButton)`
  background: ${({ $isActive }) => ($isActive ? 'rgba(68, 76, 78, 0.85)' : 'rgba(48, 54, 56, 0.5)')};
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#b0b4b8')};
  border: ${({ $isActive }) => ($isActive ? '2px solid rgb(35, 40, 42)' : '1px solid rgba(68, 76, 78, 0.5)')};
  border-radius: 5px;
  max-width: 200px;
  height: 24px;
  padding: 6px 12px;
  font-weight: 600;
  font-size: 0.6rem;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.2s ease;
  box-shadow: ${({ $isActive }) => ($isActive ? '0 3px 6px rgba(35, 40, 42, 0.4)' : 'none')};

  &:hover {
    background: ${({ $isActive }) => ($isActive ? 'rgb(85, 94, 97)' : 'rgb(58, 63, 65)')};
    color: #ffffff;
    box-shadow: ${({ $isActive }) => ($isActive ? '0 4px 8px rgba(85, 94, 97, 0.4)' : '0 3px 6px rgba(68, 76, 78, 0.5)')};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(85, 94, 97, 0.6);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const OverallTabButton = styled(BaseButton)`
  background: ${({ $isActive }) => ($isActive ? 'rgb(45, 50, 52)' : 'rgba(68, 76, 78, 0.7)')};
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#d0d4d6')};
  border: ${({ $isActive }) => ($isActive ? '2px solid rgb(35, 40, 42)' : '1px solid rgba(68, 76, 78, 0.5)')};
  border-radius: 6px;
  width: 42px;
  height: 26px;
  padding: 6px 14px;
 font-weight: 600;
  font-size: 0.67rem;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.2s ease;
  box-shadow: ${({ $isActive }) => ($isActive ? '0 4px 8px rgba(35, 40, 42, 0.5)' : 'none')};

  &:hover {
    background: ${({ $isActive }) => ($isActive ? 'rgb(85, 94, 97)' : 'rgb(58, 63, 65)')};
    color: #ffffff;
    box-shadow: ${({ $isActive }) => ($isActive ? '0 4px 8px rgba(85, 94, 97, 0.54)' : '0 3px 6px rgba(68, 76, 78, 0.75)')};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(85, 94, 97, 0.6);
  }

  &:active {
    transform: scale(0.97);
  }
`;


export const ShowMoreTabButton = styled(BaseButton)`
  background: ${({ $isActive }) => ($isActive ? 'rgb(45, 50, 52)' : 'rgba(68, 76, 78, 0.7)')};
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#d0d4d6')};
  border: ${({ $isActive }) => ($isActive ? '2px solid rgb(35, 40, 42)' : '1px solid rgba(68, 76, 78, 0.5)')};
  border-radius: 6px;
  width:135px;
  height: 26px;
  padding: 6px 14px;
 font-weight: 600;
  font-size: 0.67rem;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.2s ease;
  box-shadow: ${({ $isActive }) => ($isActive ? '0 4px 8px rgba(35, 40, 42, 0.5)' : 'none')};

  &:hover {
    background: ${({ $isActive }) => ($isActive ? 'rgb(85, 94, 97)' : 'rgb(58, 63, 65)')};
    color: #ffffff;
    box-shadow: ${({ $isActive }) => ($isActive ? '0 4px 8px rgba(85, 94, 97, 0.54)' : '0 3px 6px rgba(68, 76, 78, 0.75)')};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(85, 94, 97, 0.6);
  }

  &:active {
    transform: scale(0.97);
  }
`;