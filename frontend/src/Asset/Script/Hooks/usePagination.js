// reusable Pagination Component using React Bootstrap is here. use with usePagination hook in Hooks folder.
import { useState, useMemo } from 'react';

/**
 * Custom hook for handling pagination logic
 * @param {Array} data - Array of items to paginate
 * @param {number} itemsPerPage - Number of items per page (default: 6)
 * @returns {Object} Pagination state and functions
 */
function usePagination(data, itemsPerPage = 6) {
  // Current page state (starts from 1)
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages based on data length
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Calculate current items to display using useMemo for performance
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  // Navigation functions
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Generate page numbers for pagination display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Show maximum 5 page numbers

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  // Reset to first page when data changes
  const resetPagination = () => setCurrentPage(1);

  return {
    currentItems,        // Items to display on current page
    currentPage,         // Current page number
    totalPages,          // Total number of pages
    goToPage,           // Function to go to specific page
    goToFirstPage,      // Function to go to first page
    goToLastPage,       // Function to go to last page
    goToNextPage,       // Function to go to next page
    goToPrevPage,       // Function to go to previous page
    getPageNumbers,     // Function to get visible page numbers
    resetPagination,    // Function to reset to first page
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    totalItems: data.length
  };
}

export default usePagination;