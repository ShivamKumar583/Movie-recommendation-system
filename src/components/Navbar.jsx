import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const [isDescribed, setIsDescribed] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!query.trim()) return;

      // Create the query string
      let url = `/results?q=${encodeURIComponent(query)}`;
      if (isDescribed) {
        url += `&word=described`;
      }

      navigate(url);
    }
  };

  return (
    <div className="w-full">
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap gap-3 justify-center items-center md:justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Movie Recommendation System
            </span>
          </a>

          <div className="flex md:order-2 items-center gap-4">
            {/* Checkbox for 'word=described' */}
            <label className="flex items-center text-sm text-gray-900 dark:text-white">
              <input
                type="checkbox"
                checked={isDescribed}
                onChange={(e) => setIsDescribed(e.target.checked)}
                className="mr-2"
              />
              Enable Described
            </label>

            {/* Search Input */}
            <div className="relative block">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <span className="sr-only">Search icon</span>
              </div>
              <input
                value={query}
                onKeyDown={handleSearch}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
