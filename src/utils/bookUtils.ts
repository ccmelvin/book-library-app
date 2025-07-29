import { Book, Filters } from '../types/book';

/**
 * Filter books based on category and status filters
 */
export function filterBooks(books: Book[], filters: Filters): Book[] {
  let result = [...books];
  
  // Apply category filter
  if (filters.category) {
    result = result.filter(book => book.category === filters.category);
  }
  
  // Apply status filter
  if (filters.status) {
    result = result.filter(book => book.status === filters.status);
  }
  
  return result;
}

/**
 * Sort books by the specified key
 */
export function sortBooks(books: Book[], sortBy: keyof Book): Book[] {
  const result = [...books];
  
  if (sortBy === 'rating') {
    // Sort by rating in descending order
    return result.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'title' || sortBy === 'author' || sortBy === 'category' || sortBy === 'status') {
    // Sort alphabetically
    return result.sort((a, b) => {
      const valA = a[sortBy].toString().toLowerCase();
      const valB = b[sortBy].toString().toLowerCase();
      return valA < valB ? -1 : valA > valB ? 1 : 0;
    });
  }
  
  // Default to sorting by title
  return sortBooks(books, 'title');
}
