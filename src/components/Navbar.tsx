import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import { fetchSearchMovie } from '../api/tmdbApi';

interface NavbarProps {
  onSearch: (results: any[]) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const debounceSearchQuery = useDebounce(searchQuery, 500);
  const navigate = useNavigate();

  useEffect(() => {
    const searchMovies = async () => {
      if (debounceSearchQuery) {
        const results = await fetchSearchMovie(debounceSearchQuery);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    };
    searchMovies();
  }, [debounceSearchQuery]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchClick = async () => {
    navigate('/');
    if (debounceSearchQuery) {
      const results = await fetchSearchMovie(debounceSearchQuery);
      onSearch(results);
    } else {
      onSearch([]);
    }
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  return (
    <>
      <nav className="m-2 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300 fixed top-0 left-0 right-0 z-10">
        <div className="p-2 flex justify-between items-center ">
          <Link to="/" onClick={() => onSearch([])} className="text-2xl font-bold pl-2">
            <div className="flex items-center gap-2">
              <img src="../../public/imgs/computer.png" alt="nav_icon" className="w-8" />
              <span>Movie</span>
            </div>
          </Link>
          <div className="flex gap-4 pr-2">
            <div
              className="p-1 px-2 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300 active:border-gray-200 active:border-l-gray-500 active:border-t-gray-500 cursor-pointer"
              onClick={toggleSearch}
            >
              {isSearchOpen ? '닫기' : '검색'}
            </div>
            <Link to="/signup">
              <div className="p-1 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300 active:border-gray-200 active:border-l-gray-500 active:border-t-gray-500 ">
                회원가입
              </div>
            </Link>
            <Link to="/signin">
              <div className="p-1 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300 active:border-gray-200 active:border-l-gray-500 active:border-t-gray-500 ">
                로그인
              </div>
            </Link>
          </div>
        </div>

        {isSearchOpen && (
          <div className="mx-2 border-t-2 border-gray-400">
            <div className="border-b-2 border-gray-200"></div>
            <div className="m-2 p-4 flex gap-4">
              <input
                type="text"
                placeholder="영화 검색"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border-4 border-gray-200 border-l-gray-500 border-t-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <button
                onClick={handleSearchClick}
                className="w-16 p-1 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300 active:border-gray-200 active:border-l-gray-500 active:border-t-gray-500"
              >
                검색
              </button>
            </div>

            {debounceSearchQuery && searchResults.length > 0 && (
              <div className="border-t-2 border-gray-400">
                <div className="border-t-2 border-gray-200"></div>
                <div className="my-4">
                  <ul className="flex justify-center gap-4 mx-4">
                    {searchResults.map(
                      (movie: any, index: number) =>
                        index < 5 && (
                          <li key={movie.id} className="mb-2 max-w-60">
                            <Link
                              onClick={() => {
                                setIsSearchOpen(false);
                                setSearchQuery('');
                              }}
                              to={`/details/${movie.id}`}
                              key={movie.id}
                            >
                              <div>
                                <img
                                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                  className="w-full aspect-[2/3] border-2 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300"
                                />
                                <p className="text-xs truncate w-32">{movie.title}</p>
                              </div>
                            </Link>
                          </li>
                        ),
                    )}
                  </ul>
                </div>
              </div>
            )}

            {debounceSearchQuery && searchResults.length === 0 && (
              <div className="mt-4 text-gray-500">검색된 결과가 없습니다.</div>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
