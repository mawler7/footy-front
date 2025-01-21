import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoadingWrapper, Spinner } from '../../styles/content/GlobalStyles';
import Round from './Round';
import { ResultsMatchesTableWrapper } from '../../styles/content/AppContentStyles';

const Results = ({ matches }) => {
  const navigate = useNavigate();
  const [expandedRounds, setExpandedRounds] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const groupedMatches = useMemo(() => {
    if (!matches) return {};
    const grouped = matches.reduce((acc, fixture) => {
      const round = fixture.round || 'Unknown Round';
      acc[round] = acc[round] || [];
      acc[round].push(fixture);
      return acc;
    }, {});

    Object.keys(grouped).forEach((round) => {
      grouped[round].sort((a, b) => new Date(a.date) - new Date(b.date));
    });
    return grouped;
  }, [matches]);

  useEffect(() => {
    if (matches) {
      const defaultExpanded = Object.keys(groupedMatches).reduce((acc, round) => {
        acc[round] = true;
        return acc;
      }, {});
      setExpandedRounds(defaultExpanded);
      setIsLoading(false);
    }
  }, [groupedMatches, matches]);

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

  const extractRoundNumber = (roundName) => {
    const match = roundName.match(/\d+$/);
    return match ? parseInt(match[0], 10) : 0;
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
      {Object.keys(groupedMatches)
        .sort((a, b) => extractRoundNumber(b) - extractRoundNumber(a))
        .map((round) => (
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

export default Results;
