import React from 'react';

interface Book {
  title: string;
  author: string;
  category: string;
  rating: number;
  status: string;
}

interface BookListProps {
  books: Book[];
  onRemoveBook: (index: number) => void;
}

export default function BookList({ books, onRemoveBook }: BookListProps) {
  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-stone-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <p className="text-xl font-medium mb-2 text-stone-600">Your library is empty</p>
        <p className="text-stone-400">Add some books to start building your collection</p>
        <button className="mt-6 px-4 py-2 bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 transition-colors flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add your first book
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {books.map((book, index) => (
        <div
          key={index}
          className="bg-white border border-stone-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
        >
          {/* Reading ribbon */}
          {book.status === 'Reading' && (
            <div className="absolute top-0 right-0 w-20 h-20">
              <div className="absolute transform rotate-45 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-bold py-1 right-[-40px] top-[20px] w-[140px] text-center shadow-md">
                READING
              </div>
            </div>
          )}
          
          {/* Book cover decoration */}
          <div 
            className={`absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b ${
              book.status === 'Read' ? 'from-stone-400 to-stone-600' : 
              book.status === 'Reading' ? 'from-amber-400 to-amber-600' : 
              'from-slate-400 to-slate-600'
            }`}
          />
          
          <div className="flex justify-between items-start pl-4">
            <div>
              <h3 className="font-bold text-xl text-stone-800 group-hover:text-stone-700 transition-colors line-clamp-1">{book.title}</h3>
              <p className="text-stone-600 mb-2">by {book.author}</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-800">
                  {book.category}
                </span>
                <span 
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    book.status === 'Read' ? 'bg-stone-100 text-stone-800' : 
                    book.status === 'Reading' ? 'bg-amber-100 text-amber-800' : 
                    'bg-slate-100 text-slate-800'
                  }`}
                >
                  {book.status === 'Read' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                  {book.status === 'Reading' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  )}
                  {book.status === 'To Read' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  )}
                  {book.status}
                </span>
              </div>
              
              <div className="flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <svg 
                      key={n}
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 ${n <= book.rating ? 'text-amber-400' : 'text-gray-300'}`}
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">{book.rating}/5</span>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <button 
                onClick={() => onRemoveBook(index)}
                className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 opacity-0 group-hover:opacity-100 focus:opacity-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              
              {/* Book actions menu */}
              <div className="mt-auto pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex space-x-1">
                  <button className="p-1.5 rounded-md bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button className="p-1.5 rounded-md bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <button className="p-1.5 rounded-md bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        </div>
      ))}
    </div>
  );
}
