import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isDescribed, setIsDescribed] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  // Simulated suggestion API function
  const fetchSuggestions = async (searchTerm) => {
    // Replace this with your actual API
    
    const response = await fetch(`https://satenders-mac-mini.tail443769.ts.net/api/suggestions?query=${encodeURIComponent(searchTerm)}&type=movie`);

    if (!response.ok) return [];
    const data = await response.json();

    return data || [];
  };

  // Debounced input handling
  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      const results = await fetchSuggestions(query);
      setSuggestions(results);
      setShowSuggestions(true);
    }, 300);

    return () => clearTimeout(timeoutRef.current);
  }, [query]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!query.trim()) return;
      navigateToResults(query);
    }
  };

  const navigateToResults = (searchText) => {
    let url = `/results?q=${encodeURIComponent(searchText)}`;
    if (isDescribed) {
      url += `&word=described`;
    }
    navigate(url);
    setShowSuggestions(false);
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

          <div className="flex md:order-2 items-center gap-4 relative">
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
              <input
                value={query}
                onKeyDown={handleSearch}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              />

              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                  {suggestions.map((item, index) => (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-800 dark:text-gray-200"
                      onMouseDown={() => navigateToResults(item.title)}
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
