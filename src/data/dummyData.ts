import { addDays, subDays } from 'date-fns';

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  available: boolean;
  coverUrl: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  borrowedBooks: BorrowedBook[];
  fines: number;
}

export interface BorrowedBook {
  bookId: string;
  borrowDate: Date;
  dueDate: Date;
  returnDate?: Date;
}

export const books: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Fiction',
    isbn: '978-0743273565',
    available: true,
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300&h=400',
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Fiction',
    isbn: '978-0446310789',
    available: false,
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300&h=400',
  },
  {
    id: '3',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Fantasy',
    isbn: '978-0547928227',
    available: true,
    coverUrl: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?auto=format&fit=crop&q=80&w=300&h=400',
  },
];

export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@library.com',
    role: 'admin',
    borrowedBooks: [],
    fines: 0,
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    borrowedBooks: [
      {
        bookId: '2',
        borrowDate: subDays(new Date(), 14),
        dueDate: addDays(new Date(), 1),
      },
    ],
    fines: 10,
  },
];