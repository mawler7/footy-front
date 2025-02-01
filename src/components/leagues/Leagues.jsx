import React, { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Sidebar } from '../../styles/league/LeaguesStyles';
import { useLeagues } from '../../hooks/leagues/useLeagues';
import LeagueHeader from './LeagueHeader';
import LeagueList from './LeagueList';
import LeagueListDrag from './LeagueListDrag';
import LeagueWrapper from '../league/League';

const Leagues = () => {
  const navigate = useNavigate();
  const { leagueId } = useParams();
  const [isDragEnabled, setIsDragEnabled] = useState(false);
  const { leagues, onDragEnd } = useLeagues();

  const handleToggleEdit = useCallback(() => {
    setIsDragEnabled((prev) => !prev);
  }, []);

  if (leagueId) {
    return <LeagueWrapper teamMode={false} leagues={leagues} />;
  }

  return (
    <Sidebar>
      <LeagueHeader isDragEnabled={isDragEnabled} onToggleEdit={handleToggleEdit} />
      {isDragEnabled ? (
        <LeagueListDrag leagues={leagues} onDragEnd={onDragEnd} />
      ) : (
        <LeagueList leagues={leagues} navigate={navigate} />
      )}
    </Sidebar>
  );
};

export default Leagues;
