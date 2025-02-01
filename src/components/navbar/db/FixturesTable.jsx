import React, { useState, useEffect } from "react";
import {
    StyledTable,
    TableHeader,
    TableHeaderSortIcon,
    TableCell,
    Tooltip,
    LeagueLogo,
    HomeTeamWrapper,
    AwayTeamWrapper,
    TeamLogo,
    HomeTeamName,
    AwayTeamName,
    Score,
    TableRow,
    FilterDropdown,
} from "../../../styles/navbar/DBViewStyles";

const FixturesTable = ({
    fixtures,
    handleRowClick,
    sortColumn,
    sortOrder,
    handleSort,
    onColumnFilter,
    columnFilters,
}) => {
    const [activeFilterColumn, setActiveFilterColumn] = useState(null);

    useEffect(() => {
        if (Object.keys(columnFilters).length === 0) {
            setActiveFilterColumn(null);
        }
    }, [columnFilters]);

    const toggleFilterDropdown = (column) => {
        setActiveFilterColumn((prev) => (prev === column ? null : column));
    };

    const SortIcon = ({ column, sortColumn, sortOrder, handleSort }) => {
        const icon = sortColumn === column ? (sortOrder === "asc" ? "↑" : "↓") : "↕";
        return (
            <TableHeaderSortIcon
                onClick={(e) => {
                    e.stopPropagation();
                    handleSort(column);
                }}
            >
                {icon}
            </TableHeaderSortIcon>
        );
    };

    const renderSortIcon = (column) => {
        return <SortIcon column={column} sortColumn={sortColumn} sortOrder={sortOrder} handleSort={handleSort} />;
    };

    const getDistinctValues = (column) => {
        return Array.from(new Set(fixtures.map(match => match[column]).filter(val => val != null)));
    };

    const renderFilterDropdown = (column) => {
        const options = getDistinctValues(column);
        return (
            <FilterDropdown>
                {options.map((value) => (
                    <li
                        key={value}
                        onClick={(e) => {
                            e.stopPropagation();
                            onColumnFilter(column, value);
                            setActiveFilterColumn(null);
                        }}
                    >
                        {column === "date"
                            ? new Date(value * 1000).toLocaleDateString()
                            : value}
                    </li>
                ))}
                <li
                    onClick={(e) => {
                        e.stopPropagation();
                        onColumnFilter(column, "");
                        setActiveFilterColumn(null);
                    }}
                >
                    Clear Filter
                </li>
            </FilterDropdown>
        );
    };

    const renderHeaderCell = (column, label) => {
        return (
            <TableHeader>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span
                        onClick={(e) => {
                            e.stopPropagation();
                            handleSort(column);
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        {label} {renderSortIcon(column)}
                    </span>
                    <span
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleFilterDropdown(column);
                        }}
                        style={{ cursor: "pointer", marginLeft: "4px" }}
                    >
                        &#x1F50D;
                    </span>
                </div>
                {activeFilterColumn === column && renderFilterDropdown(column)}
            </TableHeader>
        );
    };

    return (
        <StyledTable>
            <thead>
                <tr>
                    {renderHeaderCell("leagueName", "League")}
                    {renderHeaderCell("date", "Date")}
                    {renderHeaderCell("homeTeamName", "Home Team")}
                    <TableCell as="th">Result</TableCell>
                    {renderHeaderCell("awayTeamName", "Away Team")}
                </tr>
            </thead>
            <tbody>
                {fixtures.map((match) => (
                    <TableRow key={match.id} onClick={() => handleRowClick(match.id)}>
                        <TableCell>
                            <Tooltip data-tooltip={match.leagueName}>
                                <LeagueLogo src={match.leagueLogo} alt="League" />
                            </Tooltip>
                        </TableCell>
                        <TableCell>{new Date(match.date * 1000).toLocaleDateString()}</TableCell>
                        <TableCell>
                            <HomeTeamWrapper>
                                <HomeTeamName>{match.homeTeamName}</HomeTeamName>
                                <TeamLogo src={match.homeTeamLogo} alt={match.homeTeamName} />
                            </HomeTeamWrapper>
                        </TableCell>
                        <TableCell>
                            <Score>{match.fullTimeHome ?? '-'}</Score> : <Score>{match.fullTimeAway ?? '-'}</Score>
                        </TableCell>
                        <TableCell>
                            <AwayTeamWrapper>
                                <TeamLogo src={match.awayTeamLogo} alt={match.awayTeamName} />
                                <AwayTeamName>{match.awayTeamName}</AwayTeamName>
                            </AwayTeamWrapper>
                        </TableCell>
                    </TableRow>
                ))}
            </tbody>
        </StyledTable>
    );
};

export default FixturesTable;
