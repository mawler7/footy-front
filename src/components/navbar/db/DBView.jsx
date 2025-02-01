import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLeagues } from "../../../hooks/leagues/useLeagues";
import { useFixtures } from "../../../hooks/matches/useFixtures";
import { useSorting } from "../../../hooks/common/useSorting";
import { useFilteredSortedFixtures } from "../../../hooks/common/useFilteredSortedFixtures";
import Filters from "./Filters";
import FixturesTable from "./FixturesTable";
import { MatchesWrapper, ErrorText, NoMatchesText } from "../../../styles/navbar/DBViewStyles";
import LoadingSpinner from "../../common/LoadingSpinner";
import { Pagination } from "../../common/Pagination";

const DBView = () => {
    const [filters, setFilters] = useState({
        startDate: "",
        endDate: "",
        leagueId: "",
        homeName: "",
        awayName: "",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [columnFilters, setColumnFilters] = useState({});

    const { sortColumn, sortOrder, handleSort } = useSorting();
    const { leagues, loading: leaguesLoading, error: leaguesError } = useLeagues(true);
    const { fixtures, loading, error, totalPages } = useFixtures(filters, currentPage);

    const sortedFixtures = useFilteredSortedFixtures(fixtures, columnFilters, sortColumn, sortOrder);

    const navigate = useNavigate();
    const handleRowClick = useCallback((matchId) => navigate(`/fixture/id/${matchId}`), [navigate]);

    const handleColumnFilter = useCallback((column, value) => {
        setColumnFilters(prev => ({ ...prev, [column]: value }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters({
            startDate: "",
            endDate: "",
            leagueId: "",
            homeName: "",
            awayName: "",
        });
        setColumnFilters({});
    }, []);

    const applyFilters = useCallback(() => setCurrentPage(1), []);

    return (
        <MatchesWrapper>
            <Filters
                filters={filters}
                setFilters={setFilters}
                leagues={leagues}
                applyFilters={applyFilters}
                resetFilters={resetFilters}
                loading={leaguesLoading}
            />

            {(leaguesError || error) && <ErrorText>{leaguesError || error}</ErrorText>}
            {loading && <LoadingSpinner />}

            {sortedFixtures.length > 0 ? (
                <>
                    <FixturesTable
                        fixtures={sortedFixtures}
                        handleRowClick={handleRowClick}
                        sortColumn={sortColumn}
                        sortOrder={sortOrder}
                        handleSort={handleSort}
                        onColumnFilter={handleColumnFilter}
                        columnFilters={columnFilters}
                    />
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </>
            ) : (
                !loading && <NoMatchesText>No matches found</NoMatchesText>
            )}
        </MatchesWrapper>
    );
};

export default DBView;
