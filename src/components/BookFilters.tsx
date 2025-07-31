import React from 'react';
import { Filters } from '@/types/book';

interface BookFiltersProps {
  filters: Filters;
  sortBy: string;
  onUpdateFilters: (filters: Filters) => void;
  onUpdateSortBy: (sortBy: string) => void;
}

export default function BookFilters({ filters, sortBy, onUpdateFilters, onUpdateSortBy }: BookFiltersProps) {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onUpdateFilters({
      ...filters,
      [name]: value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Filter & Sort</h2>
      </div>
      
      <div className="p-4">
        <div className="space-y-3">
          <div>
            <select 
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">All Genres</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science Fiction">Sci-Fi</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Biography">Biography</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <select 
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">All Shelves</option>
              <option value="Read">Read</option>
              <option value="Reading">Currently Reading</option>
              <option value="To Read">Want to Read</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs text-gray-600 mb-1">Sort by:</label>
            <div className="grid grid-cols-3 gap-1">
              <button 
                onClick={() => onUpdateSortBy('title')}
                className={`py-1 px-2 rounded text-xs font-medium transition-colors ${
                  sortBy === 'title' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Title
              </button>
              <button 
                onClick={() => onUpdateSortBy('author')}
                className={`py-1 px-2 rounded text-xs font-medium transition-colors ${
                  sortBy === 'author' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Author
              </button>
              <button 
                onClick={() => onUpdateSortBy('rating')}
                className={`py-1 px-2 rounded text-xs font-medium transition-colors ${
                  sortBy === 'rating' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Rating
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}