import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Update component name to follow React naming convention (PascalCase)
function HeaderComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/shop" className="text-sm text-gray-600 hover:text-gray-900 font-light tracking-wide">Shop</Link>
            <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900 font-light tracking-wide">About</Link>
            <Link to="/book" className="text-sm text-gray-600 hover:text-gray-900 font-light tracking-wide">Book your appointment</Link>
          </nav>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-roobert tracking-widest">Qiv</Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Country selector */}
            <div className="hidden md:flex items-center">
              <select className="text-sm bg-transparent border-none text-gray-600 hover:text-gray-900 cursor-pointer font-light">
                <option>India (GBP £)</option>
                {/* Add more options as needed */}
              </select>
            </div>

            {/* Search */}
            <button className="text-gray-600 hover:text-gray-900">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Account */}
            <Link to="/account" className="text-gray-600 hover:text-gray-900">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="text-gray-600 hover:text-gray-900">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/shop" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 font-light">Shop</Link>
              <Link to="/about" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 font-light">About</Link>
              <Link to="/book" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 font-light">Book your appointment</Link>
              <div className="px-3 py-2">
                <select className="text-sm bg-transparent border-none text-gray-600 hover:text-gray-900 cursor-pointer font-light">
                  <option>India (GBP £)</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default HeaderComponent;