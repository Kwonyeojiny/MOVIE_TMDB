import React, { useEffect, useState, useRef } from 'react';
import { fetchMovieDetail } from '../api/tmdbApi';
import { useNavigate, useParams } from 'react-router-dom';
import TypeIt from 'typeit';

const baseUrl = 'https://image.tmdb.org/t/p/w500';

const MovieDetail: React.FC = () => {
  const [movieData, setMovieData] = useState<any>(null);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const overviewRef = useRef<HTMLDivElement>(null);

  const { poster_path, title, vote_average, genres, overview, release_date, runtime, tagline } =
    movieData || {};

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

  useEffect(() => {
    if (overview && overviewRef.current) {
      new TypeIt(overviewRef.current, {
        strings: overview,
        speed: 50,
        waitUntilVisible: true,
      }).go();
    }
  }, [overview]);

  if (loading) return <div>Loading...</div>;
  if (!movieData) return <div>영화 데이터가 없습니다</div>;

  const handleMovieDetailClose = () => {
    navigate(-1);
  };

  return (
    <div className="mt-24 max-w-[840px] mx-auto border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300">
      <header className="m-1 p-2 bg-[#02007F] flex items-center justify-between">
        <div className="flex items-center">
          <img src="/imgs/folder.png" className="w-8 mx-2" alt="Folder icon" />
          <div className="text-white font-bold text-lg sm:text-xl md:text-2xl truncate">
            {title}
          </div>
        </div>
        <button
          onClick={handleMovieDetailClose}
          className="p-1 border-2 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300 active:border-gray-200 active:border-l-gray-500 active:border-t-gray-500"
        >
          <img src="/imgs/darkx.png" alt="Close icon" />
        </button>
      </header>

      <ul className="p-1 mx-2 flex flex-wrap gap-2 list-none border-b-2 border-gray-400">
        {genres &&
          genres.map((genre: any, index: number) => (
            <li key={index} className="px-2 text-xs sm:text-sm">
              <span className="underline">{genre.name.charAt(0)}</span>
              {genre.name.slice(1)}
            </li>
          ))}
      </ul>

      <div className="grid gap-4 p-4 mx-2 border-t-2 border-gray-200 sm:grid-cols-[auto,1fr]">
        <img
          src={`${baseUrl}${poster_path}`}
          className="w-full max-w-[320px] mx-auto border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300"
          alt={`${title} poster`}
        />
        <div className="flex flex-grow flex-col gap-4 m-2">
          {tagline && (
            <p className="text-base text-center  sm:text-xl italic font-extrabold mb-4">
              &quot;{tagline}&quot;
            </p>
          )}
          <div className="text-sm sm:text-base">
            평점: {vote_average ? vote_average.toFixed(1) : '정보 없음'}
          </div>
          <div className="text-sm sm:text-base">
            개봉일: {release_date ? release_date : '정보 없음'}
          </div>
          <div className="text-sm sm:text-base">
            상영시간: {runtime ? formatRuntime(runtime) : '정보 없음'}
          </div>
          {overview && (
            <>
              <div className="text-sm sm:text-base ">줄거리: </div>
              <div
                ref={overviewRef}
                className="text-xs sm:text-sm p-2 border-4 border-gray-200 border-l-gray-500 border-t-gray-500 bg-white h-[220px] overflow-y-auto"
              ></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
