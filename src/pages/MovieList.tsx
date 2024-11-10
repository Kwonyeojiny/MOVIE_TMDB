import React from 'react';
import MovieCard from '../components/MovieCard';
import movieDatas from '../data/movieListData.json';
import { Link } from 'react-router-dom';

const MovieList: React.FC = () => {
  return (
    <>
      <div className="flex flex-wrap justify-center items-center gap-8 mt-16">
        {movieDatas.results.map(movie => (
          <Link to={`/details/${movie.id}`} key={movie.id}>
            <MovieCard
              title={movie.title}
              poster_path={movie.poster_path}
              vote_average={movie.vote_average}
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default MovieList;
