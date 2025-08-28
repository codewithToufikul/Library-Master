import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Book } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand Name */}
          <div className="flex items-center space-x-2">
            <div className="flex-shrink-0 flex items-center">
              <div className="bg-white rounded-lg p-2 shadow-md">
                <Book className="h-6 w-6 text-indigo-600" />
              </div>
              <span className="ml-3 text-xl font-bold text-white tracking-wide">
                Library Master
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              <NavLink
                to="/all-books"
                className={({ isActive }) =>
                  isActive
                    ? "bg-white bg-opacity-25  px-4 py-2 rounded-lg text-sm font-medium shadow-lg transform scale-105 transition-all duration-300"
                    : "text-white hover:bg-white hover:bg-opacity-20 hover:text-black px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
                }
              >
                All Books
              </NavLink>
              <NavLink
                to="/add-book"
                className={({ isActive }) =>
                  isActive
                    ? "bg-white bg-opacity-25 px-4 py-2 rounded-lg text-sm font-medium shadow-lg transform scale-105 transition-all duration-300"
                    : "text-white hover:bg-white hover:bg-opacity-20 hover:text-black px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
                }
              >
                Add Book
              </NavLink>
              <NavLink
                to="/borrow-summary"
                className={({ isActive }) =>
                  isActive
                    ? "bg-white bg-opacity-25  px-4 py-2 rounded-lg text-sm font-medium shadow-lg transform scale-105 transition-all duration-300"
                    : "text-white hover:bg-white hover:bg-opacity-20 hover:text-black px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
                }
              >
                Borrow Summary
              </NavLink>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? 'max-h-64 opacity-100 visible'
            : 'max-h-0 opacity-0 invisible overflow-hidden'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-900 border-t border-white border-opacity-20">
          <NavLink
            to="/all-books"
            className={({ isActive }) =>
              isActive
                ? "bg-white bg-opacity-25  block px-4 py-3 rounded-lg text-base font-medium shadow-lg transform translate-x-2 transition-all duration-200"
                : "text-white hover:bg-white hover:bg-opacity-20 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 transform hover:translate-x-2"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            📚 All Books
          </NavLink>
          <NavLink
            to="/add-book"
            className={({ isActive }) =>
              isActive
                ? "bg-white bg-opacity-25  block px-4 py-3 rounded-lg text-base font-medium shadow-lg transform translate-x-2 transition-all duration-200"
                : "text-white hover:bg-white hover:bg-opacity-20 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 transform hover:translate-x-2"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            ➕ Add Book
          </NavLink>
          <NavLink
            to="/borrow-summary"
            className={({ isActive }) =>
              isActive
                ? "bg-white bg-opacity-25 text-white block px-4 py-3 rounded-lg text-base font-medium shadow-lg transform translate-x-2 transition-all duration-200"
                : "text-white hover:bg-white hover:bg-opacity-20 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 transform hover:translate-x-2"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            📋 Borrow Summary
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;