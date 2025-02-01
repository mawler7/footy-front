import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { filterMatches, formatDate } from '../../common/utils';
import { ShowMoreTabButton, SubTab } from "../../../styles/buttons/buttons";
import {
  AwayTeamCell, DateCell, FormContainer, FormItem, H2HTableWrapper,
  HomeTeamCell, Score, ScoreCell, SectionTitle, TableRow, TeamLogo, TeamName
} from '../../../styles/match/H2HStyles';

const H2H = ({ homeTeamName, awayTeamName, lastHomeMatches = [], lastAwayMatches = [], headToHeadMatches = [] }) => {
  const [activeTab, setActiveTab] = useState('overall');
  const [showMore, setShowMore] = useState([false, false, false]);
  const navigate = useNavigate();

  const tabs = useMemo(() => [
    { label: 'Total', value: 'overall' },
    { label: `${homeTeamName} - home`, value: 'home' },
    { label: `${awayTeamName} - away`, value: 'away' },
  ], [homeTeamName, awayTeamName]);

  const toggleShowMore = (index) => setShowMore((prev) => prev.map((val, i) => (i === index ? !val : val)));

  const getResultIndicator = (homeScore, awayScore, isHomeTeam) => {
    if (homeScore === awayScore) return 'D';
    return isHomeTeam ? (homeScore > awayScore ? 'W' : 'L') : (awayScore > homeScore ? 'W' : 'L');
  };

  const renderMatches = (matches, teamName, index, filter) => {
    const filteredMatches = filterMatches(matches, teamName, filter);
    const teamForm = filteredMatches.slice(0, 5).map((match) => {
      const isHomeTeam = match.homeTeamName === teamName;
      return getResultIndicator(match.home, match.away, isHomeTeam);
    });
    return (
      <H2HTableWrapper>
        <SectionTitle>
          Last Matches: {teamName}
          {index < 2 && (
            <FormContainer>
              {teamForm.map((result, idx) => (
                <FormItem key={idx} result={result}>{result}</FormItem>
              ))}
            </FormContainer>
          )}
        </SectionTitle>
        {filteredMatches.slice(0, showMore[index] ? filteredMatches.length : 5).map((match) => (
          <TableRow key={match.id} onClick={() => navigate(`/fixture/id/${match.id}`)}>
            <DateCell>{formatDate(match.date)}</DateCell>
            <HomeTeamCell>
              <TeamName $align="right">{match.homeTeamName}</TeamName>
              <TeamLogo src={match.homeTeamLogo || 'default-logo.png'} alt={match.homeTeamName} $align="right" />
            </HomeTeamCell>
            <ScoreCell>
              <Score>{match.home ?? '-'}</Score> : <Score>{match.away ?? '-'}</Score>
            </ScoreCell>
            <AwayTeamCell>
              <TeamLogo src={match.awayTeamLogo || 'default-logo.png'} alt={match.awayTeamName} $align="left" />
              <TeamName $align="left">{match.awayTeamName}</TeamName>
            </AwayTeamCell>
          </TableRow>
        ))}
        {filteredMatches.length > 5 && (
          <ShowMoreTabButton onClick={() => toggleShowMore(index)}>
            {showMore[index] ? 'Show less' : 'Show more'}
          </ShowMoreTabButton>
        )}
      </H2HTableWrapper>
    );
  };

  return (
    <>
      {tabs.map((tab) => (
        <SubTab key={tab.value} $isActive={activeTab === tab.value} onClick={() => setActiveTab(tab.value)}>
          {tab.label}
        </SubTab>
      ))}
      {activeTab === 'overall' && (
        <>
          {renderMatches(lastHomeMatches, homeTeamName, 0, 'overall')}
          {renderMatches(lastAwayMatches, awayTeamName, 1, 'overall')}
        </>
      )}
      {activeTab === 'home' && renderMatches(lastHomeMatches, homeTeamName, 0, 'home')}
      {activeTab === 'away' && renderMatches(lastAwayMatches, awayTeamName, 1, 'away')}
      {renderMatches(headToHeadMatches, null, 2)}
    </>
  );
};

export default H2H;
