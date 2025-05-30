// reusable UI component for pagination using react-bootstrap is here.
import { Pagination } from 'react-bootstrap';

/**
 * Reusable Pagination Component
 * @param {Object} paginationData - Data from usePagination hook
 * @param {string} size - Pagination size ('sm', 'lg', or default)
 * @param {string} id - Custom CSS id for styling
 * @returns {JSX.Element} Pagination component
 */
function PaginationComponent({
                               paginationData,
                               size = 'sm',
                               id = 'customPagination'
                             }) {
  const {
    currentPage,
    totalPages,
    goToPage,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPrevPage,
    getPageNumbers,
    hasNextPage,
    hasPrevPage
  } = paginationData;

  // Don't render pagination if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination id={id} size={size}>
      {/* First page button - only show if not on first page */}
      <Pagination.First
        onClick={goToFirstPage}
        disabled={!hasPrevPage}
      />

      {/* Previous page button */}
      <Pagination.Prev
        onClick={goToPrevPage}
        disabled={!hasPrevPage}
      />

      {/* Page number buttons */}
      {getPageNumbers().map(pageNumber => (
        <Pagination.Item
          key={pageNumber}
          active={pageNumber === currentPage}
          onClick={() => goToPage(pageNumber)}
        >
          {pageNumber}
        </Pagination.Item>
      ))}

      {/* Next page button */}
      <Pagination.Next
        onClick={goToNextPage}
        disabled={!hasNextPage}
      />

      {/* Last page button - only show if not on last page */}
      <Pagination.Last
        onClick={goToLastPage}
        disabled={!hasNextPage}
      />
    </Pagination>
  );
}

export default PaginationComponent;