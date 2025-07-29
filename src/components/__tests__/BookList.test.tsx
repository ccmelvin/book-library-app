import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookList from '../BookList';

describe('BookList Component', () => {
  const mockBooks = [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      category: "Fiction",
      rating: 4,
      status: "Read"
    },
    {
      title: "Dune",
      author: "Frank Herbert",
      category: "Science Fiction",
      rating: 5,
      status: "Reading"
    }
  ];

  const mockOnRemoveBook = jest.fn();

  test('renders empty state when no books are provided', () => {
    render(<BookList books={[]} onRemoveBook={mockOnRemoveBook} />);
    
    expect(screen.getByText('Your library is empty')).toBeInTheDocument();
    expect(screen.getByText('Add some books to start building your collection')).toBeInTheDocument();
    expect(screen.getByText('Add your first book')).toBeInTheDocument();
  });

  test('renders books correctly', () => {
    render(<BookList books={mockBooks} onRemoveBook={mockOnRemoveBook} />);
    
    // Check if book titles are rendered
    expect(screen.getByText('The Great Gatsby')).toBeInTheDocument();
    expect(screen.getByText('Dune')).toBeInTheDocument();
    
    // Check if authors are rendered
    expect(screen.getByText('by F. Scott Fitzgerald')).toBeInTheDocument();
    expect(screen.getByText('by Frank Herbert')).toBeInTheDocument();
    
    // Check if categories are rendered
    expect(screen.getByText('Fiction')).toBeInTheDocument();
    expect(screen.getByText('Science Fiction')).toBeInTheDocument();
    
    // Check if statuses are rendered
    expect(screen.getByText('Read')).toBeInTheDocument();
    expect(screen.getByText('Reading')).toBeInTheDocument();
  });

  test('calls onRemoveBook when delete button is clicked', () => {
    render(<BookList books={mockBooks} onRemoveBook={mockOnRemoveBook} />);
    
    // Get all delete buttons (there should be two, one for each book)
    const deleteButtons = screen.getAllByRole('button', { name: '' });
    
    // Click the first delete button (for "The Great Gatsby")
    fireEvent.click(deleteButtons[0]);
    
    // Check if onRemoveBook was called with the correct index
    expect(mockOnRemoveBook).toHaveBeenCalledWith(0);
  });

  test('displays reading ribbon for books with "Reading" status', () => {
    render(<BookList books={mockBooks} onRemoveBook={mockOnRemoveBook} />);
    
    // Check if the "READING" ribbon is displayed
    expect(screen.getByText('READING')).toBeInTheDocument();
  });
});
