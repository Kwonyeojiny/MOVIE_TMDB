import React, { useEffect, useState } from 'react';
import { fetchMovieDetail } from '../api/tmdbApi';
import { useNavigate, useParams } from 'react-router-dom';

const baseUrl = 'https://image.tmdb.org/t/p/w500';

const MovieDetail: React.FC = () => {
  const [movieData, setMovieData] = useState<any>(null);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // 구조분해할당
  const { poster_path, title, vote_average, genres, overview, release_date, runtime } =
    movieData || {};

  // 상영 시간을 '2H 8M' 형식으로 변환하는 함수
  const formatRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}H ${minutes}M`;
  };

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
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!movieData) return <div>영화 데이터가 없습니다</div>;

  const handleMovieDetailClose = () => {
    navigate(-1);
  };

  return (
    <div className="mt-24 max-w-[800px] md:mx-auto mx-8 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300">
      <header className="m-1 p-2 bg-[#02007F] flex items-center justify-between">
        <div className="flex items-center">
          <img src="../../public/imgs/folder.png" className="w-8 mx-2" alt="Folder icon" />
          <div className="text-white font-bold text-2xl">{title}</div>
        </div>
        <button
          onClick={handleMovieDetailClose}
          className="p-1 border-2 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300 active:border-gray-200 active:border-l-gray-500 active:border-t-gray-500"
        >
          <img src="../../public/imgs/darkx.png" alt="Close icon" />
        </button>
      </header>

      <ul className="p-1 mx-2 flex gap-4 list-none border-b-2 border-gray-400">
        {genres &&
          genres.map((genre: any, index: number) => (
            <li key={index} className="px-2">
              <span className="underline">{genre.name.charAt(0)}</span>
              {genre.name.slice(1)}
            </li>
          ))}
      </ul>

      <div className="grid gap-4 p-4 md:grid-cols-2 mx-2 border-t-2 border-gray-200">
        <img
          src={`${baseUrl}${poster_path}`}
          className="w-full border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300"
          alt={`${title} poster`}
        />
        <div className="flex flex-col gap-4 m-2">
          <div>평점: {vote_average ? vote_average : '정보 없음'}</div>
          <div>개봉일: {release_date ? release_date : '정보 없음'}</div>
          <div>상영시간: {runtime ? formatRuntime(runtime) : '정보 없음'}</div>

          <div>줄거리: </div>
          <div className="text-sm p-2 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300">
            {overview ? overview : '정보 없음'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
