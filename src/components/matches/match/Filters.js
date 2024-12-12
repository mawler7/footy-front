import React from 'react';

const Filters = ({ selectedDate, setSelectedDate, sortType, setSortType }) => (
    <div>
        <input
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
        />
        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
            <option value="LEAGUE_NAME">Sort by League Name</option>
            <option value="TIME">Sort by Time</option>
        </select>
    </div>
);

export default Filters;