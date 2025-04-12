import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { books, users } from '../data/dummyData';
import { LogOut, BookOpen, History, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const currentUser = users.find(u => u.email === user?.email);
  const borrowedBooks = currentUser?.borrowedBooks || [];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-xl font-semibold text-gray-900">Library System</h1>
            </div>
            <div className="flex items-center">
              <span className="mr-4 text-gray-700">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {currentUser?.fines > 0 && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <p className="ml-3 text-red-700">
                You have outstanding fines: ${currentUser.fines}
              </p>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.filter(book => book.available).map(book => (
              <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={book.coverUrl} alt={book.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
                  <p className="text-gray-600">{book.author}</p>
                  <p className="text-sm text-gray-500 mb-4">{book.category}</p>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
                    Borrow Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center mb-4">
            <History className="h-6 w-6 text-gray-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Borrowing History</h2>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Book
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Borrow Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {borrowedBooks.map(borrowed => {
                  const book = books.find(b => b.id === borrowed.bookId);
                  return (
                    <tr key={borrowed.bookId}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{book?.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {borrowed.borrowDate.toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {borrowed.dueDate.toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Borrowed
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}