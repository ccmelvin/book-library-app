import React, { useState } from 'react';

interface Book {
  title: string;
  author: string;
  category: string;
  rating: number;
  status: string;
}

interface BookFormProps {
  onAddBook: (book: Book) => void;
}

export default function BookForm({ onAddBook }: BookFormProps) {
  const [newBook, setNewBook] = useState<Book>({
    title: "",
    author: "",
    category: "Fiction",
    rating: 3,
    status: "To Read"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: value
    });
  };

  const handleSubmit = () => {
    if (newBook.title && newBook.author) {
      onAddBook({ ...newBook });
      
      // Reset form
      setNewBook({
        title: "",
        author: "",
        category: "Fiction",
        rating: 3,
        status: "To Read"
      });
    }
  };

  return (
    <div className="bg-white p-7 rounded-2xl shadow-xl border border-stone-100 backdrop-blur-sm bg-white/80 relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-stone-100 rounded-full opacity-50"></div>
      
      <h2 className="text-xl font-bold text-stone-800 mb-5 flex items-center relative z-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-stone-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Add New Book
      </h2>
      
      <div className="grid grid-cols-1 gap-5 relative z-10">
        <div className="group">
          <label className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-stone-700 transition-colors">Title</label>
          <div className="relative">
            <input 
              name="title"
              value={newBook.title}
              onChange={handleChange}
              type="text" 
              placeholder="Enter book title"
              className="w-full px-4 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-all pl-10"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-focus-within:text-stone-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>
        
        <div className="group">
          <label className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-stone-700 transition-colors">Author</label>
          <div className="relative">
            <input 
              name="author"
              value={newBook.author}
              onChange={handleChange}
              type="text" 
              placeholder="Enter author name"
              className="w-full px-4 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-all pl-10"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-focus-within:text-stone-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <div className="relative">
            <select 
              name="category"
              value={newBook.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500 appearance-none pl-10"
            >
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
          <div className="flex items-center space-x-1 bg-stone-50 p-3 rounded-lg">
            {[1, 2, 3, 4, 5].map((n) => (
              <button 
                key={n}
                type="button"
                onClick={() => setNewBook({...newBook, rating: n})}
                className={`text-2xl focus:outline-none transition-transform hover:scale-110 ${
                  n <= newBook.rating ? 'text-amber-400' : 'text-gray-300'
                }`}
              >
                ★
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {newBook.rating} of 5
            </span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <div className="flex flex-wrap gap-3">
            {['Read', 'Reading', 'To Read'].map((status) => (
              <label 
                key={status}
                className={`inline-flex items-center px-4 py-2.5 border rounded-lg cursor-pointer transition-all duration-200 ${
                  newBook.status === status ? 
                    'bg-stone-100 border-stone-300 shadow-sm' : 
                    'border-gray-300 hover:border-stone-200 hover:bg-stone-50'
                }`}
              >
                <input 
                  type="radio" 
                  name="status" 
                  value={status} 
                  checked={newBook.status === status}
                  onChange={handleChange}
                  className="hidden" 
                />
                <span className="flex items-center">
                  {status === 'Read' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-stone-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                  {status === 'Reading' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  )}
                  {status === 'To Read' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  )}
                  {status === 'Reading' ? 'Currently Reading' : status}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
      
      <button 
        onClick={handleSubmit}
        className="mt-6 w-full px-4 py-3 bg-gradient-to-r from-stone-600 to-neutral-600 text-white rounded-lg hover:from-stone-700 hover:to-neutral-700 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 transition-all duration-200 font-medium flex items-center justify-center relative z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Add Book
      </button>
    </div>
  );
}
