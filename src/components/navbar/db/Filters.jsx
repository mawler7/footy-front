import React, { useCallback } from "react";
import styled from "styled-components";
import { FiltersWrapper, InputField, Button } from "../../../styles/navbar/DBViewStyles";
import { Select } from "../../../styles/navbar/adminStyles";

const TopRightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const BottomRightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.small};
`;

const Filters = ({ filters, setFilters, leagues, applyFilters, resetFilters, loading }) => {
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    }, [setFilters]);

    const handleSubmit = (e) => {
        e.preventDefault();
        applyFilters();
    };

    return (
        <form onSubmit={handleSubmit}>
            <TopRightContainer>
                <Button
                    type="button"
                    onClick={resetFilters}
                    disabled={loading}
                    style={{
                        backgroundColor: "#ccc",
                        color: "#000"
                    }}
                >
                    Reset
                </Button>
            </TopRightContainer>

            <FiltersWrapper>
                <InputField
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleInputChange}
                />
                <InputField
                    type="date"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleInputChange}
                />
                <Select name="leagueId" value={filters.leagueId} onChange={handleInputChange}>
                    <option value="">Select a League</option>
                    {leagues.map((league) => (
                        <option key={league.id} value={league.id}>
                            {league.leagueName}
                        </option>
                    ))}
                </Select>
                <InputField
                    type="text"
                    name="homeName"
                    placeholder="Home Team"
                    value={filters.homeName}
                    onChange={handleInputChange}
                />
                <InputField
                    type="text"
                    name="awayName"
                    placeholder="Away Team"
                    value={filters.awayName}
                    onChange={handleInputChange}
                />
            </FiltersWrapper>
        </form>
    );
};

export default Filters;
