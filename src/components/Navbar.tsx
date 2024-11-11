import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import { fetchSearchMovie } from '../api/tmdbApi';
import { Menu } from 'lucide-react';

interface NavbarProps {
  onSearch: (results: any[]) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      }
    };
    searchMovies();
  }, [debounceSearchQuery]);

  const toggleSearch = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSearchOpen(false);
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
    <nav className="m-2 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300 fixed top-0 left-0 right-0 z-10">
      <div className="p-2 flex justify-between items-center">
        <Link to="/" onClick={() => onSearch([])} className="text-xl sm:text-2xl font-bold pl-2">
          <div className="flex items-center gap-2">
            <img src="/imgs/computer.png" alt="nav_icon" className="w-6 sm:w-8" />
            <span>Movie</span>
          </div>
        </Link>
        <div className="flex items-center gap-4 pr-2">
          <div
            className="p-1 px-2 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300 active:border-gray-200 active:border-l-gray-500 active:border-t-gray-500 cursor-pointer"
            onClick={toggleSearch}
          >
            {isSearchOpen ? (
              <img src="/imgs/darkx.png" alt="nav_icon" className="w-4 sm:w-4 my-1" />
            ) : (
              <img src="/imgs/search.png" alt="nav_icon" className="w-6 sm:w-6" />
            )}
          </div>
          <div className="md:hidden ">
            <button
              onClick={toggleMenu}
              className="p-1 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300 active:border-gray-200 active:border-l-gray-500 active:border-t-gray-500 "
            >
              <Menu size={24} />
            </button>
          </div>
          <div className="hidden md:flex gap-4">
            <Link to="/signup">
              <div className="p-1 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300 active:border-gray-200 active:border-l-gray-500 active:border-t-gray-500">
                회원가입
              </div>
            </Link>
            <Link to="/signin">
              <div className="p-1 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300 active:border-gray-200 active:border-l-gray-500 active:border-t-gray-500">
                로그인
              </div>
            </Link>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t-2 border-gray-400">
          <Link to="/signup" onClick={toggleMenu}>
            <div className="m-2 p-2 border-b border-gray-300 hover:bg-[#02007F] hover:text-white">
              회원가입
            </div>
          </Link>
          <Link to="/signin" onClick={toggleMenu}>
            <div className="m-2 p-2 hover:bg-[#02007F] hover:text-white">로그인</div>
          </Link>
        </div>
      )}

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
              className="flex justify-center items-center w-16 p-1 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300 active:border-gray-200 active:border-l-gray-500 active:border-t-gray-500"
            >
              <img src="/imgs/search.png" alt="nav_icon" className="w-6 sm:w-6" />
            </button>
          </div>

          {debounceSearchQuery && searchResults.length > 0 && (
            <div className="border-t-2 border-gray-400">
              <div className="border-t-2 border-gray-200"></div>
              <div className="my-4 overflow-x-auto">
                <ul className="flex justify-center gap-4 mx-4 min-w-max">
                  {searchResults.map((movie: any) => (
                    <li key={movie.id} className="mb-2 w-24 sm:w-32 flex-shrink-0">
                      <Link
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        to={`/details/${movie.id}`}
                      >
                        <div>
                          <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full aspect-[2/3] border-2 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300"
                          />
                          <p className="text-xs truncate w-full">{movie.title}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {debounceSearchQuery && searchResults.length === 0 && (
            <div className="flex justify-center my-4 text-gray-500 ">검색된 결과가 없습니다.</div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
