import React, { useEffect, useState } from 'react';
import { fetchMovieDetail } from '../api/tmdbApi';
import { useNavigate, useParams } from 'react-router-dom';

const baseUrl = 'https://image.tmdb.org/t/p/w500';

const MoveiDetail: React.FC = () => {
  const [movieData, setMovieData] = useState<any>([]);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

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

  const handleMovieDetailClose = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="mt-24 max-w-[800px] md:mx-auto mx-8 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300">
        <header className="m-1 p-2 bg-[#02007F] flex items-center justify-between">
          <div className="flex items-center">
            <img src="../../public/imgs/folder.png" className="w-8 mx-2" />
            <div className=" text-white font-bold text-2xl">{title}</div>
          </div>
          <button
            onClick={handleMovieDetailClose}
            className="p-1 border-2 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300 active:border-gray-200 active:border-l-gray-500 active:border-t-gray-500"
          >
            <img src="../../public/imgs/darkx.png" />
          </button>
        </header>
        <div className="grid gap-4 p-4  md:grid-cols-2 ">
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
      </div>
    </>
  );
};

export default MoveiDetail;
