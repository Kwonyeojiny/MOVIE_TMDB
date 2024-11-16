import { useEffect, useState } from 'react';
import { fetchTopRatedMovies } from '../api/tmdbApi';
import { Link } from 'react-router-dom';

const baseUrl = 'https://image.tmdb.org/t/p/w500';

const MovieTopRated = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const data = await fetchTopRatedMovies();
      setMovies(data);

      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="underline my-4 text-2xl sm:text-3xl text-white text-shadow drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        Rating Top 20
      </div>
      {/* 최고 평점 스와이퍼 Top 10? 20? */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map(movie => (
          <Link to={`/details/${movie.id}`} key={movie.id} className="flex justify-center">
            <div className="w-full max-w-[280px] p-2 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300 transition-all duration-300 hover:scale-105">
              <img
                src={`${baseUrl}${movie.poster_path}`}
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover border-4 border-gray-200 border-l-gray-500 border-t-gray-500"
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default MovieTopRated;
