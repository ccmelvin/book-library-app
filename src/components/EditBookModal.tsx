import React, { useState, useEffect } from 'react';
import { Book } from '@/types/book';

interface EditBookModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
  onSave: (book: Book) => void;
}

export default function EditBookModal({ book, isOpen, onClose, onSave }: EditBookModalProps) {
  const [editedBook, setEditedBook] = useState<Book>(book);

  useEffect(() => {
    setEditedBook(book);
  }, [book]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedBook({
      ...editedBook,
      [name]: name === 'pages' ? (value ? parseInt(value) : undefined) : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedBook);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Edit Book</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <input
            name="title"
            value={editedBook.title}
            onChange={handleChange}
            placeholder="Book title"
            className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          
          <input
            name="author"
            value={editedBook.author}
            onChange={handleChange}
            placeholder="Author name"
            className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          
          <select
            name="coverImage"
            value={editedBook.coverImage || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select cover image (optional)</option>
            <option value="/book-cover/dom-casmurro.png">Dom Casmurro - Machado de Assis</option>
            <option value="/book-cover/the-book-thief.png">The Book Thief - Markus Zusak</option>
            <option value="/book-cover/torto-arado.png">Torto Arado - Itamar Vieira Junior</option>
          </select>
          
          <div className="grid grid-cols-2 gap-2">
            <select
              name="category"
              value={editedBook.category}
              onChange={handleChange}
              className="px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
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
              value={editedBook.status}
              onChange={handleChange}
              className="px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="To Read">Want to Read</option>
              <option value="Reading">Currently Reading</option>
              <option value="Read">Read</option>
            </select>
          </div>
          
          <input
            name="pages"
            value={editedBook.pages || ''}
            onChange={handleChange}
            type="number"
            placeholder="Number of pages"
            className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          
          <textarea
            name="notes"
            value={editedBook.notes || ''}
            onChange={handleChange}
            placeholder="Notes or review"
            rows={3}
            className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          />
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Rating:</span>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setEditedBook({...editedBook, rating: n})}
                  className={`text-lg focus:outline-none hover:scale-110 transition-transform ${
                    n <= editedBook.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}