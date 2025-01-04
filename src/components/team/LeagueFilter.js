import React from 'react';
import { FilterContainer, FilterLabel, Select } from '../../styles/Styles';

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

