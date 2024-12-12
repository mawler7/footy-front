import React from 'react';
import styled from 'styled-components';

const LeagueFilter = ({ leagues, onSelectLeague }) => (
  <FilterContainer>
    <FilterLabel>Filter by League:</FilterLabel>
    <Select onChange={(e) => onSelectLeague(Number(e.target.value))}>
      <option value="">All Leagues</option>
      {leagues.map(league => (
        <option key={league.id} value={league.id}>
          {league.name}
        </option>
      ))}
    </Select>
  </FilterContainer>
);

export default LeagueFilter;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const FilterLabel = styled.label`
  margin-right: 10px;
  color: white;
`;

const Select = styled.select`
  padding: 5px 10px;
  border-radius: 5px;
  background: #222;
  color: white;
  border: 1px solid #444;
`;
