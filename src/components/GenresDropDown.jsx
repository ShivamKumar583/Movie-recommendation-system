import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import React from 'react'

const genres = [
  "Action",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Romance",
  "Thriller",
  "Sci-Fi",
];

export default function GenreDropdown({setSelected,selected}) {
  const [isOpen, setIsOpen] = useState(false);

  

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="text-lg font-semibold mb-2 text-center">
        Selected Genre: <span className="text-blue-600">{selected}</span>
      </div>

      {/* Toggle button only visible on small screens */}
      <div className="sm:hidden mb-2 flex justify-center">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {selected}
          <FaChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Genres */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } sm:flex sm:flex-wrap sm:gap-2 bg-white rounded-md shadow-md p-4`}
      >
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelected(genre)}
            className="px-3 py-2 bg-gray-100 text-sm text-gray-800 rounded-md hover:bg-blue-100 transition w-full sm:w-auto mb-2 sm:mb-0"
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
}
