import React, { useEffect, useState } from 'react'
import GenreDropdown from '../components/GenresDropDown'
import MovieCarousel from '../components/MovieCarousel';

const HomePage = () => {
    const [selected, setSelected] = useState("Action");
    const [booksDesc, setBooksDesc] = useState([]);
    const [movieDesc, setMovieDesc] = useState([]);
    
    const movieList = [
  { title: "Inception", image: "https://source.unsplash.com/300x200/?movie" },
  { title: "Avatar", image: "https://source.unsplash.com/300x200/?avatar" },
  { title: "Titanic", image: "https://source.unsplash.com/300x200/?titanic" },
  { title: "Interstellar", image: "https://source.unsplash.com/300x200/?space" },
  { title: "Joker", image: "https://source.unsplash.com/300x200/?joker" },
  { title: "Batman", image: "https://source.unsplash.com/300x200/?batman" },
  { title: "Avengers", image: "https://source.unsplash.com/300x200/?avengers" },
  { title: "Frozen", image: "https://source.unsplash.com/300x200/?frozen" },
  { title: "Cars", image: "https://source.unsplash.com/300x200/?cars" },
  { title: "Wall-E", image: "https://source.unsplash.com/300x200/?robot" },
];

    useEffect(() => {
      const fetchData = async () => {
        try {
  
          if (selected) {
            const res = await fetch(
              `https://satenders-mac-mini.tail443769.ts.net/api/searchD?query=${selected}&type=movie`
            );
  
            const data = await res.json();
  
            setBooksDesc(data.recommended_books || []);
            setMovieDesc(data.recommended_movies || []);
  
            console.log(data);
            console.log(movieDesc);
            return;
          }
  
          
        } catch (err) {
          console.error("Error fetching:", err);
        } 
      };
  
      if (selected) fetchData();
    }, [selected]);

  
  return (
    <div className=' text-2xl text-black bg-white w-full'>
      <GenreDropdown setSelected={setSelected} selected={selected} />

      <div className=' shadow-lg shadow-blue-400'>
      <h3 className=' pl-2 mt-8 pt-6 font-bold'> Recommended movies for you </h3>
      <MovieCarousel movies={movieDesc}/>
            </div>

      
            <div className=' shadow-lg shadow-blue-400'>
      <h3 className=' pl-2 mt-8 pt-6 font-bold'> Recommended books for you </h3>
      <MovieCarousel movies={booksDesc}/>
            </div>

    </div>
  )
}

export default HomePage