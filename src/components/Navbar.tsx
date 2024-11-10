import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav className="m-2 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300 fixed top-0 left-0 right-0 z-10">
        <div className="p-2 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold pl-2">
            Movie
          </Link>
          <div className="flex gap-4 pr-2">
            <Link to="/signup">회원가입</Link>
            <Link to="/signin">로그인</Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
