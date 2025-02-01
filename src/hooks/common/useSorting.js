import { useState } from "react";

export const useSorting = (initialColumn = "date", initialOrder = "desc") => {
    const [sortColumn, setSortColumn] = useState(initialColumn);
    const [sortOrder, setSortOrder] = useState(initialOrder);

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortOrder("desc");
        }
    };

    return { sortColumn, sortOrder, handleSort };
};
