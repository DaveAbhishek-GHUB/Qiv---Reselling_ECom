import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMenu } from 'react-icons/hi';
import { FiSearch, FiUser, FiShoppingBag } from 'react-icons/fi';

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
              <HiOutlineMenu className="h-6 w-6" />
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
              <FiSearch className="h-5 w-5" />
            </button>

            {/* Account */}
            <Link to="/account" className="text-gray-600 hover:text-gray-900">
              <FiUser className="h-5 w-5" />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="text-gray-600 hover:text-gray-900">
              <FiShoppingBag className="h-5 w-5" />
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