import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
  onLimitChange?: (limit: number) => void;
  limitOptions?: number[];
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 10,
  totalItems,
  onLimitChange,
  limitOptions = [5, 10, 20, 50],
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-6 py-4 dark:border-slate-700 dark:bg-[#161F2E]">
      {/* Mobile View */}
      <div className="flex flex-1 items-center justify-between sm:hidden">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="relative inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-700"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Prev
        </button>

        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-700"
        >
          Next
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Desktop View */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className="flex items-center gap-6">
          {/* Info Text */}
          <div className="flex items-center gap-2">
            <p className="text-sm font-normal text-slate-500 dark:text-slate-400">
              Showing
            </p>
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="font-semibold text-slate-600 dark:text-indigo-400">
                  {totalItems
                    ? Math.min(
                        (currentPage - 1) * (itemsPerPage || 10) + 1,
                        totalItems
                      )
                    : 0}
                </span>
                {' - '}
                <span className="font-semibold text-slate-600 dark:text-indigo-400">
                  {totalItems
                    ? Math.min(currentPage * (itemsPerPage || 10), totalItems)
                    : 0}
                </span>
                <span className="text-slate-500 dark:text-slate-500">
                  {' '}
                  of {totalItems || 0}
                </span>
              </p>
            </div>
          </div>

          {/* Items Per Page Selector */}
          {onLimitChange && (
            <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
              <label
                htmlFor="limit-select"
                className="text-sm font-medium text-slate-600 dark:text-slate-400"
              >
                Show:
              </label>
              <select
                id="limit-select"
                value={itemsPerPage}
                onChange={e => onLimitChange(Number(e.target.value))}
                className="cursor-pointer rounded-md border-0 bg-slate-50 px-2 py-1 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-slate-300 dark:focus:ring-indigo-400"
              >
                {limitOptions.map(limit => (
                  <option key={limit} value={limit}>
                    {limit}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Page Navigation */}
        <nav className="flex items-center gap-1" aria-label="Pagination">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="group relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-all hover:bg-white hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-600 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-indigo-400 dark:disabled:hover:text-slate-400"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="mx-2 flex items-center gap-1">
            {getPageNumbers().map((page, index) => {
              if (page === '...') {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="inline-flex h-9 w-9 items-center justify-center text-sm font-medium text-slate-400 dark:text-slate-600"
                  >
                    ···
                  </span>
                );
              }
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page as number)}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition-all ${
                    currentPage === page
                      ? 'scale-105 bg-linear-to-br from-indigo-500 to-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-600 hover:scale-105 hover:bg-white hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-indigo-400'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="group relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-all hover:bg-white hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-600 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-indigo-400 dark:disabled:hover:text-slate-400"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
