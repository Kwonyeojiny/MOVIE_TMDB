import { useEffect, useState } from 'react';
import { fetchTopRatedMovies } from '../api/tmdbApi';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const baseUrl = 'https://image.tmdb.org/t/p/w500';

const MovieTopRated = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const data = await fetchTopRatedMovies();
      setMovies(data);

      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="underline my-4 text-2xl sm:text-3xl text-white text-shadow drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        평점 Top 20
      </div>
      <div className=" bg-gray-300 border-4 border-gray-500 border-l-gray-200 border-t-gray-200">
        <Swiper
          modules={[Pagination, A11y, Autoplay]}
          slidesPerView={3}
          loop
          navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 5,
            },
          }}
        >
          {movies.map((movie, index) => (
            <SwiperSlide key={movie.id}>
              <Link to={`/details/${movie.id}`} className="flex justify-center">
                <div className="w-full max-w-[280px] m-4 p-2 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300 transition-all duration-300 hover:scale-105">
                  <h1>
                    Top <span className="text-xl sm:text-2xl ">{index + 1}</span>
                  </h1>
                  <img
                    src={`${baseUrl}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full aspect-[2/3] object-cover border-4 border-gray-200 border-l-gray-500 border-t-gray-500"
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default MovieTopRated;
