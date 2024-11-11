import React from 'react';

const baseUrl = 'https://image.tmdb.org/t/p/w500';

interface MovieCardProps {
  title: string;
  poster_path: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, poster_path }) => {
  return (
    <div className="w-full max-w-[240px] p-2 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300 transition-all duration-300 hover:scale-105">
      <img
        src={`${baseUrl}${poster_path}`}
        alt={title}
        className="w-full aspect-[2/3] object-cover border-2 border-gray-500 border-l-gray-200 border-t-gray-200"
      />
      <h3 className="font-bold text-xs sm:text-sm h-10 mt-2 overflow-hidden">{title}</h3>
    </div>
  );
};

export default MovieCard;
