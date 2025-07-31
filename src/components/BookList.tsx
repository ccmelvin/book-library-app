import React from 'react';
import { Book } from '@/types/book';

interface BookListProps {
  books: Book[];
  onRemoveBook: (index: number) => void;
  onEditBook: (index: number) => void;
  onToggleFavorite: (index: number) => void;
  viewMode?: 'list' | 'grid';
}

export default function BookList({ books, onRemoveBook, onEditBook, onToggleFavorite, viewMode = 'list' }: BookListProps) {
  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
        <p className="text-gray-500">Add some books to start building your collection</p>
      </div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {books.map((book, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow group"
          >
            <div className="text-center">
              {book.coverImage ? (
                <img 
                  src={book.coverImage} 
                  alt={`${book.title} cover`}
                  className="w-full h-32 object-cover rounded mb-3"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`w-full h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded mb-3 flex items-center justify-center ${book.coverImage ? 'hidden' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              
              <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-1">{book.title}</h3>
              <p className="text-xs text-gray-600 mb-2">by {book.author}</p>
              
              <div className="flex items-center justify-center mb-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <svg 
                    key={n}
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-3 w-3 ${n <= book.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <span 
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  book.status === 'Read' ? 'bg-green-100 text-green-800' : 
                  book.status === 'Reading' ? 'bg-blue-100 text-blue-800' : 
                  'bg-orange-100 text-orange-800'
                }`}
              >
                {book.status === 'Reading' ? 'Reading' : book.status === 'To Read' ? 'Want to Read' : book.status}
              </span>
              
              <button 
                onClick={() => onRemoveBook(index)}
                className="mt-2 text-red-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-red-50"
                title="Remove book"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {books.map((book, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow group"
        >
          <div className="flex space-x-4">
            {/* Book Cover */}
            <div className="flex-shrink-0">
              {book.coverImage ? (
                <img 
                  src={book.coverImage} 
                  alt={`${book.title} cover`}
                  className="w-16 h-24 object-cover rounded shadow-sm"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`w-16 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded shadow-sm flex items-center justify-center ${book.coverImage ? 'hidden' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            
            {/* Book Details */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <h3 className="font-semibold text-gray-900 hover:text-green-600 cursor-pointer mb-1">{book.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">by <span className="text-green-600 hover:underline cursor-pointer">{book.author}</span></p>
                  
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <svg 
                          key={n}
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-4 w-4 ${n <= book.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-sm text-gray-500">{book.rating}/5</span>
                    </div>
                    
                    <span className="text-sm text-gray-500">•</span>
                    
                    <span className="text-sm text-gray-600">{book.category}</span>
                    
                    {book.pages && (
                      <>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-600">{book.pages} pages</span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-2">
                    <span 
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        book.status === 'Read' ? 'bg-green-100 text-green-800' : 
                        book.status === 'Reading' ? 'bg-blue-100 text-blue-800' : 
                        'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {book.status === 'Reading' ? 'Currently Reading' : book.status === 'To Read' ? 'Want to Read' : book.status}
                    </span>
                  </div>
                  
                  {book.notes && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 italic line-clamp-2">&quot;{book.notes}&quot;</p>
                    </div>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col space-y-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex flex-col space-y-1">
                    <button 
                      onClick={() => onEditBook(index)}
                      className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                      title="Edit book"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => onRemoveBook(index)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Remove book"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => onToggleFavorite(index)}
                      className={`p-1.5 rounded transition-colors ${
                        book.isFavorite 
                          ? 'text-red-500 hover:text-red-600 hover:bg-red-50' 
                          : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                      }`}
                      title={book.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={book.isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
