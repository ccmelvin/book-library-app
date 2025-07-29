export interface Book {
  title: string;
  author: string;
  category: string;
  rating: number;
  status: string;
}

export interface Filters {
  category: string;
  status: string;
}
