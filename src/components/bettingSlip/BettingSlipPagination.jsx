import React from "react";

const BettingSlipPagination = ({ totalPages, currentPage, setCurrentPage }) => {
    const visiblePages = Array.from({ length: totalPages }, (_, index) => index + 1)
        .filter((page) => Math.abs(page - currentPage) <= 4);

    return (
        <div>
            {visiblePages.map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    disabled={currentPage === page}
                >
                    {page}
                </button>
            ))}
            {totalPages > 5 && currentPage < totalPages - 2 && <span>...</span>}
        </div>
    );
};

export default React.memo(BettingSlipPagination);
