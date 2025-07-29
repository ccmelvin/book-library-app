import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookForm from '../BookForm';

describe('BookForm Component', () => {
  const mockOnAddBook = jest.fn();

  beforeEach(() => {
    // Clear mock calls between tests
    mockOnAddBook.mockClear();
  });

  test('renders form elements correctly', () => {
    render(<BookForm onAddBook={mockOnAddBook} />);
    
    // Check if form title is rendered
    expect(screen.getByText('Add New Book')).toBeInTheDocument();
    
    // Check if input fields are rendered
    expect(screen.getByPlaceholderText('Enter book title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter author name')).toBeInTheDocument();
    
    // Check if category dropdown is rendered
    expect(screen.getByText('Fiction')).toBeInTheDocument();
    
    // Check if rating stars are rendered
    expect(screen.getByText('3 of 5')).toBeInTheDocument();
    
    // Check if status options are rendered
    expect(screen.getByText('Read')).toBeInTheDocument();
    expect(screen.getByText('Currently Reading')).toBeInTheDocument();
    expect(screen.getByText('To Read')).toBeInTheDocument();
    
    // Check if submit button is rendered
    expect(screen.getByText('Add Book')).toBeInTheDocument();
  });

  test('updates form values when inputs change', () => {
    render(<BookForm onAddBook={mockOnAddBook} />);
    
    // Get form elements
    const titleInput = screen.getByPlaceholderText('Enter book title');
    const authorInput = screen.getByPlaceholderText('Enter author name');
    const categorySelect = screen.getByRole('combobox');
    
    // Change input values
    fireEvent.change(titleInput, { target: { value: 'Test Book Title' } });
    fireEvent.change(authorInput, { target: { value: 'Test Author' } });
    fireEvent.change(categorySelect, { target: { value: 'Fantasy' } });
    
    // Check if input values are updated
    expect(titleInput).toHaveValue('Test Book Title');
    expect(authorInput).toHaveValue('Test Author');
    expect(categorySelect).toHaveValue('Fantasy');
  });

  test('calls onAddBook with correct data when form is submitted', () => {
    render(<BookForm onAddBook={mockOnAddBook} />);
    
    // Get form elements
    const titleInput = screen.getByPlaceholderText('Enter book title');
    const authorInput = screen.getByPlaceholderText('Enter author name');
    const categorySelect = screen.getByRole('combobox');
    const addButton = screen.getByText('Add Book');
    
    // Fill the form
    fireEvent.change(titleInput, { target: { value: 'Test Book Title' } });
    fireEvent.change(authorInput, { target: { value: 'Test Author' } });
    fireEvent.change(categorySelect, { target: { value: 'Fantasy' } });
    
    // Submit the form
    fireEvent.click(addButton);
    
    // Check if onAddBook was called with the correct data
    expect(mockOnAddBook).toHaveBeenCalledWith({
      title: 'Test Book Title',
      author: 'Test Author',
      category: 'Fantasy',
      rating: 3,
      status: 'To Read'
    });
    
    // Check if form is reset after submission
    expect(titleInput).toHaveValue('');
    expect(authorInput).toHaveValue('');
  });

  test('does not submit form if title or author is empty', () => {
    render(<BookForm onAddBook={mockOnAddBook} />);
    
    // Get form elements
    const addButton = screen.getByText('Add Book');
    
    // Try to submit the form without filling required fields
    fireEvent.click(addButton);
    
    // Check if onAddBook was not called
    expect(mockOnAddBook).not.toHaveBeenCalled();
  });

  test('updates rating when stars are clicked', () => {
    render(<BookForm onAddBook={mockOnAddBook} />);
    
    // Get all rating stars (buttons with text content "★")
    const ratingStars = screen.getAllByText('★');
    expect(ratingStars.length).toBe(5);
    
    // Click on the 5th star
    fireEvent.click(ratingStars[4]);
    
    // Check if rating text is updated
    expect(screen.getByText('5 of 5')).toBeInTheDocument();
  });

  test('updates status when radio buttons are clicked', () => {
    render(<BookForm onAddBook={mockOnAddBook} />);
    
    // Get status radio buttons by their containing text
    const readingOption = screen.getByText('Currently Reading');
    
    // Click on the "Reading" status (click the parent label)
    fireEvent.click(readingOption);
    
    // Fill required fields
    const titleInput = screen.getByPlaceholderText('Enter book title');
    const authorInput = screen.getByPlaceholderText('Enter author name');
    fireEvent.change(titleInput, { target: { value: 'Test Book' } });
    fireEvent.change(authorInput, { target: { value: 'Test Author' } });
    
    // Submit the form
    const addButton = screen.getByText('Add Book');
    fireEvent.click(addButton);
    
    // Check if onAddBook was called with the correct status
    expect(mockOnAddBook).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'Reading'
      })
    );
  });
});
