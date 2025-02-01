import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingWrapper, Spinner } from '../../styles/content/GlobalStyles';
import { ResultsMatchesTableWrapper } from '../../styles/content/AppContentStyles';
import Round from './Round';

const Matches = ({ matches }) => {
  const [expandedRounds, setExpandedRounds] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { groupedMatches, sortedRounds } = useMemo(() => {
    if (!matches) return { groupedMatches: {}, sortedRounds: [] };

    const grouped = matches.reduce((acc, fixture) => {
      const round = fixture.round || 'Unknown Round';
      acc[round] = acc[round] || [];
      acc[round].push(fixture);
      return acc;
    }, {});

    Object.keys(grouped).forEach((round) => {
      grouped[round].sort((a, b) => new Date(a.date) - new Date(b.date));
    });

    const roundDates = Object.keys(grouped).reduce((acc, round) => {
      acc[round] = grouped[round][0].date;
      return acc;
    }, {});

    const sorted = Object.keys(grouped).sort(
      (a, b) => new Date(roundDates[a]) - new Date(roundDates[b])
    );

    return { groupedMatches: grouped, sortedRounds: sorted };
  }, [matches]);

  useEffect(() => {
    if (sortedRounds.length > 0) {
      const defaultExpanded = sortedRounds.reduce((acc, round) => {
        acc[round] = true;
        return acc;
      }, {});
      setExpandedRounds(defaultExpanded);
      setIsLoading(false);
    }
  }, [sortedRounds]);

  const toggleRound = (round) => {
    setExpandedRounds((prev) => ({
      ...prev,
      [round]: !prev[round],
    }));
  };

  const handleMatchClick = (id) => {
    navigate(`/fixture/id/${id}`);
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString([], {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <LoadingWrapper>
        <Spinner />
      </LoadingWrapper>
    );
  }

  return (
    <ResultsMatchesTableWrapper>
      {sortedRounds.map((round) => (
        <Round
          key={round}
          round={round}
          matches={groupedMatches[round]}
          expanded={expandedRounds[round]}
          onToggle={() => toggleRound(round)}
          onMatchClick={handleMatchClick}
          formatDateTime={formatDateTime}
        />
      ))}
    </ResultsMatchesTableWrapper>
  );
};

export default Matches;
