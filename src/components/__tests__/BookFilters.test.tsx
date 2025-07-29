import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookFilters from '../BookFilters';

describe('BookFilters Component', () => {
  const mockFilters = {
    category: '',
    status: ''
  };
  
  const mockOnUpdateFilters = jest.fn();
  const mockOnUpdateSortBy = jest.fn();
  
  beforeEach(() => {
    // Clear mock calls between tests
    mockOnUpdateFilters.mockClear();
    mockOnUpdateSortBy.mockClear();
  });

  test('renders filter elements correctly', () => {
    render(
      <BookFilters 
        filters={mockFilters} 
        sortBy="title" 
        onUpdateFilters={mockOnUpdateFilters} 
        onUpdateSortBy={mockOnUpdateSortBy} 
      />
    );
    
    // Check if component title is rendered
    expect(screen.getByText('Filter & Sort')).toBeInTheDocument();
    
    // Check if filter dropdowns are rendered
    expect(screen.getByText('All Categories')).toBeInTheDocument();
    expect(screen.getByText('All Statuses')).toBeInTheDocument();
    
    // Check if sort buttons are rendered
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Author')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
    
    // Check if active filters section is rendered
    expect(screen.getByText('Active filters:')).toBeInTheDocument();
    expect(screen.getByText('No active filters')).toBeInTheDocument();
  });

  test('calls onUpdateFilters when category filter changes', () => {
    render(
      <BookFilters 
        filters={mockFilters} 
        sortBy="title" 
        onUpdateFilters={mockOnUpdateFilters} 
        onUpdateSortBy={mockOnUpdateSortBy} 
      />
    );
    
    // Get category dropdown
    const categoryDropdowns = screen.getAllByRole('combobox');
    const categoryDropdown = categoryDropdowns[0]; // First dropdown is category
    
    // Change category filter
    fireEvent.change(categoryDropdown, { target: { value: 'Fiction' } });
    
    // Check if onUpdateFilters was called with the correct data
    expect(mockOnUpdateFilters).toHaveBeenCalledWith({
      category: 'Fiction',
      status: ''
    });
  });

  test('calls onUpdateFilters when status filter changes', () => {
    render(
      <BookFilters 
        filters={mockFilters} 
        sortBy="title" 
        onUpdateFilters={mockOnUpdateFilters} 
        onUpdateSortBy={mockOnUpdateSortBy} 
      />
    );
    
    // Get status dropdown
    const statusDropdowns = screen.getAllByRole('combobox');
    const statusDropdown = statusDropdowns[1]; // Second dropdown is status
    
    // Change status filter
    fireEvent.change(statusDropdown, { target: { value: 'Reading' } });
    
    // Check if onUpdateFilters was called with the correct data
    expect(mockOnUpdateFilters).toHaveBeenCalledWith({
      category: '',
      status: 'Reading'
    });
  });

  test('calls onUpdateSortBy when sort buttons are clicked', () => {
    render(
      <BookFilters 
        filters={mockFilters} 
        sortBy="title" 
        onUpdateFilters={mockOnUpdateFilters} 
        onUpdateSortBy={mockOnUpdateSortBy} 
      />
    );
    
    // Get sort buttons
    const authorSortButton = screen.getByText('Author');
    const ratingSortButton = screen.getByText('Rating');
    
    // Click on author sort button
    fireEvent.click(authorSortButton);
    
    // Check if onUpdateSortBy was called with the correct value
    expect(mockOnUpdateSortBy).toHaveBeenCalledWith('author');
    
    // Click on rating sort button
    fireEvent.click(ratingSortButton);
    
    // Check if onUpdateSortBy was called with the correct value
    expect(mockOnUpdateSortBy).toHaveBeenCalledWith('rating');
  });

  test('displays active filters correctly', () => {
    const activeFilters = {
      category: 'Fiction',
      status: 'Reading'
    };
    
    render(
      <BookFilters 
        filters={activeFilters} 
        sortBy="title" 
        onUpdateFilters={mockOnUpdateFilters} 
        onUpdateSortBy={mockOnUpdateSortBy} 
      />
    );
    
    // Check if active filters are displayed
    expect(screen.getByText('Category: Fiction')).toBeInTheDocument();
    expect(screen.getByText('Status: Reading')).toBeInTheDocument();
    
    // "No active filters" should not be displayed
    expect(screen.queryByText('No active filters')).not.toBeInTheDocument();
  });

  test('clears filters when filter remove buttons are clicked', () => {
    const activeFilters = {
      category: 'Fiction',
      status: 'Reading'
    };
    
    render(
      <BookFilters 
        filters={activeFilters} 
        sortBy="title" 
        onUpdateFilters={mockOnUpdateFilters} 
        onUpdateSortBy={mockOnUpdateSortBy} 
      />
    );
    
    // Get filter remove buttons (the × buttons)
    const removeButtons = screen.getAllByText('×');
    expect(removeButtons.length).toBe(2);
    
    // Click on first remove button (category)
    fireEvent.click(removeButtons[0]);
    
    // Check if onUpdateFilters was called with the correct data
    expect(mockOnUpdateFilters).toHaveBeenCalledWith({
      category: '',
      status: 'Reading'
    });
    
    // Click on second remove button (status)
    fireEvent.click(removeButtons[1]);
    
    // Check if onUpdateFilters was called with the correct data
    expect(mockOnUpdateFilters).toHaveBeenCalledWith({
      category: 'Fiction',
      status: ''
    });
  });
});
