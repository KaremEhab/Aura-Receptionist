import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Pagination.css';

export function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange, label = "items" }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="table-pagination-footer">
      <span className="results-count">
        Showing <span className="font-bold text-[var(--title)]">{startItem} to {endItem}</span> of {totalItems} {label}
      </span>
      <div className="pagination-controls">
        <button 
          className="btn-pagination-nav" 
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex items-center gap-1">
          <button 
            className={`btn-page-num ${currentPage === 1 ? 'active' : ''}`}
            onClick={() => onPageChange(1)}
          >
            1
          </button>
          {totalPages > 1 && (
            <button 
              className={`btn-page-num ${currentPage === 2 ? 'active' : ''}`}
              onClick={() => onPageChange(2)}
            >
              2
            </button>
          )}
          {totalPages > 3 && <span className="page-dots">...</span>}
          {totalPages > 2 && currentPage > 2 && currentPage < totalPages && (
            <button className="btn-page-num active">{currentPage}</button>
          )}
          {totalPages > 2 && (
            <button 
              className={`btn-page-num ${currentPage === totalPages ? 'active' : ''}`}
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          )}
        </div>
        <button 
          className="btn-pagination-nav" 
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
