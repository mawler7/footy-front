import { Ellipsis, PaginationButton, PaginationWrapper } from "../../styles/navbar/DBViewStyles";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const MAX_VISIBLE_BUTTONS = 5;

    const generatePages = () => {
        const pages = [];
        const firstPage = 1;
        const lastPage = totalPages;

        if (totalPages <= MAX_VISIBLE_BUTTONS) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(firstPage);

            if (currentPage > 3) {
                pages.push("prev-ellipsis");
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(currentPage + 1, totalPages - 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push("next-ellipsis");
            }

            pages.push(lastPage);
        }

        return pages;
    };

    const pages = generatePages();

    return (
        <PaginationWrapper>
            {pages.map((page, index) =>
                typeof page === "string" ? (
                    <Ellipsis key={page}>...</Ellipsis>
                ) : (
                    <PaginationButton
                        key={`page-${page}`}
                        onClick={() => onPageChange(page)}
                        active={page === currentPage}
                    >
                        {page}
                    </PaginationButton>
                )
            )}
        </PaginationWrapper>
    );
};
