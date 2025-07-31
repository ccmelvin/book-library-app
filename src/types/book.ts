export interface Book {
  title: string;
  author: string;
  category: string;
  rating: number;
  status: string;
  coverImage?: string;
  dateAdded?: string;
  dateRead?: string;
  pages?: number;
  isbn?: string;
  notes?: string;
  isFavorite?: boolean;
}

export interface Filters {
  category: string;
  status: string;
  search: string;
}
