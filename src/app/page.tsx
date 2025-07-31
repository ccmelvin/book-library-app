'use client';

import { useState, useMemo, useEffect } from 'react';
import BookForm from '@/components/BookForm';
import BookFilters from '@/components/BookFilters';
import BookList from '@/components/BookList';
import EditBookModal from '@/components/EditBookModal';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Book, Filters } from '@/types/book';

export default function Home() {
  const [books, setBooks] = useLocalStorage<Book[]>('books-v2', []);

  const [filters, setFilters] = useState<Filters>({
    category: "",
    status: "",
    search: ""
  });

  const [sortBy, setSortBy] = useState("title");
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [editingBook, setEditingBook] = useState<{ book: Book; index: number } | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (books.length === 0) {
      setBooks([
        {
          title: "Dom Casmurro",
          author: "Machado de Assis",
          category: "Fiction",
          rating: 5,
          status: "Read",
          coverImage: "/book-cover/dom-casmurro.png",
          dateAdded: "2024-01-15",
          dateRead: "2024-01-20",
          pages: 256,
          notes: "A masterpiece of Brazilian literature exploring jealousy and obsession."
        },
        {
          title: "The Book Thief",
          author: "Markus Zusak",
          category: "Fiction",
          rating: 5,
          status: "Read",
          coverImage: "/book-cover/the-book-thief.png",
          dateAdded: "2024-02-01",
          dateRead: "2024-02-15",
          pages: 552,
          notes: "A beautiful and heartbreaking story narrated by Death during WWII."
        },
        {
          title: "Torto Arado",
          author: "Itamar Vieira Junior",
          category: "Fiction",
          rating: 4,
          status: "Reading",
          coverImage: "/book-cover/torto-arado.png",
          dateAdded: "2024-03-01",
          pages: 264,
          notes: "Powerful novel about rural Brazil and the lives of two sisters."
        }
      ]);
    }
  }, [books.length, setBooks]);

  const handleAddBook = (newBook: Book) => {
    setBooks([...books, newBook]);
  };

  const handleRemoveBook = (index: number) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  const handleEditBook = (index: number) => {
    setEditingBook({ book: books[index], index });
    setIsEditModalOpen(true);
  };

  const handleUpdateBook = (updatedBook: Book) => {
    if (editingBook) {
      const updatedBooks = [...books];
      updatedBooks[editingBook.index] = updatedBook;
      setBooks(updatedBooks);
    }
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingBook(null);
  };

  const handleToggleFavorite = (index: number) => {
    const updatedBooks = [...books];
    updatedBooks[index] = { ...updatedBooks[index], isFavorite: !updatedBooks[index].isFavorite };
    setBooks(updatedBooks);
  };

  const filteredBooks = useMemo(() => {
    let result = [...books];
    
    // Apply tab filter
    if (activeTab !== 'all') {
      result = result.filter(book => book.status === activeTab);
    }
    
    // Apply filters
    if (filters.category) {
      result = result.filter(book => book.category === filters.category);
    }
    
    if (filters.status) {
      result = result.filter(book => book.status === filters.status);
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
      );
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
  }, [books, filters, sortBy, activeTab]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-gray-900">BookTracker</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Search books..."
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                  className="w-64 px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Reading Challenge & Stats */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">2024 Reading Challenge</h2>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">Edit Goal</button>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex-1">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{books.filter(b => b.status === 'Read').length} of 12 books</span>
                  <span>{Math.round((books.filter(b => b.status === 'Read').length / 12) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                    style={{width: `${Math.min((books.filter(b => b.status === 'Read').length / 12) * 100, 100)}%`}}
                  ></div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{books.filter(b => b.status === 'Read').length}</div>
                <div className="text-sm text-gray-600">books read</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            <button 
              onClick={() => setActiveTab('all')}
              className={`border-b-2 pb-2 px-1 text-sm font-medium ${
                activeTab === 'all' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              All Books ({books.length})
            </button>
            <button 
              onClick={() => setActiveTab('Read')}
              className={`border-b-2 pb-2 px-1 text-sm font-medium ${
                activeTab === 'Read' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Read ({books.filter(b => b.status === 'Read').length})
            </button>
            <button 
              onClick={() => setActiveTab('Reading')}
              className={`border-b-2 pb-2 px-1 text-sm font-medium ${
                activeTab === 'Reading' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Currently Reading ({books.filter(b => b.status === 'Reading').length})
            </button>
            <button 
              onClick={() => setActiveTab('To Read')}
              className={`border-b-2 pb-2 px-1 text-sm font-medium ${
                activeTab === 'To Read' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Want to Read ({books.filter(b => b.status === 'To Read').length})
            </button>
          </nav>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <BookForm onAddBook={handleAddBook} />
            
            <BookFilters 
              filters={filters}
              sortBy={sortBy}
              onUpdateFilters={setFilters}
              onUpdateSortBy={setSortBy}
            />
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Collection</h2>
                  <div className="flex items-center space-x-4">
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button 
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">
                      {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
                    </span>
                  </div>
                </div>
              </div>
              
              {books.length > 0 && (
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {books.filter(b => b.status === 'Read').length}
                      </div>
                      <div className="text-sm text-gray-600">Read</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {books.filter(b => b.status === 'Reading').length}
                      </div>
                      <div className="text-sm text-gray-600">Reading</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-600">
                        {books.filter(b => b.status === 'To Read').length}
                      </div>
                      <div className="text-sm text-gray-600">To Read</div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <BookList books={filteredBooks} onRemoveBook={handleRemoveBook} onEditBook={handleEditBook} onToggleFavorite={handleToggleFavorite} viewMode={viewMode} />
              </div>
            </div>
          </div>
        </div>
        
        <footer className="mt-16 text-center">
          <p className="text-gray-400 text-sm">📚 Personal Book Library • Built by Cassia Melvin</p>
        </footer>
      </div>
      
      {editingBook && (
        <EditBookModal
          book={editingBook.book}
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          onSave={handleUpdateBook}
        />
      )}
    </div>
  );
}
