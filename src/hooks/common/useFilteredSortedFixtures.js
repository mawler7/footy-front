import { useMemo } from "react";

export const useFilteredSortedFixtures = (fixtures, columnFilters, sortColumn, sortOrder) => {
    const filteredFixtures = useMemo(() => {
        return fixtures.filter(match => {
            return Object.entries(columnFilters).every(([column, filterValue]) => {
                if (!filterValue) return true;

                if (column === "date") {
                    const cellValue = new Date(match[column] * 1000).toLocaleDateString();
                    const filterText =
                        typeof filterValue === "number"
                            ? new Date(filterValue * 1000).toLocaleDateString()
                            : String(filterValue);
                    return cellValue.includes(filterText);
                } else {
                    const cellValue = String(match[column] || "").toLowerCase();
                    return cellValue.includes(String(filterValue).toLowerCase());
                }
            });
        });
    }, [fixtures, columnFilters]);

    const sortedFixtures = useMemo(() => {
        let sorted = [...filteredFixtures];
        sorted.sort((a, b) => {
            let aValue = a[sortColumn];
            let bValue = b[sortColumn];

            if (sortColumn === "date") {
                aValue = new Date(aValue * 1000);
                bValue = new Date(bValue * 1000);
            } else {
                aValue = String(aValue).toLowerCase();
                bValue = String(bValue).toLowerCase();
            }

            if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
            if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
        return sorted;
    }, [filteredFixtures, sortColumn, sortOrder]);

    return sortedFixtures;
};
