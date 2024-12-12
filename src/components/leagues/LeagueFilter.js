import React from 'react';
import styled from 'styled-components';

const LeagueFilter = ({ leagues, onSelectLeague }) => {
    return (
        <LeagueFilterContainer>
            {leagues.map((league) => (
                <LeagueButton key={league.id} onClick={() => onSelectLeague(league.id)}>
                    {league.leagueName}
                </LeagueButton>
            ))}
        </LeagueFilterContainer>
    );
};

export default LeagueFilter;

const LeagueFilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;
`;

const LeagueButton = styled.button`
  background: #444;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #555;
  }
`;