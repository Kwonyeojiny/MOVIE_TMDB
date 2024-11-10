import React from 'react';

const baseUrl = 'https://image.tmdb.org/t/p/w500';

interface MovieCardProps {
  title: string;
  poster_path: string;
  vote_average: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, poster_path, vote_average }) => {
  return (
    <>
      <div className="p-4 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300 translate-all duration-300 hover:scale-105">
        <img
          src={`${baseUrl}${poster_path}`}
          className="w-64 aspect-[3/4] object-cover border-2 border-gray-500 border-l-gray-200 border-t-gray-200"
        />
        <h3 className="text-lg font-bold ml-2 my-4">{title}</h3>
        <div className="text-sm text-right text-gray-500">평점: {vote_average}</div>
      </div>
    </>
  );
};

export default MovieCard;
