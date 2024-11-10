import React from 'react';

const baseUrl = 'https://image.tmdb.org/t/p/w500';

interface MovieCardProps {
  title: string;
  poster_path: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, poster_path }) => {
  return (
    <>
      <div className="w-64 p-4 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300 translate-all duration-300 hover:scale-105">
        <img
          src={`${baseUrl}${poster_path}`}
          className="w-full aspect-[2/3] object-cover border-2 border-gray-500 border-l-gray-200 border-t-gray-200"
        />
        <h3 className="font-bold text-[10px] ml-2 mt-2">{title}</h3>
      </div>
    </>
  );
};

export default MovieCard;
