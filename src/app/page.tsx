'use client';

import { useState, useMemo } from 'react';
import BookForm from '@/components/BookForm';
import BookFilters from '@/components/BookFilters';
import BookList from '@/components/BookList';

interface Book {
  title: string;
  author: string;
  category: string;
  rating: number;
  status: string;
}

interface Filters {
  category: string;
  status: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      category: "Fiction",
      rating: 4,
      status: "Read"
    },
    {
      title: "Sapiens",
      author: "Yuval Noah Harari",
      category: "Non-Fiction",
      rating: 5,
      status: "Read"
    },
    {
      title: "Dune",
      author: "Frank Herbert",
      category: "Science Fiction",
      rating: 5,
      status: "Reading"
    }
  ]);

  const [filters, setFilters] = useState<Filters>({
    category: "",
    status: ""
  });

  const [sortBy, setSortBy] = useState("title");

  const handleAddBook = (newBook: Book) => {
    setBooks([...books, newBook]);
  };

  const handleRemoveBook = (index: number) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  const filteredBooks = useMemo(() => {
    let result = [...books];
    
    // Apply filters
    if (filters.category) {
      result = result.filter(book => book.category === filters.category);
    }
    
    if (filters.status) {
      result = result.filter(book => book.status === filters.status);
    }
    
    // Apply sorting
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => {
        const valA = a[sortBy as keyof Book].toString().toLowerCase();
        const valB = b[sortBy as keyof Book].toString().toLowerCase();
        return valA < valB ? -1 : valA > valB ? 1 : 0;
      });
    }
    
    return result;
  }, [books, filters, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-neutral-50 to-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-10 text-center">
          <div className="inline-block mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-stone-700 to-neutral-700 mb-2">Personal Book Library</h1>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">Track, organize, and discover your reading journey with this beautiful digital bookshelf</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <BookForm onAddBook={handleAddBook} />
            
            <BookFilters 
              filters={filters}
              sortBy={sortBy}
              onUpdateFilters={setFilters}
              onUpdateSortBy={setSortBy}
            />
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-stone-100 backdrop-blur-sm bg-white/80 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-stone-100 rounded-full opacity-30"></div>
              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-neutral-100 rounded-full opacity-30"></div>
              
              <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-stone-700 to-neutral-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  My Collection
                </h2>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    {['Read', 'Reading', 'To Read'].map((status) => (
                      <span key={status} 
                        className={`w-3 h-3 rounded-full ${
                          status === 'Read' ? 'bg-stone-600' : 
                          status === 'Reading' ? 'bg-amber-600' : 
                          'bg-slate-600'
                        }`}>
                      </span>
                    ))}
                  </div>
                  
                  <span className="bg-gradient-to-r from-stone-600 to-neutral-600 text-white px-4 py-1.5 rounded-full font-medium text-sm flex items-center shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
                  </span>
                </div>
              </div>
              
              {/* Collection stats */}
              {books.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mb-8 relative z-10">
                  <div className="bg-gradient-to-br from-stone-50 to-stone-100 p-4 rounded-xl border border-stone-200">
                    <div className="text-stone-700 font-medium">Read</div>
                    <div className="text-2xl font-bold text-stone-800">
                      {books.filter(b => b.status === 'Read').length}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200">
                    <div className="text-amber-700 font-medium">Reading</div>
                    <div className="text-2xl font-bold text-amber-800">
                      {books.filter(b => b.status === 'Reading').length}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-xl border border-slate-200">
                    <div className="text-slate-700 font-medium">To Read</div>
                    <div className="text-2xl font-bold text-slate-800">
                      {books.filter(b => b.status === 'To Read').length}
                    </div>
                  </div>
                </div>
              )}
              
              {/* View options */}
              {books.length > 0 && (
                <div className="flex justify-between items-center mb-6 relative z-10">
                  <div className="text-sm text-gray-500">
                    {filteredBooks.length} of {books.length} books
                    {(filters.category || filters.status) && (
                      <span>
                        (filtered)
                      </span>
                    )}
                  </div>
                  
                  <div className="flex bg-stone-100 p-1 rounded-lg">
                    <button className="p-1.5 rounded-md flex items-center justify-center w-8 h-8 bg-white shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </button>
                    <button className="p-1.5 rounded-md flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              
              <BookList books={filteredBooks} onRemoveBook={handleRemoveBook} />
            </div>
          </div>
        </div>
        
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Personal Book Library. Built with Next.js and Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
}
