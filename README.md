# 📚 Personal Book Library

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Jest](https://img.shields.io/badge/Jest-Testing-C21325?logo=jest)](https://jestjs.io/)

A modern, responsive book management application built with Next.js that allows you to track your personal book collection with full CRUD operations and local storage persistence.

## ✨ Features

- 📖 **Add Books**: Create new book entries with title, author, genre, and reading status
- 👀 **View Library**: Browse your complete book collection with a clean, responsive interface
- 🔍 **Filter & Search**: Find books by genre, reading status, or search terms
- ✏️ **Edit Books**: Update book information and reading progress
- 🗑️ **Delete Books**: Remove books from your collection
- 💾 **Local Storage**: Data persists in your browser's local storage
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- ⚡ **Fast Performance**: Optimized with Next.js 14 and modern React patterns

## 📸 Screenshots

![Book Library App Demo](./public/book-cover/demo.gif)

*Clean, modern interface for managing your personal book collection*

## 🚀 Demo

[Live Demo](https://your-demo-link.vercel.app) • [Repository](https://github.com/ccmelvin/personal-book-library-next)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ccmelvin/personal-book-library-next.git
   cd personal-book-library-next
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to start managing your book library.

## 📋 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
```

## 🧪 Testing

This project includes comprehensive test coverage using Jest and React Testing Library.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

**Test Coverage:**
- ✅ Component rendering and interactions
- ✅ Custom hooks functionality
- ✅ Utility functions
- ✅ Local storage operations

## 🔧 Tech Stack

| Technology | Purpose | Version |
|------------|---------|----------|
| [Next.js](https://nextjs.org/) | React framework with App Router | 14.x |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe development | 5.x |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling | 3.x |
| [Jest](https://jestjs.io/) | Testing framework | Latest |
| [React Testing Library](https://testing-library.com/) | Component testing utilities | Latest |
| Local Storage | Client-side data persistence | Native API |

## 📁 Project Structure

```
personal-book-library-next/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── __tests__/          # App tests
│   ├── components/             # React components
│   │   ├── BookList.tsx        # Display books grid/list
│   │   ├── BookForm.tsx        # Add/edit book form
│   │   ├── BookFilters.tsx     # Search and filter controls
│   │   └── __tests__/          # Component tests
│   ├── hooks/                  # Custom React hooks
│   │   ├── useLocalStorage.ts  # Local storage hook
│   │   └── __tests__/          # Hook tests
│   ├── types/                  # TypeScript definitions
│   │   └── book.ts             # Book interface
│   └── utils/                  # Utility functions
│       ├── bookUtils.ts        # Book-related utilities
│       └── __tests__/          # Utility tests
├── public/                     # Static assets
├── jest.config.js              # Jest configuration
├── tailwind.config.js          # Tailwind configuration
└── tsconfig.json               # TypeScript configuration
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Cassia Melvin**
- GitHub: [@ccmelvin](https://github.com/ccmelvin)

---

⭐ Star this repository if you found it helpful!