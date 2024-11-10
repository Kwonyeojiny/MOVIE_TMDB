import React, { useEffect, useState } from 'react';
import movieDetail from '../data/movieDetailData.json';

const baseUrl = 'https://image.tmdb.org/t/p/w500';

const MoveiDetail: React.FC = () => {
  const [movieData, setMovieData] = useState<any>({});

  // 구조분해할당
  const { poster_path, title, vote_average, genres, overview } = movieData && movieData;

  useEffect(() => {
    setMovieData(movieDetail);
  }, []);

  if (!movieData) {
    return <div>영화 데이터가 없습니다</div>;
  }

  return (
    <>
      <div className="m-8 flex gap-4 p-4 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300">
        <img
          src={`${baseUrl}${poster_path}`}
          className="w-80 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300"
        />
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl">{title}</h2>
            <p>평점: {vote_average}</p>
          </div>
          <ul className="flex gap-4 my-4 list-none justify-center">
            {genres &&
              genres.map((genre: any, index: number) => (
                <li
                  key={index}
                  className="p-0.5 border-2 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300"
                >
                  {genre.name}
                </li>
              ))}
          </ul>
          <div>{overview}</div>
        </div>
      </div>
    </>
  );
};

export default MoveiDetail;
