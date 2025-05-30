import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function MovieCarousel({ movies }) {
  const containerRef = useRef(null);

  const scroll = (direction) => {
    const container = containerRef.current;
    const scrollAmount = container.offsetWidth; // Scroll by one full view
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full px-4 my-6">
      <div className="relative">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white rounded-full p-1 shadow hidden sm:block"
        >
          <FaChevronLeft className="w-6 h-6" />
        </button>

        {/* Movie Row */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto scroll-smooth no-scrollbar space-x-4 py-4"
        >
          {movies.map((movie, index) => (
            <div
              key={index}
              className="min-w-[60%] sm:min-w-[20%] md:min-w-[20%] lg:min-w-[20%] xl:min-w-[20%] rounded-md overflow-hidden bg-gray-200 shadow"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-2 text-sm font-medium text-center">
                {movie.title}
              </div>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white rounded-full p-1 shadow hidden sm:block"
        >
          <FaChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
