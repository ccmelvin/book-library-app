import React, { useState, useEffect } from 'react';
import { Book } from '@/types/book';

interface BookFormProps {
  onAddBook: (book: Book) => void;
  editingBook?: { book: Book; index: number } | null;
  onUpdateBook?: (book: Book, index: number) => void;
  onCancelEdit?: () => void;
}

export default function BookForm({ onAddBook, editingBook, onUpdateBook, onCancelEdit }: BookFormProps) {
  const [newBook, setNewBook] = useState<Book>({
    title: "",
    author: "",
    category: "Fiction",
    rating: 3,
    status: "To Read",
    coverImage: "",
    pages: undefined,
    notes: ""
  });

  useEffect(() => {
    if (editingBook) {
      setNewBook(editingBook.book);
    }
  }, [editingBook]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: name === 'pages' ? (value ? parseInt(value) : undefined) : value
    });
  };

  const handleSubmit = () => {
    if (newBook.title && newBook.author) {
      if (editingBook && onUpdateBook) {
        onUpdateBook(newBook, editingBook.index);
      } else {
        const bookToAdd = {
          ...newBook,
          dateAdded: new Date().toISOString().split('T')[0],
          ...(newBook.status === 'Read' && { dateRead: new Date().toISOString().split('T')[0] })
        };
        onAddBook(bookToAdd);
      }
      
      // Reset form
      setNewBook({
        title: "",
        author: "",
        category: "Fiction",
        rating: 3,
        status: "To Read",
        coverImage: "",
        pages: undefined,
        notes: ""
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={editingBook ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M12 6v6m0 0v6m0-6h6m-6 0H6"} />
          </svg>
          {editingBook ? 'Edit Book' : 'Add a Book'}
        </h2>
      </div>
      
      <div className="p-4">
        <div className="space-y-3">
          <div>
            <input 
              name="title"
              value={newBook.title}
              onChange={handleChange}
              type="text" 
              placeholder="Book title"
              className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <div>
            <input 
              name="author"
              value={newBook.author}
              onChange={handleChange}
              type="text" 
              placeholder="Author name"
              className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <div>
            <select 
              name="coverImage"
              value={newBook.coverImage || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select cover image (optional)</option>
              <option value="/book-cover/dom-casmurro.png">Dom Casmurro - Machado de Assis</option>
              <option value="/book-cover/the-book-thief.png">The Book Thief - Markus Zusak</option>
              <option value="/book-cover/torto-arado.png">Torto Arado - Itamar Vieira Junior</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <select 
              name="category"
              value={newBook.category}
              onChange={handleChange}
              className="px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science Fiction">Sci-Fi</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Biography">Biography</option>
              <option value="Other">Other</option>
            </select>
            
            <select 
              name="status"
              value={newBook.status}
              onChange={handleChange}
              className="px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="To Read">Want to Read</option>
              <option value="Reading">Currently Reading</option>
              <option value="Read">Read</option>
            </select>
          </div>
          
          <div>
            <input 
              name="pages"
              value={newBook.pages || ''}
              onChange={handleChange}
              type="number" 
              placeholder="Number of pages (optional)"
              className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <div>
            <textarea 
              name="notes"
              value={newBook.notes || ''}
              onChange={(e) => setNewBook({...newBook, notes: e.target.value})}
              placeholder="Notes or review (optional)"
              rows={2}
              className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Rating:</span>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button 
                    key={n}
                    type="button"
                    onClick={() => setNewBook({...newBook, rating: n})}
                    className={`text-lg focus:outline-none hover:scale-110 transition-transform ${
                      n <= newBook.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <button 
            onClick={handleSubmit}
            disabled={!newBook.title || !newBook.author}
            className="w-full px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {editingBook ? 'Update Book' : 'Add to My Books'}
          </button>
          {editingBook && onCancelEdit && (
            <button 
              onClick={onCancelEdit}
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}