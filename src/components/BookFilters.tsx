import React from 'react';

interface FiltersType {
  category: string;
  status: string;
}

interface BookFiltersProps {
  filters: FiltersType;
  sortBy: string;
  onUpdateFilters: (filters: FiltersType) => void;
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
    <div className="bg-white p-7 rounded-2xl shadow-xl border border-stone-100 backdrop-blur-sm bg-white/80 relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-stone-100 rounded-full opacity-50"></div>
      
      <h2 className="text-xl font-bold text-stone-800 mb-5 flex items-center relative z-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-stone-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
        </svg>
        Filter & Sort
      </h2>
      
      <div className="space-y-5 relative z-10">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <div className="relative">
            <select 
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full appearance-none px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500 pr-10 pl-10 transition-all"
            >
              <option value="">All Categories</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Biography">Biography</option>
              <option value="Other">Other</option>
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reading Status</label>
          <div className="relative">
            <select 
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full appearance-none px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500 pr-10 pl-10 transition-all"
            >
              <option value="">All Statuses</option>
              <option value="Read">Read</option>
              <option value="Reading">Currently Reading</option>
              <option value="To Read">To Read</option>
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
          <div className="bg-stone-50 p-1.5 rounded-lg flex">
            <button 
              onClick={() => onUpdateSortBy('title')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center ${
                sortBy === 'title' ? 'bg-white shadow text-stone-700' : 'text-gray-600 hover:bg-stone-100'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${sortBy === 'title' ? 'text-stone-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
              Title
            </button>
            <button 
              onClick={() => onUpdateSortBy('author')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center ${
                sortBy === 'author' ? 'bg-white shadow text-stone-700' : 'text-gray-600 hover:bg-stone-100'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${sortBy === 'author' ? 'text-stone-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Author
            </button>
            <button 
              onClick={() => onUpdateSortBy('rating')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center ${
                sortBy === 'rating' ? 'bg-white shadow text-stone-700' : 'text-gray-600 hover:bg-stone-100'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${sortBy === 'rating' ? 'text-stone-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Rating
            </button>
          </div>
        </div>
        
        <div className="pt-2">
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-100">
            <div className="flex items-center text-sm text-stone-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Active filters:</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {!filters.category && !filters.status && (
                <span className="text-xs text-gray-500">No active filters</span>
              )}
              
              {filters.category && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-800">
                  Category: {filters.category}
                  <button 
                    onClick={() => onUpdateFilters({...filters, category: ''})} 
                    className="ml-1 text-stone-600 hover:text-stone-800"
                  >
                    ×
                  </button>
                </span>
              )}
              
              {filters.status && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-800">
                  Status: {filters.status}
                  <button 
                    onClick={() => onUpdateFilters({...filters, status: ''})} 
                    className="ml-1 text-stone-600 hover:text-stone-800"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
