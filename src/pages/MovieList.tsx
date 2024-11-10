import React from 'react';
import MovieCard from '../components/MovieCard';
import movieDatas from '../data/movieListData.json';

const MovieList: React.FC = () => {
  return (
    <>
      <div className="flex flex-wrap justify-center items-center gap-8 mt-16">
        {movieDatas.results.map(movie => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            vote_average={movie.vote_average}
          />
        ))}
      </div>
    </>
  );
};

export default MovieList;
