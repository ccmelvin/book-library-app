import { filterBooks, sortBooks } from '../bookUtils';
import { Book, Filters } from '../../types/book';

describe('Book Utility Functions', () => {
  const testBooks: Book[] = [
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
  ];

  describe('filterBooks', () => {
    test('returns all books when no filters are applied', () => {
      const filters: Filters = { category: '', status: '' };
      const result = filterBooks(testBooks, filters);
      expect(result).toHaveLength(3);
      expect(result).toEqual(testBooks);
    });

    test('filters books by category', () => {
      const filters: Filters = { category: 'Fiction', status: '' };
      const result = filterBooks(testBooks, filters);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('The Great Gatsby');
    });

    test('filters books by status', () => {
      const filters: Filters = { category: '', status: 'Reading' };
      const result = filterBooks(testBooks, filters);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Dune');
    });

    test('filters books by both category and status', () => {
      const filters: Filters = { category: 'Fiction', status: 'Read' };
      const result = filterBooks(testBooks, filters);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('The Great Gatsby');
    });

    test('returns empty array when no books match filters', () => {
      const filters: Filters = { category: 'Mystery', status: '' };
      const result = filterBooks(testBooks, filters);
      expect(result).toHaveLength(0);
    });
  });

  describe('sortBooks', () => {
    test('sorts books by title', () => {
      const result = sortBooks(testBooks, 'title');
      expect(result[0].title).toBe('Dune');
      expect(result[1].title).toBe('Sapiens');
      expect(result[2].title).toBe('The Great Gatsby');
    });

    test('sorts books by author', () => {
      const result = sortBooks(testBooks, 'author');
      expect(result[0].author).toBe('F. Scott Fitzgerald');
      expect(result[1].author).toBe('Frank Herbert');
      expect(result[2].author).toBe('Yuval Noah Harari');
    });

    test('sorts books by rating (descending)', () => {
      const result = sortBooks(testBooks, 'rating');
      expect(result[0].rating).toBe(5);
      expect(result[1].rating).toBe(5);
      expect(result[2].rating).toBe(4);
    });

    test('handles invalid sort key by defaulting to title', () => {
      const result = sortBooks(testBooks, 'invalidKey' as any);
      expect(result[0].title).toBe('Dune');
      expect(result[1].title).toBe('Sapiens');
      expect(result[2].title).toBe('The Great Gatsby');
    });
  });
});
