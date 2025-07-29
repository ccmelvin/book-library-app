# Personal Book Library

A modern book management application built with Next.js that allows you to track your personal book collection with full CRUD operations.

## Features

- **Add Books**: Create new book entries with title, author, genre, and reading status
- **View Library**: Browse your complete book collection with a clean interface
- **Filter & Search**: Find books by genre, reading status, or search terms
- **Edit Books**: Update book information and reading progress
- **Delete Books**: Remove books from your collection
- **Local Storage**: Data persists in your browser's local storage

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to start managing your book library.

## Testing

To run tests:

```bash
npm test
# or
npm run test:watch
```

The project uses Jest and React Testing Library for testing components and utilities.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Jest & React Testing Library** - Comprehensive testing suite
- **Local Storage** - Client-side data persistence

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── BookList.tsx     # Display books
│   ├── BookForm.tsx     # Add/edit books
│   └── BookFilters.tsx  # Filter controls
├── hooks/               # Custom React hooks
│   └── useLocalStorage.ts
├── types/               # TypeScript definitions
├── utils/               # Utility functions
└── __tests__/           # Test files
```

