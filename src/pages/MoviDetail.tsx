import React, { useEffect, useState } from 'react';
import { fetchMovieDetail } from '../api/tmdbApi';
import { useParams } from 'react-router-dom';

const baseUrl = 'https://image.tmdb.org/t/p/w500';

const MoveiDetail: React.FC = () => {
  const [movieData, setMovieData] = useState<any>([]);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);

  // 구조분해할당
  const { poster_path, title, vote_average, genres, overview } = movieData || {};

  useEffect(() => {
    const getMovieData = async () => {
      if (id) {
        setLoading(true);
        const data = await fetchMovieDetail(id);
        setMovieData(data);
        setLoading(false);
      }
    };
    getMovieData();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!movieData) {
    return <div>영화 데이터가 없습니다</div>;
  }

  return (
    <>
      <div className="mt-16 m-8 grid gap-4 p-4 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300 md:grid-cols-2">
        <img
          src={`${baseUrl}${poster_path}`}
          className="w-full border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300"
        />
        <div className="flex flex-col gap-4">
          <div className="mt-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p>평점: {vote_average}</p>
          </div>
          <ul className="flex gap-4 my-4 list-none justify-center">
            {genres &&
              genres.map((genre: any, index: number) => (
                <li
                  key={index}
                  className="py-0.5 px-2 border-2 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300"
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
