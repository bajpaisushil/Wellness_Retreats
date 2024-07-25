import React from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => (
  <div className="flex justify-center items-center m-4 mt-8">
    <button
      onClick={() => onPageChange(page - 1)}
      disabled={page <= 1}
      className="px-4 py-2 border rounded bg-[#1b3252] text-white"
    >
      Previous
    </button>
    <span className="mx-4">Page {page} of {totalPages}</span>
    <button
      onClick={() => onPageChange(page + 1)}
      disabled={page >= totalPages}
      className="px-4 py-2 border rounded bg-[#1b3252] text-white"
    >
      Next
    </button>
  </div>
);

export default Pagination;
