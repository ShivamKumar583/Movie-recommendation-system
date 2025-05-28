import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const describedBtn = searchParams.get("word");
  const [results, setResults] = useState([]);
  const [books, setBooks] = useState([]);
  const [resultsSem, setResultsSem] = useState([]);
  const [booksSem, setBooksSem] = useState([]);
  const [booksDesc, setBooksDesc] = useState([]);
  const [movieDesc, setMovieDesc] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (describedBtn) {
          const res = await fetch(
            `https://satenders-mac-mini.tail443769.ts.net/api/searchD?query=${query}&type=movie`
          );

          const data = await res.json();

          setBooksDesc(data.recommended_books || []);
          setMovieDesc(data.recommended_movies || []);

          console.log(data);
          console.log(movieDesc);
          return;
        }

        const res = await fetch(
          `https://satenders-mac-mini.tail443769.ts.net/api/search?query=${query}&type=movie`
        );

        const resSem = await fetch(
          `https://satenders-mac-mini.tail443769.ts.net/api/searchBert?query=${query}&type=movie`
        );

        const data = await res.json();
        const dataSem = await resSem.json();

        setResults(data.recommended_movies || []);
        setBooks(data.recommended_books || []);

        setResultsSem(dataSem.recommended_movies || []);
        setBooksSem(dataSem.recommended_books || []);
      } catch (err) {
        console.error("Error fetching:", err);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchData();
  }, [query]);

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Search Results for: "{query}"</h2>

      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 && movieDesc.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <>
          {describedBtn && (
            <>
              <h2 className=" text-2xl mt-8 font-bold mb-4">
                Movies(Described)
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {movieDesc.map((item) => (
                  <div
                    key={item?.id}
                    className="border rounded shadow bg-white p-4 flex flex-col"
                  >
                    <img
                      src={item?.poster}
                      alt={item?.title}
                      className="w-full h-40 object-cover rounded mb-2"
                    />
                    <h3 className="font-semibold text-lg">{item?.title}</h3>
                  </div>
                ))}
              </div>

              {/* books Semantic  */}
              <h2 className="text-2xl font-bold mb-4 mt-6">
                {" "}
                Books (Described){" "}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {booksDesc.map((item) => (
                  <div
                    key={item?.id}
                    className="border rounded shadow bg-white p-4 flex flex-col"
                  >
                    <img
                      src={item?.poster}
                      alt={item?.title}
                      className="w-full h-40 object-cover rounded mb-2"
                    />
                    <h3 className="font-semibold text-lg">{item?.title}</h3>
                  </div>
                ))}
              </div>
            </>
          )}

          {
            results.length > 0 && (
              <>
              {/* movies */}
          <h2 className=" text-2xl font-bold mb-4">Movies (Non-Semantic)</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {results.map((item) => (
              <div
                key={item?.id}
                className="border rounded shadow bg-white p-4 flex flex-col"
              >
                <img
                  src={item?.poster}
                  alt={item?.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="font-semibold text-lg">{item?.title}</h3>
              </div>
            ))}
          </div>

          {/* books  */}
          <h2 className="text-2xl font-bold mb-4 mt-6">
            {" "}
            Books (Non-Semantic){" "}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {books.map((item) => (
              <div
                key={item?.id}
                className="border rounded shadow bg-white p-4 flex flex-col"
              >
                <img
                  src={item?.poster}
                  alt={item?.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="font-semibold text-lg">{item?.title}</h3>
              </div>
            ))}
          </div>
              </>
            )
          }

          {
            resultsSem.length > 0 && (
              <>
              {/* movies Semantic */}
          <h2 className=" text-2xl mt-8 font-bold mb-4">Movies(Semantic)</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {resultsSem.map((item) => (
              <div
                key={item?.id}
                className="border rounded shadow bg-white p-4 flex flex-col"
              >
                <img
                  src={item?.poster}
                  alt={item?.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="font-semibold text-lg">{item?.title}</h3>
              </div>
            ))}
          </div>

          {/* books Semantic  */}
          <h2 className="text-2xl font-bold mb-4 mt-6"> Books (Semantic) </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {booksSem.map((item) => (
              <div
                key={item?.id}
                className="border rounded shadow bg-white p-4 flex flex-col"
              >
                <img
                  src={item?.poster}
                  alt={item?.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="font-semibold text-lg">{item?.title}</h3>
              </div>
            ))}
          </div>
              </>
            )
          }
        </>
      )}
    </div>
  );
}
