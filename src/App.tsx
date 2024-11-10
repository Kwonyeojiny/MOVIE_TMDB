import { Route, Routes } from 'react-router-dom';
import './App.css';
import MoveiDetail from './pages/MovieDetail';
import MovieList from './pages/MovieList';
import Navbar from './components/Navbar';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { useState } from 'react';

function App() {
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (results: any[]) => {
    setSearchResults(results);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<MovieList searchResults={searchResults} />} />
        <Route path="/details/:id" element={<MoveiDetail />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
